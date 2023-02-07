const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controller');
router.get('/profile',userController.profile);
router.get('/codial-sign-in',userController.signIn);
router.get('/codial-sign-up',userController.sighUp);

module.exports = router;