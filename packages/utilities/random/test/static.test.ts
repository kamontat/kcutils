import {
  englishLowerAlphabetCharacter,
  englishUpperAlphabetCharacter,
  numberCharacter,
} from "../index";

describe("Constants", () => {
  test("number list", () => {
    expect(numberCharacter).toHaveLength(10);
    expect(numberCharacter).toContainEqual("0");
    expect(numberCharacter).toContainEqual("4");
    expect(numberCharacter).toContainEqual("8");
    expect(numberCharacter).not.toContainEqual("-1");
    expect(numberCharacter).not.toContainEqual("06");
  });

  test("uppercase alphabet", () => {
    expect(englishUpperAlphabetCharacter).toHaveLength(26);
    expect(englishUpperAlphabetCharacter).toContainEqual("B");
    expect(englishUpperAlphabetCharacter).toContainEqual("G");
    expect(englishUpperAlphabetCharacter).toContainEqual("L");
    expect(englishUpperAlphabetCharacter).not.toContainEqual("b");
    expect(englishUpperAlphabetCharacter).not.toContainEqual("o");
    expect(englishUpperAlphabetCharacter).not.toContainEqual("1");
  });

  test("lowercase alphabet", () => {
    expect(englishLowerAlphabetCharacter).toHaveLength(26);
    expect(englishLowerAlphabetCharacter).toContainEqual("l");
    expect(englishLowerAlphabetCharacter).toContainEqual("m");
    expect(englishLowerAlphabetCharacter).toContainEqual("n");
    expect(englishLowerAlphabetCharacter).not.toContainEqual("P");
    expect(englishLowerAlphabetCharacter).not.toContainEqual("Q");
    expect(englishLowerAlphabetCharacter).not.toContainEqual("S");
    expect(englishLowerAlphabetCharacter).not.toContainEqual("9");
    expect(englishLowerAlphabetCharacter).not.toContainEqual("-4");
  });
});
