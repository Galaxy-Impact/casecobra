import { RequestHandler } from "express";
import schemas, { SchemaName } from "@/schemas";

interface ValidationError {
  message: string;
}

interface JoiError {
  status: string;
  error: {
    details: ValidationError[];
  };
}

interface CustomError {
  status: string;
  error: string;
}

const supportedMethods = ["post", "put", "patch", "delete"];

const validationOptions = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false,
};

const schemaValidator = (
  name: SchemaName,
  useJoiError = true
): RequestHandler => {
  const schema = schemas[name];

  if (!schema) {
    throw new Error(`Schema not found for name: ${name}`);
  }

  return (req, res, next) => {
    const method = req.method.toLowerCase();

    if (!supportedMethods.includes(method)) {
      return next();
    }

    const { error, value } = schema.validate(req.body, validationOptions);

    if (error) {
      const customError: CustomError = {
        status: "failed",
        error: "Invalid request. Please review request and try again.",
      };

      const joiError: JoiError = {
        status: "failed",
        error: {
          details: error.details.map(({ message }: ValidationError) => ({
            message: message.replace(/['"]/g, ""),
          })),
        },
      };

      return res.status(422).json(useJoiError ? joiError : customError);
    }

    req.body = value;
    return next();
  };
};

export default schemaValidator;
