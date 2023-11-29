/* eslint-disable no-useless-catch */
import { boardModel } from "~/models/boardModel";
import ApiError from "~/utils/ApiError";
import { slugify } from "~/utils/formatters";
import { StatusCodes } from "http-status-codes";
import { cloneDeep } from "lodash";

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };

    const createdBoard = await boardModel.createNew(newBoard);

    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);

    return getNewBoard;
  } catch (error) {
    throw error;
  }
};

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId);

    if (!board) throw new ApiError(StatusCodes.NOT_FOUND, "Board not found");

    // Deep clone board ra một cái mới để xứ lý, không thay đổi cái ban đầu
    const resBoard = cloneDeep(board);
    // đưa card về đúng column của nó
    resBoard.columns.forEach((column) => {
      // cách dùng equals này là bởi vì ta hiểu ObjectId trong Mongodb có support method equals
      column.cards = resBoard.cards.filter((card) => {
        return card.columnId.equals(column._id);
      });

      // column.cards = resBoard.cards.filter((card) => {
      //   return card.columnId.toString() === column._id.toString();
      // });
    });

    // xóa cái cards ở bên ngoài board
    delete resBoard.cards;

    return resBoard;
  } catch (error) {
    throw error;
  }
};

export const boardService = { createNew, getDetails };
