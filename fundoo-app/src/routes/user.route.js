import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
const { userAuth } = require('../middlewares/auth.middleware');

const router = express.Router();

//route to create a new user Registration
router.post('/register', newUserValidator, userController.newUserRegistration);

// //route to login
router.post('/login', userController.userLogin);


export default router;