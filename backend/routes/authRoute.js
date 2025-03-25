const express = require('express');
const {signupValidator , loginValidator } = require('../utils/validators/authValidator');
const { signUp , login , forgotPassword , verifyResetCode , resetPassword , authenticate,checkAuth,logout} = require('../services/authService');
const router = express.Router();
router.post('/signup',signupValidator, signUp);
router.post('/login',loginValidator, login);
router.post('/forgotPassword',forgotPassword);
router.post('/verifyResetCode',verifyResetCode);
router.post('/resetPassword',resetPassword);
router.post('/resetPassword', resetPassword);
router.get("/check", authenticate, checkAuth);
router.get("/logout", authenticate, logout);

module.exports = router;