const NUMBER_OF_CHARACTERS_PER_LINE = 80;

export class TextService {
  public static getWordsCount(inputText: string) {
    return inputText.split(/\s+/).length;
  }

  public static justifyText(inputText: string) {
    let paragraphs = inputText.split(/[\r?\n]+/);
    paragraphs = paragraphs.map((paragraph) =>
      this.processParagraph(paragraph)
    );
    return paragraphs.join("\n");
  }

  private static processParagraph(inputText: string) {
    const words = inputText.split(/\s+/);
    const justifiedLines: string[] = [];

    let currentLine: string[] = [];
    let currentNumberOfCharacters = 0;

    words.forEach((word) => {
      const wordLength = word.length;

      const spacesCount = currentLine.length - 1;
      const charactersCount =
        currentNumberOfCharacters + spacesCount + wordLength + 1;

      if (charactersCount <= NUMBER_OF_CHARACTERS_PER_LINE) {
        currentLine.push(word);
        currentNumberOfCharacters += wordLength;
      } else {
        const spacesToAdd =
          NUMBER_OF_CHARACTERS_PER_LINE - currentNumberOfCharacters;

        const justifiedLine = this.addMissingSpaces(
          currentLine,
          spacesToAdd,
          spacesCount
        );
        justifiedLines.push(justifiedLine);

        currentLine = [word];
        currentNumberOfCharacters = wordLength;
      }
    });

    justifiedLines.push(currentLine.join(" ")); // last line

    return justifiedLines.join("\n");
  }

  private static addMissingSpaces(
    words: string[],
    spacesToAdd: number,
    availableSpaces: number
  ): string {
    const baseSpaceSize = Math.floor(spacesToAdd / availableSpaces);
    const extraSpaces = spacesToAdd % availableSpaces;

    const wordsIndexesWithExtraSpace = extraSpaces
      ? [...Array(words.length - 1).keys()]
          .sort(() => Math.random() - 0.5)
          .slice(0, extraSpaces)
      : [];

    wordsIndexesWithExtraSpace.forEach((index) => {
      words[index] += " ";
    });

    return words.join(" ".repeat(baseSpaceSize));
  }
}
