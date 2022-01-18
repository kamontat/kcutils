import { vol } from "memfs";
import { Context, LocationContext } from "../../index";

jest.mock("fs");

describe("LocationContext", () => {
  test("create location context", () => {
    vol.fromJSON({
      "./package.json": "{}",
    });

    const context = Context.build().location;
    expect(context).toBeDefined();
  });

  describe("testing on virual file system", () => {
    beforeEach(() => {
      vol.reset();
    });

    test("check existness or file on sync mode", () => {
      vol.fromJSON(
        {
          "./test.txt": "true",
        },
        "/tmp"
      );

      const context = new LocationContext();
      expect(context.isExistSync("/tmp", "test.txt")).toBe(true);
    });

    test("check existness or file on async mode", async () => {
      vol.fromJSON(
        {
          "./test.txt": "true",
        },
        "/tmp"
      );

      const context = new LocationContext();
      const output = await context.isExist("/tmp", "test.txt");
      expect(output).toBe(true);
    });
  });
});
