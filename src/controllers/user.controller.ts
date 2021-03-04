import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities";
import { getRepository } from "typeorm";
import HttpStatusCodes from "http-status-codes";

export default class UserController {
  public static async addUser(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const email = req.body.email;

    const foundUser = await userRepository.find({ email });

    if (foundUser?.length) {
      return res
        .status(HttpStatusCodes.CONFLICT)
        .send(`User with email - ${email} already exists`);
    }

    try {
      const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET);
      await userRepository.save({ email });
      
      res.json({ token });
    } catch (error) {
      res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error while adding a user");
    }
  }
}
