/* eslint-disable no-console */
import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(30).trim().strict().messages({
      "string.base": "Title must be a string",
      "string.empty": "Title must not be empty",
      "string.min": "Title must have at least 3 characters",
      "string.max": "Title must have at most 30 characters",
      "any.required": "Title is a required field",
    }),
    description: Joi.string().required().min(3).max(100).trim().strict(),
  });

  try {
    // chỉ định abortEarly: false để bắt tất cả các lỗi
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    // next();
    res.status(StatusCodes.CREATED).json({
      message: "Post: from validation APIs create new board",
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message,
    });
  }
};

export const boardValidation = {
  createNew,
};
