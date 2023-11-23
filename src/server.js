/* eslint-disable no-console */
import express from "express";
import exitHook from "async-exit-hook";
import { CLOSE_DB, CONNECT_DB, GET_DB } from "./config/mongodb";

const START_SERVER = () => {
  const app = express();

  const hostname = "localhost";
  const port = 8017;

  app.get("/", (req, res) => {
    res.end("<h1>Hello World!</h1><hr>");
  });

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello Chi Hieu3 Dev, I am running at ${hostname}:${port}/`);
  });

  // thực hiện các tác vụ cleanup trước khi dừng server
  exitHook(() => {
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
