const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');


router.get('/check_email', userControllers.checkEmail);
router.put('/update-password', userControllers.updatePassword);
router.post('/send_email', userControllers.sendEmail);


// these two routes are for testing purposes since there are not configured in the frontend
router.post('/register', userControllers.registerUser);
router.get('/users', userControllers.getUsers);

module.exports = router;