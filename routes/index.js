
const express = require('express');
const {
    isAuthenticated,
    registerUser,
    loginUser,
    fetchAllData,
    fetchDataById,
    insertUserData,
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
    .post('/insert', insertUserData)
    .put('/update', isAuthenticated, updateUserData)
    .delete('/delete', isAuthenticated, deleteUserData)

exports.router = router;
