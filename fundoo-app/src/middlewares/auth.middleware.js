import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async(req, res, next) => {
    try {
        let bearerToken = req.header('Authorization');
        if (!bearerToken)
            throw {
                code: HttpStatus.BAD_REQUEST,
                message: 'Authorization token is required'
            };
        bearerToken = bearerToken.split(' ')[1];

        const user = jwt.verify(bearerToken, process.env.TOKEN_KEY);
        req.body.userId = user.id;
        next();
    } catch (error) {
        next(error);
    }
};

//middleware for email
export const emailAuth = async(req, res, next) => {
    try {
        let bearerToken = req.header('Authorization');
        if (!bearerToken)
            throw {
                code: HttpStatus.BAD_REQUEST,
                message: 'Authorization token is required'
            };
        bearerToken = bearerToken.split(' ')[1];

        const user = jwt.verify(bearerToken, process.env.TOKEN_KEY);
        console.log("user is here", user);
        req.body.emailId = user.email;

        next();
    } catch (error) {
        next(error);
    }
};