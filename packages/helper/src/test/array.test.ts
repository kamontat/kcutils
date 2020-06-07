import { jsonToArray } from "..";

describe("Array Helper", () => {
  test("empty json", () => {
    const json = {};
    const array = jsonToArray(json);

    expect(array).toHaveLength(0);
  });

  test("partial json not filter empty string", () => {
    const json = { one: { index: 1, data: "string" }, two: undefined };
    const array = jsonToArray(json);

    expect(array).toHaveLength(2);
    expect(array).toContain("string");
  });

  test("multiple partial json", () => {
    const json = {
      one: { index: 1, data: "string" },
      two: undefined,
      three: undefined,
      four: undefined,
      five: { index: 2, data: "number" },
    };
    const array = jsonToArray(json);

    expect(array).toHaveLength(5);
    expect(array).toContain("string");
    expect(array).toContain("number");
  });

  test("complete json", () => {
    const json = {
      two: { index: 1, data: "string" },
      one: { index: 3, data: "number" },
      three: { index: 2, data: "boolean" },
    };
    const array = jsonToArray(json);

    expect(array).toHaveLength(3);
    expect(array[0]).toEqual("string");
    expect(array[1]).toEqual("boolean");
    expect(array[2]).toEqual("number");
  });

  test("complete json with data as string[]", () => {
    const json = {
      two: { index: 1, data: ["string", "number", "boolean"] },
      one: { index: 3, data: ["number3", "string3"] },
      three: { index: 2, data: "boolean2" },
    };
    const array = jsonToArray(json);

    expect(array).toHaveLength(6);
    expect(array[0]).toEqual("string");
    expect(array[3]).toEqual("boolean2");
    expect(array[4]).toEqual("number3");
  });
});
