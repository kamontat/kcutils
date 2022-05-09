import { Context } from "@kcinternal/runners";

import { option, action } from "../src/controllers/build";

describe("Build Controller", () => {
  const context = Context.build();

  describe("Build Option", () => {
    test("constants", () => {
      expect(option.name).toBe("option");
      expect(option.previous).toBeFalsy();
    });

    test("default option", () => {
      expect(option.transform([], context)).toEqual({
        "args": [],
        "debug": false,
        "dryrun": false,
        "extraArgs": [],
        "help": false,
        "raw": []
      });
    });

    test("custom option", () => {
      expect(option.transform(["--dryrun", "--help"], context)).toEqual({
        "args": [],
        "debug": false,
        "dryrun": true,
        "extraArgs": [],
        "help": true,
        "raw": ["--dryrun", "--help"]
      });
    });
  });

  describe("Build Action", () => {
    test("constants", () => {
      expect(action.name).toBe("action");
      expect(action.previous).toBeTruthy();
    });
  });
});
