import Joi from "joi";

const authSignup = Joi.object().keys({
  name: Joi.string().required().messages({
    "any.required": "please provide your name!",
    "string.empty": "please provide your name!",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "please provide your email address!",
    "string.email": "please provide valid email address!",
  }),
  password: Joi.string().min(8).required().messages({
    "any.required": "please provide a password!",
    "string.min": "password must have minimum 8 characters",
  }),
});

const authSignin = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const authSchema = {
  signin: authSignin,
  signup: authSignup,
};
