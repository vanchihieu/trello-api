import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardController } from "~/controllers/boardController";
import { boardValidation } from "~/validations/boardValidation";

const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({
      message: "Get: APi get list boards",
    });
  })

  //localhost:8017/v1/boards
  .post(boardValidation.createNew, boardController.createNew);

Router.route("/:id").get(boardController.getDetails).put()

export const boardRoute = Router;
