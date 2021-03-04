import { NextFunction, Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";
import { User } from "../entities";
import { getRepository } from "typeorm";

export class AuthMiddleware {
  public static async checkUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const token = req.header("token");
    if (!token) {
      res.status(HttpStatusCodes.BAD_REQUEST).send("No token provided");
      return;
    }

    try {
      const result: { email: string; iat: number } = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      ) as any;
      const userRepository = getRepository(User);

      const foundUser = await userRepository.findOne({ email: result.email });

      if (!foundUser) {
        throw `User with such email ${result.email} doesn't exist in the system`;
      }

      (req as any).user = foundUser;
      next();
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .send(`Authorization Error - ${error.message}`);
      return;
    }
  }
}
