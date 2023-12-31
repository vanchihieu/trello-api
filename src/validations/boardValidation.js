/* eslint-disable no-console */
import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { BOARD_TYPES } from "~/utils/constants";

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
    type: Joi.string()
      .valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE)
      .required(),
  });

  try {
    // chỉ định abortEarly: false để bắt tất cả các lỗi
    await correctCondition.validateAsync(req.body, { abortEarly: false });

    // validate dữ liệu thành công thì chuyển sang middleware tiếp theo
    next();
  } catch (error) {
    // const errorMessage = new Error(error).message;
    // const customError = new ApiError(
    //   StatusCodes.UNPROCESSABLE_ENTITY,
    //   errorMessage
    // );
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

export const boardValidation = {
  createNew,
};
