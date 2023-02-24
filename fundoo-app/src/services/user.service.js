import User from '../models/user.model';
import HttpStatus from 'http-status-codes';
const bcrypt = require('bcrypt');
import jwt from "jsonwebtoken";

//create new registration

export const newUser = async function(body) {
    try {
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
    } catch (error) {
        console.log(error);
    }
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
}