import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { emailAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user Registration
router.post('/register', newUserValidator, userController.newUserRegistration);

// //route to login
router.post('/login', userController.userLogin);

//route for forgot password
router.post('/forgot', userController.forgetPassword);

//route for forgot password
router.post('/reset', emailAuth, userController.resetPassword);

export default router;