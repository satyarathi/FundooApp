import User from '../models/user.model';
import HttpStatus from 'http-status-codes';
const bcrypt = require('bcrypt');

import jwt from "jsonwebtoken";
import * as gmailApi from '../util/gmailApi'

//create new registration

export const newUser = async function(body) {

        const userExist = await User.findOne({ email: body.email })
        if (userExist == null) {
            const bcryptpassword = await bcrypt.hash(body.password, 10);
            body.password = bcryptpassword;
            const data = await User.create(body);
            return data;
        };
    }


export const login = async function(body) {
    const data = await User.findOne({ email: body.email });
    console.log(data);
    if (data) {
        const checkPassword = await bcrypt.compare(body.password, data.password);
        console.log(checkPassword);
        if (checkPassword) {

            var token = jwt.sign({ id: data.id }, process.env.TOKEN_KEY)
            const responseData = {
                user: data,
                Auth: token
            }
          return responseData;
    }
};

// Forget Password
export const forgetPassword = async function(body) {
    
    const data = await User.findOne({ email: body.email })
    if (data !== null) {
        var token = jwt.sign({ id: data.id, email: data.email }, process.env.TOKEN_KEY)
        gmailApi.sendMail(body.email)
        const responseData = {
            user: data,
            Auth: token
        } 
        return responseData;     
    }
}

//reset password
export const resetPassword = async function(body) {
    
    const bcryptpassword = await bcrypt.hash(body.password, 10);
    body.password = bcryptpassword;
    const data = await User.findOneAndUpdate({ email: body.email }, body, {
        new: true
    });
    return data;
}