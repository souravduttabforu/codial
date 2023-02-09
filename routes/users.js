const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controller');
router.get('/profile',userController.profile);
router.get('/codial-sign-in',userController.signIn);
router.get('/codial-sign-up',userController.sighUp);
router.get('/sign-out',userController.signOut);

router.post('/create',userController.create);
router.post('/create-session',userController.createSession);

module.exports = router;