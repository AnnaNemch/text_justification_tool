import { Router, Request, Response } from "express";
import TextController from "../controllers/text.controller";

const ApiRouter: Router = Router();

ApiRouter.post("/", TextController.justifyText);

export default ApiRouter;
