const sequelize = require('../model/index');
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');

exports.isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};



exports.registerUser = async (req, res) => {
    const { firstName, lastName, email, password, gender, hobbies, departmentId } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(422).json({ error: "Fill in all fields." });
        }

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

        const insertUserQuery = `
            INSERT INTO User (firstName, lastName, email, password, gender, hobbies, departmentId) VALUES (:firstName, :lastName, :email, :password, :gender, :hobbies, :departmentId)
        `;
        await sequelize.query(insertUserQuery, {
            replacements: { firstName, lastName, email: newEmail, password: hashedPassword, gender, hobbies, departmentId },
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

        res.json({ message: 'Login successful', user });
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
            INNER JOIN Department ON User.departmentId = Department.departmentId;
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
            WHERE User.id = :userId;
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

exports.insertUserData = async (req, res) => {
    const { firstName, lastName, email, password, gender, hobbies, departmentId } = req.body;

    try {
        const result = await sequelize.query(`
            INSERT INTO User (firstName, lastName, email, password, gender, hobbies, departmentId)
            VALUES (:firstName, :lastName, :email, :password, :gender, :hobbies, :departmentId)
        `, {
            replacements: { firstName, lastName, email, password, gender, hobbies, departmentId },
            type: QueryTypes.INSERT
        });

        res.json({ message: 'User data inserted successfully', insertedId: result[0] });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateUserData = async (req, res) => {
    const { userId, firstName, lastName, email, password, gender, hobbies, departmentId } = req.body;

    try {
        const result = await sequelize.query(`
            UPDATE User 
            SET firstName = :firstName, lastName = :lastName, email = :email, password = :password, gender = :gender, hobbies = :hobbies, departmentId = :departmentId
            WHERE id = :userId
        `, {
            replacements: { userId, firstName, lastName, email, password, gender, hobbies, departmentId },
            type: QueryTypes.UPDATE
        });

        res.json({ message: 'User data updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteUserData = async (req, res) => {
    const { userId } = req.body;

    try {
        const result = await sequelize.query(`
            UPDATE User
            SET deletedAt = NOW() -- Assuming 'deletedAt' is the column to mark soft delete
            WHERE id = :userId
        `, {
            replacements: { userId },
            type: QueryTypes.UPDATE
        });

        res.json({ message: 'User data soft deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


