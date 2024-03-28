
const express = require('express');
const {
    registerUser,
    loginUser,
    fetchAllData,
    fetchDataById,
    updateUserData,
    deleteUserData,
} = require('../controller/userController');
const auth = require('../middleware/auth')

const router = express.Router();

// Routes
router
    .post('/register', registerUser)
    .post('/login', loginUser) 
    .get('/all',auth, fetchAllData)
    .get('/:id',auth, fetchDataById)
    .put('/update',auth,updateUserData)
    .delete('/:id', auth,deleteUserData)

exports.router = router;
