const express = require("express");
const { userRegistration, verifyEmail, userLogin } = require("../controllers/userController");
const router = express.Router();

// User routes

router.post('/register',userRegistration)
router.get('/verify/:token',verifyEmail)
router.post('/login',userLogin)


module.exports = router;