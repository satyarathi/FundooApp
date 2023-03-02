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
        const data = await UserService.newUser(req.body);
            res.status(HttpStatus.CREATED).json({
                code: HttpStatus.CREATED,
                data: data,
                message: 'User Registration successfully'
              });   
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.BAD_REQUEST,
            message:`${error}`
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
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'User login successfully'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.BAD_REQUEST,
            message:`${error}`
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
        res.status(HttpStatus.CREATED).json({
            code:HttpStatus.CREATED,
            data:data,
            message:'proceed further'
          });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.BAD_REQUEST,
            message:`${error}`
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
export const resetPassword = async(req, res, next) => {
    try {
        console.log("show body", req.body);
        const data = await UserService.resetPassword(req.body);
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data: data,
            message:'reset password is successfull'
          });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code:HttpStatus.BAD_REQUEST,
            message:`${error}`
          });
        }
    };