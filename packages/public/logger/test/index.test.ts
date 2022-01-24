import { Logger, LoggerBuilder } from "../index";

import { DateTimeFormat } from "../src/models/logger/LoggerOption";
import { Levels } from "../src/constants/levels";
import { DefaultKeyTypes, types } from "../src/constants/types";

import {
  newMockStream,
  withCustomStream,
  getStreamChunk,
} from "./utils/stream";

describe("logger modules", () => {
  describe("Logger object", () => {
    const def = Logger.create(); // using logger create utils

    test("Logger.create should equals to LoggerBuilder", () => {
      const l1 = Logger.create();
      const l2 = LoggerBuilder.initial().get();

      expect(l1.toString()).toEqual(l2.toString());
    });

    test("create default logger", () => {
      const logger = def.copy();

      expect(logger).not.toBeUndefined();

      expect(logger.isEnabled()).toEqual(true);
      expect(logger.isColor()).toEqual(true);
    });

    test("custom logger configuration", () => {
      const logger = def.copy({ color: false, disabled: true });

      expect(logger).not.toBeUndefined();

      expect(logger.isEnabled()).toEqual(false);
      expect(logger.isColor()).toEqual(false);
    });

    test("disable color on promise", () => {
      const logger = def.copy();

      expect(logger.isColor()).toEqual(true);

      logger.uncolor();
      expect(logger.isColor()).toEqual(false);

      logger.color();
      expect(logger.isColor()).toEqual(true);
    });

    test("getting levels", () => {
      const logger = def.copy();
      expect(logger.levels).not.toBeUndefined();
      expect(logger.levels.length).toBeGreaterThan(5);
    });

    test("default scopes name", () => {
      const logger = def.copy();
      expect(logger.scopes).toHaveLength(0);
    });

    test("add new scopes name", () => {
      const logger = def.copy({ scopes: ["name"] });
      expect(logger.scopes).toHaveLength(1);

      logger.options({ scopes: ["add", "more"] });
      expect(logger.scopes).toHaveLength(3);

      logger.unscope();
      expect(logger.scopes).toHaveLength(0);
    });

    test("new settings", () => {
      const a = withCustomStream(def.copy());
      const b = withCustomStream(def.copy());

      a.logger
        .settings({ message: { bold: true } })
        .print("success", "scope is bold");
      b.logger
        .settings({ seperator: { italic: true } })
        .print("success", "label is italic");

      const chunkA = getStreamChunk(a.stream);
      const chunkB = getStreamChunk(b.stream);

      expect(chunkA).not.toEqual(chunkB);
    });

    test("new logger by builder.load", () => {
      const loggerA = def.copy({ secrets: ["after", "coding"] });
      const loggerB = LoggerBuilder.load(loggerA)
        .updateOption((b) => b.withJson(true))
        .get();

      expect(loggerA.id).not.toEqual(loggerB.id);

      expect(loggerA.option.separator).toEqual(loggerB.option.separator);
      expect(loggerA.option.json).not.toEqual(loggerB.option.json);
      expect(loggerA.option.secrets).toEqual(loggerB.option.secrets);
    });

    test.each(Object.keys(types).map((v) => [v]) as DefaultKeyTypes[][])(
      "print '%s' type to stream and check",
      (type: DefaultKeyTypes) => {
        const typeObject = types[type];

        const { stream, logger } = withCustomStream(
          def.copy({ level: "silly" })
        );
        logger.print(type, { message: "hello world" });

        expect(stream).toBeCalledTimes(1);

        const chunk = getStreamChunk(stream);
        expect(chunk).toContain("hello world");
        expect(chunk).toContain(typeObject.label);
      }
    );

    test("continue log message to same stream object", () => {
      const { stream, logger } = withCustomStream(def);

      logger.print("start", { message: "hello world" });
      expect(stream).toBeCalledTimes(1);

      logger.print("wait", "second called");
      expect(stream).toBeCalledTimes(2);
    });

    test("log custom label message", () => {
      const { stream, logger } = withCustomStream(def);

      logger.print("stop", { message: "custom label", label: "asdf" });

      const chunk = getStreamChunk(stream);
      expect(chunk).toContain("asdf");
    });

    test("log custom prefix message", () => {
      const { stream, logger } = withCustomStream(
        def.copy({}, { prefix: { prefix: "(", suffix: ")", uppercase: true } })
      );

      logger.print("success", { message: "custom prefix", prefix: "ald" });

      const chunk = getStreamChunk(stream);
      expect(chunk).toContain("(ALD)");
    });

    test("log custom suffix message", () => {
      const { stream, logger } = withCustomStream(
        def.copy({}, { suffix: { prefix: "{", suffix: "}" } })
      );

      logger.print("wait", { message: "custom suffix", suffix: "suf" });

      const chunk = getStreamChunk(stream);
      expect(chunk).toContain("{suf}");
    });

    test("override log stream on each print", () => {
      const stream = newMockStream();
      const _def = withCustomStream(def);
      _def.logger.print("start", { message: "hello world" });
      _def.logger.print("start", { message: "hello world" });

      _def.logger.print("start", {
        message: "hello world",
        stream: stream.stream,
      });

      expect(_def.stream).toBeCalledTimes(2);
      expect(stream.fn).toBeCalledTimes(1);
    });

    test("override log stream on each print by append", () => {
      const stream = newMockStream();
      const _def = withCustomStream(def);
      _def.logger.print("start", { message: "hello world" });
      _def.logger.print("start", { message: "hello world" });

      _def.logger.print("start", {
        message: "hello world",
        stream: stream.stream,
        appendStream: true,
      });

      expect(_def.stream).toBeCalledTimes(3);
      expect(stream.fn).toBeCalledTimes(1);
    });

    test("log same message should get same result", () => {
      const _logger = def.copy({ color: false });

      const d = withCustomStream(_logger);
      d.logger.print("start", { message: "hello world" });

      const e = withCustomStream(_logger);
      e.logger.print("start", "hello world");

      expect(d.stream).toBeCalledTimes(1);
      expect(e.stream).toBeCalledTimes(1);

      const chunk1 = getStreamChunk(d.stream);
      const chunk2 = getStreamChunk(e.stream);

      expect(chunk1).toEqual(chunk2);
    });

    test("equals should check 'color' field", () => {
      const l1 = def.copy({ color: true });
      const l11 = def.copy({ color: true });

      const l2 = def.copy({ color: false });

      expect(l1.equals(l2)).toEqual(false);
      expect(l11.equals(l1)).toEqual(true);
    });

    test("equals should check 'scopes' field", () => {
      const scopes = ["fields"];
      const l1 = def.copy({ scopes });
      const l2 = def.copy({ scopes });

      expect(l2.equals(l1)).toEqual(true);
      expect(l2.equals(def)).toEqual(false);
    });

    test("equals should only some fields", () => {
      const l1 = def.copy({ separator: "x" });
      const l2 = def.copy();

      expect(l1.equals(l2)).toEqual(true);
    });

    describe.each([
      ["silly" as DefaultKeyTypes, "silly" as Levels, 1],
      ["debug" as DefaultKeyTypes, "silly" as Levels, 1],
      ["start" as DefaultKeyTypes, "silly" as Levels, 1],
      ["wait" as DefaultKeyTypes, "silly" as Levels, 1],
      ["warn" as DefaultKeyTypes, "silly" as Levels, 1],
      ["error" as DefaultKeyTypes, "silly" as Levels, 1],

      ["silly" as DefaultKeyTypes, "debug" as Levels, 0],
      ["debug" as DefaultKeyTypes, "debug" as Levels, 1],
      ["success" as DefaultKeyTypes, "debug" as Levels, 1],
      ["warn" as DefaultKeyTypes, "debug" as Levels, 1],
      ["error" as DefaultKeyTypes, "debug" as Levels, 1],

      ["silly" as DefaultKeyTypes, "info" as Levels, 0],
      ["debug" as DefaultKeyTypes, "info" as Levels, 0],
      ["log" as DefaultKeyTypes, "info" as Levels, 1],
      ["info" as DefaultKeyTypes, "info" as Levels, 1],
      ["warn" as DefaultKeyTypes, "info" as Levels, 1],
      ["error" as DefaultKeyTypes, "info" as Levels, 1],

      ["silly" as DefaultKeyTypes, "warn" as Levels, 0],
      ["debug" as DefaultKeyTypes, "warn" as Levels, 0],
      ["warn" as DefaultKeyTypes, "warn" as Levels, 1],
      ["error" as DefaultKeyTypes, "warn" as Levels, 1],

      ["silly" as DefaultKeyTypes, "error" as Levels, 0],
      ["debug" as DefaultKeyTypes, "error" as Levels, 0],
      ["watch" as DefaultKeyTypes, "error" as Levels, 0],
      ["info" as DefaultKeyTypes, "error" as Levels, 0],
      ["warn" as DefaultKeyTypes, "error" as Levels, 0],
      ["error" as DefaultKeyTypes, "error" as Levels, 1],
      ["fatal" as DefaultKeyTypes, "error" as Levels, 1],

      ["silly" as DefaultKeyTypes, "silent" as Levels, 0],
      ["debug" as DefaultKeyTypes, "silent" as Levels, 0],
      ["stop" as DefaultKeyTypes, "silent" as Levels, 0],
      ["success" as DefaultKeyTypes, "silent" as Levels, 0],
      ["warn" as DefaultKeyTypes, "silent" as Levels, 0],
      ["error" as DefaultKeyTypes, "silent" as Levels, 0],
      ["fatal" as DefaultKeyTypes, "silent" as Levels, 0],
    ])("run type(%s) on level(%s) %s times", (type, level, expected) => {
      test("on print", () => {
        const message = { message: "hello world" };

        const { logger, stream } = withCustomStream(
          def.copy({ debug: false, level })
        );
        logger.print(type, message);

        expect(stream).toBeCalledTimes(expected);
      });

      test("on build", () => {
        const message = { message: "hello world" };

        const logger = def.copy({ level });
        const msg = logger.build(type, message);

        if (expected === 0) expect(msg).toEqual("");
        else expect(msg).not.toEqual("");
      });
    });

    test.each([
      [{ color: false }, { color: true }],
      [{ json: true }, { json: false }],
      [
        { datetime: "time" as DateTimeFormat },
        { datetime: "date" as DateTimeFormat },
      ],
      [
        { datetime: "datetime" as DateTimeFormat },
        { datetime: "timestamp" as DateTimeFormat },
      ],
      [
        { datetime: "unknown" as DateTimeFormat },
        { datetime: "time" as DateTimeFormat },
      ],
      [
        { datetime: "unknown" as DateTimeFormat },
        { datetime: "datetime" as DateTimeFormat },
      ],
      [
        { datetime: "unknown" as DateTimeFormat },
        { datetime: "timestamp" as DateTimeFormat },
      ],
      [{ scopes: [] }, { scopes: ["hello", "world"] }],
      [{ secrets: [] }, { secrets: ["world"] }],
      [{ separator: ">" }, {}],
    ])(
      "difference config difference result (%p != %p)",
      (settingsA, settingsB) => {
        const type = "start";
        const message = { message: "hello world" };

        const d = withCustomStream(def.copy(settingsA));
        d.logger.print(type, message);

        const e = withCustomStream(def.copy(settingsB));
        e.logger.print(type, message);

        expect(d.stream).toBeCalledTimes(1);
        expect(e.stream).toBeCalledTimes(1);

        const chunk1 = getStreamChunk(d.stream);
        const chunk2 = getStreamChunk(e.stream);

        expect(chunk1).not.toEqual(chunk2);
      }
    );

    test("start and end timer with default label", () => {
      const a = withCustomStream(def);

      a.logger.startTimer();
      expect(a.stream).toBeCalledTimes(1);
      expect(getStreamChunk(a.stream)).toContain("timer_0");

      a.logger.endTimer();
      expect(a.stream).toBeCalledTimes(2);
      expect(getStreamChunk(a.stream, 2)).toContain("timer_0");
    });

    test("start and end timer with custom label", () => {
      const label = "custom";
      const a = withCustomStream(def);

      a.logger.startTimer(label);
      expect(a.stream).toBeCalledTimes(1);
      expect(getStreamChunk(a.stream)).toContain(label);

      a.logger.endTimer(label);
      expect(a.stream).toBeCalledTimes(2);
      expect(getStreamChunk(a.stream, 2)).toContain(label);
    });

    test("end timer when no timer run", () => {
      const label = "custom";
      const a = withCustomStream(def);

      a.logger.endTimer(label);
      expect(a.stream).toBeCalledTimes(0);
    });
  });

  // @removed
  // describe("Logger Settings", () => {
  //   test.each([
  //     [{}, {}],
  //     [undefined, undefined],
  //     [null, null],
  //     ["string", "string"],
  //   ])("settingBuilder(%s) shouldn't return %s", (a, b) => {
  //     const d = settingBuilder(a);
  //     expect(d).not.toEqual(b);
  //   });

  //   test.each([
  //     [{}, defaultSettings],
  //     ["setting", defaultSettings],
  //   ])("settingBuilder(%s) should return %p", (a, b) => {
  //     const d = settingBuilder(a);
  //     expect(d).toEqual(b);
  //   });
  // });
});
