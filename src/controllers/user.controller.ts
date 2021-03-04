import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities";
import { getRepository } from "typeorm";

export default class UserController {
  public static async addUser(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const email = req.body.email;

    const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET);
    await userRepository.save({ email });
    res.json({ token });
  }
}
