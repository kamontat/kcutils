import { Logger, defaultLevels } from "../index";

describe("Demo", () => {
  test("static demo must be hello @kcinternal/logger", () => {
    const logger = new Logger(defaultLevels);
    console.log(logger);
  });
});
