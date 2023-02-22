import Joi from '@hapi/joi';

export const newNoteValidator = (req, res, next) => {
    const schema = Joi.object({
        userId: Joi.string().min(4).optional(),
        title: Joi.string().min(4).required(),
        description: Joi.string().min(4).required(),
        color: Joi.string().min(4).optional(),
        archive: Joi.boolean(),
        trash: Joi.boolean()
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        next(error);
    } else {
        next();
    }
};