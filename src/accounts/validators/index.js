import Joi from 'joi';

const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const accountSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).max(20).regex(passwordRegex).required(),
    firstName: Joi.string().min(1).max(30).required(),
    lastName: Joi.string().min(1).max(30).required()
});

export default { account: accountSchema };