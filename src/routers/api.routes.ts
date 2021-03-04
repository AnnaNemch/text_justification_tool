import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import TextController from "../controllers/text.controller";
import UserController from "../controllers/user.controller";

const ApiRouter: Router = Router();

ApiRouter.post(
  "/justify",
  AuthMiddleware.checkUser,
  TextController.justifyText
);

ApiRouter.post("/token", UserController.addUser);

export default ApiRouter;
