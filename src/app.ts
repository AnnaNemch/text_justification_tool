require('dotenv').config()

import express from "express";
import bodyParser from "body-parser";

import ApiRouter from "./routers/api.routes";

const app = express();

app.use(bodyParser.text());
app.use("/api", ApiRouter);

app.listen(process.env.PORT, () => {
  // tslint:disable-next-line:no-console
  console.log("Express server listening on port - ", process.env.PORT);
});
