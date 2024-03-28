
const express = require('express');
const {
    isAuthenticated,
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
    .put('/update',isAuthenticated,updateUserData)
    .delete('/:id', isAuthenticated,deleteUserData)

exports.router = router;
