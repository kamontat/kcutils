import { ENGLISH_LOWER_CASE, ENGLISH_UPPER_CASE, NUMBERIC } from "../index";

describe("Constants", () => {
  test("number list", () => {
    expect(NUMBERIC).toHaveLength(10);
    expect(NUMBERIC).toContainEqual("0");
    expect(NUMBERIC).toContainEqual("4");
    expect(NUMBERIC).toContainEqual("8");
    expect(NUMBERIC).not.toContainEqual("-1");
    expect(NUMBERIC).not.toContainEqual("06");
  });

  test("uppercase alphabet", () => {
    expect(ENGLISH_UPPER_CASE).toHaveLength(26);
    expect(ENGLISH_UPPER_CASE).toContainEqual("B");
    expect(ENGLISH_UPPER_CASE).toContainEqual("G");
    expect(ENGLISH_UPPER_CASE).toContainEqual("L");
    expect(ENGLISH_UPPER_CASE).not.toContainEqual("b");
    expect(ENGLISH_UPPER_CASE).not.toContainEqual("o");
    expect(ENGLISH_UPPER_CASE).not.toContainEqual("1");
  });

  test("lowercase alphabet", () => {
    expect(ENGLISH_LOWER_CASE).toHaveLength(26);
    expect(ENGLISH_LOWER_CASE).toContainEqual("l");
    expect(ENGLISH_LOWER_CASE).toContainEqual("m");
    expect(ENGLISH_LOWER_CASE).toContainEqual("n");
    expect(ENGLISH_LOWER_CASE).not.toContainEqual("P");
    expect(ENGLISH_LOWER_CASE).not.toContainEqual("Q");
    expect(ENGLISH_LOWER_CASE).not.toContainEqual("S");
    expect(ENGLISH_LOWER_CASE).not.toContainEqual("9");
    expect(ENGLISH_LOWER_CASE).not.toContainEqual("-4");
  });
});
