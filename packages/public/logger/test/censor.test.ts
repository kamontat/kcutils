import { padEnd } from "@kcutils/helper";

import { LoggerBuilder } from "../index";

describe("Logger censor", () => {
  const def = LoggerBuilder.default();

  test("remove all secret words", () => {
    const logger = def.copy({ secrets: ["data"], censor: () => "censor" });

    const censored = logger.censor("new data data");
    expect(censored).toEqual("new [censor] [censor]");

    logger.unsecret();

    const censored2 = logger.censor("new data");
    expect(censored2).toEqual("new data");
  });

  test.each([
    [
      { secrets: ["hello", "new", "man"] },
      "hello, I'm become a new woman after I meet man like you",
      "[secure], I'm become a [secure] wo[secure] after I meet [secure] like you",
    ],
    [
      {
        secrets: ["hello", "new", "man"],
        censor: (s: string) => padEnd("", s.length, "*"),
      },
      "hello, I'm become a new woman after I meet man like you",
      "[*****], I'm become a [***] wo[***] after I meet [***] like you",
    ],
    [
      {},
      "hello, I'm become a new woman after I meet man like you",
      "hello, I'm become a new woman after I meet man like you",
    ],
  ])("censor message with config %p", (settings, original, expected) => {
    const logger = def.copy(settings, { secret: { prefix: "[", suffix: "]" } });
    const censored = logger.censor(original);

    expect(censored).toEqual(expected);
  });
});
