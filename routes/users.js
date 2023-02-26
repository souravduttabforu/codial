const express = require('express');
const router = express.Router();
const passport = require('passport');


const userController = require('../controllers/users_controller');
router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.get('/codial-sign-in',userController.signIn);
router.get('/codial-sign-up',userController.sighUp);
router.get('/codial-sign-out',userController.destroySession);

router.post('/create',userController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/codial-sign-in'}
),userController.createSession)

module.exports = router;