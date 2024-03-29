
const jwt = require("jsonwebtoken");
const { QueryTypes } = require("sequelize");

const sequelize = require("../config/index");
const { log } = require("console");



const authenticateUser = async (req, res, next) => {
  // Extract token from the request header
  const token = req.headers.authorization.split(" ")[1];

  log(token);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)

    // Check if the user exists in the database
    const existingUser = await sequelize.query(
      `SELECT email FROM User WHERE id = '${decoded.userId}'`,
      { type: QueryTypes.SELECT }
    );

    if (existingUser.length === 0) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // Attach user information to the request object
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = authenticateUser;