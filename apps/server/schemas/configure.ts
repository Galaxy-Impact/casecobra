import Joi from "joi";

const createConfiguration = Joi.object().keys({
  imageUrl: Joi.string().required().messages({
    "any.required": "image url is required!",
    "string.empty": "image url is required!",
  }),
  croppedImageUrl: Joi.string().optional(),
  finish: Joi.string().valid("smooth", "textured").optional(),
  color: Joi.string().valid("black", "blue", "rose").optional(),
  model: Joi.string()
    .valid(
      "iphonex",
      "iphone11",
      "iphone12",
      "iphone13",
      "iphone14",
      "iphone15"
    )
    .optional(),
  material: Joi.string().valid("silicone", "polycarbonate").optional(),
});

const updateConfiguration = Joi.object().keys({
  croppedImageUrl: Joi.string().optional(),
  finish: Joi.string().valid("smooth", "textured").optional(),
  color: Joi.string().valid("black", "blue", "rose").optional(),
  model: Joi.string()
    .valid(
      "iphonex",
      "iphone11",
      "iphone12",
      "iphone13",
      "iphone14",
      "iphone15"
    )
    .optional(),
  material: Joi.string().valid("silicone", "polycarbonate").optional(),
});

export const configurationSchema = { createConfiguration, updateConfiguration };
