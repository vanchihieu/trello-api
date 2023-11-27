/* eslint-disable no-console */
import express from "express";
import exitHook from "async-exit-hook";
import { CLOSE_DB, CONNECT_DB } from "./config/mongodb";
import { env } from "./config/environment";
import { APIs_V1 } from "./routes/v1";
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware";

const START_SERVER = () => {
  const app = express();
  CONNECT_DB();
  app.use(express.json());

  app.use("/v1", APIs_V1);

  // Middleware xử lý lỗi tập trung trong ứng dụng
  app.use(errorHandlingMiddleware);

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(
      `Hello ${env.AUTHOR} Dev, I am running at ${env.APP_HOST}:${env.APP_PORT}/`
    );
  });

  // thực hiện các tác vụ cleanup trước khi dừng server
  exitHook(() => {
    console.log("server is shutting down");
    CLOSE_DB();
  });
};

//  IIFE (Immediately Invoked Function Expression)
(async () => {
  try {
    await CONNECT_DB;

    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();

// CONNECT_DB();
// .then(() => console.log("Server started"))
// .then(() => START_SERVER())
// .catch((error) => {
//   console.error(error);
//   process.exit(0);
// });
