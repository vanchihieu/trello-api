/* eslint-disable no-console */
import { StatusCodes } from "http-status-codes";

const createNew = async (req, res, next) => {
  try {
    res.status(StatusCodes.CREATED).json({
      message: "Post: from controller APIs create new board",
    });

    // throw new ApiError(StatusCodes.BAD_REQUEST, "Error from controller");
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  createNew,
};
