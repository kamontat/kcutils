import { vol } from "memfs";
import { Context, LocationContext } from "../../index";

jest.mock("fs");

describe("LocationContext", () => {
  vol.fromJSON({
    "./package.json": "{}",
  });

  test("create location context", () => {
    const context = Context.build().location;
    expect(context).toBeDefined();
  });

  describe("testing on virual file system", () => {
    beforeEach(() => {
      vol.reset();
    });

    test("check file existness on sync mode", () => {
      vol.fromJSON(
        {
          "./test.txt": "true",
        },
        "/tmp"
      );

      const context = new LocationContext();

      expect(context.isExistSync("/tmp", "test.txt")).toBe(true);
      expect(context.isExistSync("/tmp", "test2.txt")).toBe(false);
    });

    test("check file existness on async mode", async () => {
      vol.fromJSON(
        {
          "./test.txt": "true",
        },
        "/tmp"
      );

      const context = new LocationContext();

      const output1 = await context.isExist("/tmp", "test.txt");
      expect(output1).toBe(true);

      const output2 = await context.isExist("/tmp", "test2.txt");
      expect(output2).toBe(false);
    });

    test("find existing from given paths on sync mode", () => {
      vol.fromJSON(
        {
          "./test.txt": "true",
        },
        "/tmp"
      );

      const context = new LocationContext();
      expect(() => {
        context.findExistSync(
          "/tmp/test1.txt",
          "/tmp/test2.txt",
          "/tmp/test3.txt"
        );
      }).toThrow("cannot find existing path");

      expect(
        context.findExistSync(
          "/tmp/test1.txt",
          "/tmp/test2.txt",
          "/tmp/test.txt"
        )
      ).toEqual("/tmp/test.txt");
    });
  });

  test("find existing from given paths on async mode", async () => {
    vol.fromJSON(
      {
        "./test.txt": "true",
      },
      "/tmp"
    );

    const context = new LocationContext();

    const output1 = context.findExist(
      "/tmp/test1.txt",
      "/tmp/test2.txt",
      "/tmp/test3.txt"
    );

    await expect(output1).rejects.toEqual(
      new Error("cannot find existing path")
    );

    const output2 = await context.findExist(
      "/tmp/test.txt",
      "/tmp/test2.txt",
      "/tmp/test3.txt"
    );
    expect(output2).toEqual("/tmp/test.txt");
  });
});
