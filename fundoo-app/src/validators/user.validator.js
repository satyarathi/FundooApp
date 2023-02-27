import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().min(4).required(),
        lastName: Joi.string().min(4).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required()
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        next(error);
    } else {
        next();
    }
};