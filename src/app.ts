require("dotenv").config();

import { connectDB } from "./database";

import express from "express";
import bodyParser from "body-parser";
import ApiRouter from "./routers/api.routes";

const app = express();

app.use(express.json());
app.use(bodyParser.text());
app.use(bodyParser.json());

app.use("/api", ApiRouter);

const startServer = async () => {
  await app.listen(process.env.PORT, () => {
    console.log("Express server listening on port - ", process.env.PORT);
  });
};

(async () => {
  await connectDB();
  await startServer();
})();
