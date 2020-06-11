import { array } from "..";

describe("Array helper", () => {
  test("change string to string array", () => {
    expect(array.toArray("string")).toHaveLength(1);
  });

  test("change object to object array", () => {
    const obj = { a: 12, b: "hello" };
    const arr = array.toArray(obj);

    expect(arr).toHaveLength(1);
    expect(arr[0]).toEqual(obj);
  });

  test("flatmap array", () => {
    const str = "asdf";
    const a1: (string | string[])[] = [str, str, str, [str], str, [str, str, str]];
    const a2: (string | string[])[] = [[str, str], str, str, [str, str]];
    const arr = array.flatmap(a1, a2);

    expect(arr).toHaveLength(4);
  });
});
