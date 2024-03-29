const sequelize = require('../config/index');
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const fileUpload = require("../middleware/fileUpload")
// Function to generate JWT token

function generateToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Change 'your_secret_key' to your actual secret key
}

exports.isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token)
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    jwt.verify(token, secretKey, (err, decoded) => { // Change 'your_secret_key' to your actual secret key
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.userId = decoded.userId;
        next();
    });
};

exports.registerUser = async (req, res) => {
    try {
    const {id, firstName, lastName, email, password, gender, hobbies, departmentId} = req.body;

    const profilePic = req.file.filename

    console.log(profilePic, 'profilePic');
    

   
        
        // if (!firstName || !lastName || !email || !password || !gender || !hobbies || !departmentId) {
        //     return res.status(422).json({ error: "Fill in all fields." });
        // }

        const newEmail = email.toLowerCase();
        const emailExistsQuery = `
            SELECT * FROM User WHERE email = :email
        `;
        const emailExists = await sequelize.query(emailExistsQuery, {
            replacements: { email: newEmail },
            type: QueryTypes.SELECT
        });

        if (emailExists.length > 0) {
            return res.status(422).json({ error: "Email already exists." });
        }

        if (password.trim().length < 8) {
            return res.status(422).json({ error: "Password should be at least 8 characters." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertUserQuery = `INSERT INTO User (
            id,
            firstName,
            lastName,
            email,
            password,
            gender,
            hobbies,
            departmentId,
            profilePic
          ) VALUES (
            ${id}, 
            '${firstName}',
            '${lastName}',
            '${email}',
            '${hashedPassword}',
            '${gender}',
            '${hobbies}',
            ${departmentId},
            '${profilePic}'
          )`;
        await sequelize.query(insertUserQuery, {
            replacements: { id,firstName, lastName, email: newEmail, password: hashedPassword, gender, hobbies, departmentId },
            type: QueryTypes.INSERT
        });

        res.status(201).json({ message: `New user ${newEmail} registered.` });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(422).json({ error: "Fill in all fields." });
        }

        const newEmail = email.toLowerCase();
        const getUserQuery = `
            SELECT * FROM User WHERE email = :email
        `;
        const userData = await sequelize.query(getUserQuery, {
            replacements: { email: newEmail },
            type: QueryTypes.SELECT
        });

        if (userData.length === 0) {
            return res.status(422).json({ error: "Invalid credentials." });
        }

        const user = userData[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect password.' });
        }

        const token = generateToken(user.id); 
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.fetchAllData = async (req, res) => {
    try {
        const empData = await sequelize.query(`
            SELECT User.id, User.firstName, User.lastName, User.email, User.gender, User.hobbies, Department.departmentId, Department.departmentName
            FROM User
            INNER JOIN Department ON User.departmentId = Department.departmentId where deletedAt = false;
        `, { type: QueryTypes.SELECT });

        res.json(empData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.fetchDataById = async (req, res) => {
    const userId = req.params.id;

    try {
        const userData = await sequelize.query(`
            SELECT User.id, User.firstName, User.lastName, User.email, User.gender, User.hobbies, Department.departmentId, Department.departmentName
            FROM User
            INNER JOIN Department ON User.departmentId = Department.departmentId
            WHERE User.id = :userId AND deletedAt = false;
        `, {
            replacements: { userId },
            type: QueryTypes.SELECT
        });

        if (userData.length === 0) {
            return res.status(404).json({ error: 'Data not found' });
        }

        res.json(userData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



exports.updateUserData = async (req, res) => {
    const { id, firstName, lastName, email, password, gender, hobbies, departmentId } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await sequelize.query(`
            UPDATE User SET 
            firstName = :firstName,
            lastName = :lastName,
            email = :email,
            password = :hashedPassword,
            gender = :gender,
            hobbies = :hobbies,
            departmentId = :departmentId
            WHERE id = :id
        `, {
            replacements: { id, firstName, lastName, email, hashedPassword, gender, hobbies, departmentId },
            type: QueryTypes.UPDATE
        });

        res.json({ message: 'User data updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteUserData = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await sequelize.query(`
            UPDATE User
            SET deletedAt = true 
            WHERE id = :id
        `, {
            replacements: { id },
            type: QueryTypes.UPDATE
        });

        if (result[1] === 0) { // Check if no rows were affected
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User data soft deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


