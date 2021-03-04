import { Request, Response } from "express";
import { User } from "../entities";
import { TextService } from "../services";
import moment from "moment";

const MAX_WORDS_ALLOWED_TO_PROCESS = 50;

export default class TextController {
  public static justifyText(req: Request, res: Response) {
    const inputText = req.body;

    const justifiedText = TextService.justifyText(inputText);
    
    res.setHeader("Content-type", "text/plain");
    res.send(justifiedText);
  }
}
