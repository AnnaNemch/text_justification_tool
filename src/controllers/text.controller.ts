import { Request, Response } from "express";
import { User } from "../entities";
import { TextService } from "../services";
import moment from "moment";
import { getRepository } from "typeorm";
import HttpStatusCodes from "http-status-codes";

const MAX_WORDS_ALLOWED_TO_PROCESS = 80000;
const DATE_FORMAT = "YYYY-MM-DD";

export default class TextController {
  public static async justifyText(req: Request, res: Response) {
    const userRepository = getRepository(User);

    const inputText = req.body;

    const user: User = (req as any).user;
    const inputTextWordsCount = TextService.getWordsCount(inputText);

    const today = moment.utc().format(DATE_FORMAT);
    const lastProcessDate = moment
      .utc(user.lastProcessDate)
      .format(DATE_FORMAT);

    let totalProcessedWordsCount =
      lastProcessDate === today ? inputTextWordsCount + user.processedWords : inputTextWordsCount;

    if (totalProcessedWordsCount > MAX_WORDS_ALLOWED_TO_PROCESS) {
      return res
        .status(HttpStatusCodes.PAYMENT_REQUIRED)
        .send(
          `Cannot process more than ${MAX_WORDS_ALLOWED_TO_PROCESS} words per day`
        );
    }

    try {
      const justifiedText = TextService.justifyText(inputText);

      user.processedWords = totalProcessedWordsCount;
      user.lastProcessDate = moment().toDate();
      await userRepository.save(user);

      res.setHeader("Content-type", "text/plain");
      return res.send(justifiedText);
    } catch (error) {
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error during text alignment");
    }
  }
}
