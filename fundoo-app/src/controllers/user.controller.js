import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUserRegistration = async(req, res, next) => {
    try {
        const data = await UserService.newUserRegistration(req.body);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'New User registered successfully'
        });
    } catch (error) {
        next(error);
    }
};