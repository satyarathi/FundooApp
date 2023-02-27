import User from '../models/user.model';
import HttpStatus from 'http-status-codes';
const bcrypt = require('bcrypt');

import jwt from "jsonwebtoken";
import * as gmailApi from '../gmailApis/gmailApi'

//create new registration

export const newUser = async function(body) {
    var result;
    const userExist = await User.findOne({ email: body.email })
    if (userExist == null) {
        const bcryptpassword = await bcrypt.hash(body.password, 10);
        body.password = bcryptpassword;
        const data = await User.create(body);
        result = {
            code: HttpStatus.CREATED,
            data: data,
            message: 'New User registered successfully'
        }
    } else {
        result = {
            code: HttpStatus.BAD_REQUEST,
            data: "Registration failed",
            message: "User already exist"
        }
    }
    return result;
};

export const login = async function(body) {
    var result;
    const data = await User.findOne({ email: body.email })
    console.log(data);
    if (data) {
        const checkPassword = await bcrypt.compare(body.password, data.password);
        console.log(checkPassword);
        if (checkPassword) {

            var token = jwt.sign({ id: data.id }, process.env.TOKEN_KEY)
            data.token = token;
            console.log("creating the token", token);


            result = {
                code: HttpStatus.CREATED,
                data: data,
                message: 'Login successfull'
            }
        } else {
            result = {
                code: HttpStatus.BAD_REQUEST,
                data: 'Enter valid password',
                message: 'password mismatch'
            }
        }
    } else {
        result = {
            code: HttpStatus.BAD_REQUEST,
            data: 'Enter valid email id',
            message: 'No such user exist'
        }
    };
    return result;
};

// Forget Password
export const forgetPassword = async function(body) {
    var result;
    const data = await User.findOne({ email: body.email })
    if (data !== null) {
        var token = jwt.sign({ id: data.id, email: data.email }, process.env.TOKEN_KEY)
        gmailApi.sendMail(body.email)
        data.token = token;
        result = {
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'Resetpassword link has been sended to your mail'
        }
    } else {
        result = {
            code: HttpStatus.BAD_REQUEST,
            data: ' ',
            message: 'Invalid Email'
        }
    }
    return result;
}

//reset password
export const resetPassword = async function(body) {
    console.log(body);
    var result;
    const bcryptpassword = await bcrypt.hash(body.password, 10);
    body.password = bcryptpassword;
    const data = await User.findOneAndUpdate({ email: body.email }, body, {
        new: true
    });
    if (data) {
        result = {
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'Password has been reset'
        }
    } else {
        result = {
            code: HttpStatus.BAD_REQUEST,
            data: ' ',
            message: 'Invalid Email'
        }
    }
    return result;
}