
const express = require('express');
const {
    registerUser,
    loginUser,
    fetchAllData,
    fetchDataById,
    updateUserData,
    deleteUserData,
} = require('../controller/userController');

const router = express.Router();

// Routes
router
    .post('/register', registerUser)
    .post('/login', loginUser)
    .get('/all', fetchAllData)
    .get('/:id', fetchDataById)
    .put('/update',  updateUserData)
    .delete('/:id', deleteUserData)

exports.router = router;
