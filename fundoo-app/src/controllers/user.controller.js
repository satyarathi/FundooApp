import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';



/**
/**
 * Controller to create a new user registration
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUserRegistration = async(req, res, next) => {
    try {
        UserService.newUser(req.body).then((data) => {
            res.status(HttpStatus.CREATED).json({
                code: data.code,
                data: data.data,
                message: data.message
            });
        })
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            data: '',
            message: 'Registration failed'
        });
    }
};


/**
/**
 * Controller to login
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const userLogin = async(req, res, next) => {
    try {
        const data = await UserService.login(req.body);
        res.status(data.code).json({
            code: data.code,
            data: data.data,
            message: data.message
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            data: '',
            message: 'Login failed'
        });
    }
}

/**
/**
 * Controller to login
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const forgetPassword = async(req, res, next) => {
    try {
        const data = await UserService.forgetPassword(req.body);
        res.status(data.code).json({
            code: data.code,
            data: data.data,
            message: data.message
        })
    } catch (error) {
        next(error)
    }
}

/**
/**
 * Controller to login
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const resetPassword = async(req, res, next) => {
    try {
        console.log("show body", req.body);
        const data = await UserService.resetPassword(req.body);
        res.status(data.code).json({
            code: data.code,
            data: data.data,
            message: data.message
        })
    } catch (error) {
        next(error)
    }
};