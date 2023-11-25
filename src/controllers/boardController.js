/* eslint-disable no-console */
import { StatusCodes } from "http-status-codes";
import { boardService } from "~/services/boardService";

const createNew = async (req, res, next) => {
  try {
    const createdBoard = await boardService.createNew(req.body);

    res.status(StatusCodes.CREATED).json(createdBoard);

    // throw new ApiError(StatusCodes.BAD_REQUEST, "Error from controller");
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  createNew,
};
