import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardValidation } from "~/validations/boardValidation";

const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({
      message: "Get: APi get list boards",
    });
  })

  //localhost:8017/v1/boards
  .post(boardValidation.createNew);

export const boardRoute = Router;
