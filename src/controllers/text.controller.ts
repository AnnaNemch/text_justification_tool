import { Request, Response } from "express";
import { TextService } from "../services";

export default class TextController {
  public static justifyText(req: Request, res: Response) {
    const inputText = req.body;
    const justifiedText = TextService.justifyText(inputText);
    res.setHeader('Content-type', 'text/plain');
    res.send(justifiedText);
  }
}
