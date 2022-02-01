import type { Writable } from "../src/models/custom/Writable";

import { WithLogger, LoggerOptionBuilder, LoggerBuilder } from "../index";
import { newMockStream } from "./utils/stream";
import { StrictOption } from "../src/models/logger/LoggerOption";

class T extends WithLogger {
  fn: jest.Mock<any, any>;
  s: Writable;

  constructor(builder: LoggerBuilder<""> = LoggerBuilder.initial()) {
    super(builder);

    const { fn, stream } = newMockStream();
    this.fn = fn;
    this.s = stream;
  }

  get id(): number {
    return this.logger.id;
  }

  override() {
    this.logger.options({ streams: [this.s], overrideStream: true });
  }

  log() {
    this.logger.print("info", "print some message");
  }

  options() {
    return this.logger.option;
  }

  updateV1() {
    this.updateLogger((l) => l.options({ level: "silent" }));
  }

  updateV2() {
    this.updateLoggerOption((b) => b.withLevel("silent"));
  }
}

class U extends WithLogger {
  constructor() {
    super();
  }

  get id(): number {
    return this.logger.id;
  }

  options() {
    return this.logger.option;
  }
}

const checkOption = (o1: StrictOption, o2: StrictOption) => {
  expect(o1.color).toEqual(o2.color);
  expect(o1.json).toEqual(o2.json);
  expect(o1.interactive).toEqual(o2.interactive);
  expect(o1.datetime).toEqual(o2.datetime);
  expect(o1.debug).toEqual(o2.debug);
  expect(o1.disabled).toEqual(o2.disabled);
  expect(o1.level).toEqual(o2.level);
  expect(o1.output).toEqual(o2.output);
  expect(o1.scopes).toEqual(o2.scopes);
  expect(o1.secrets).toEqual(o2.secrets);
  expect(o1.separator).toEqual(o2.separator);
  expect(o1.overrideStream).toEqual(o2.overrideStream);
};

describe("WithLogger class", () => {
  test("option never by undefined after process", () => {
    const t = new T();
    expect(t.options()).not.toBeUndefined();
  });

  test("call internal logger from external class", () => {
    const t = new T();

    t.log();
    expect(t.fn).not.toBeCalled();

    t.override();
    t.log();
    expect(t.fn).toBeCalled();
  });

  test("undefined logger builder will use default config", () => {
    const t1 = new T();
    const t1Option = t1.options();
    expect(t1Option).not.toBeUndefined();

    const t2 = new T(undefined);
    const t2Option = t2.options();
    expect(t2Option).not.toBeUndefined();

    checkOption(t1Option, t2Option);
  });

  test("with custom logger option builder", () => {
    const optionBuilder = LoggerOptionBuilder.initial()
      .withColor(false)
      .withOutput(["file"])
      .withJson(false);
    const t = new T(LoggerBuilder.initial().withOption(optionBuilder));
    const option = t.options();

    expect(option.color).toEqual(false);
    expect(option.output).toStrictEqual(["file"]);
    expect(option.json).toEqual(false);
  });

  test("with empty parameter in WithLogger", () => {
    const u = new U();
    const uOption = u.options();

    const t = new T();
    const tOption = t.options();

    checkOption(uOption, tOption);
  });

  test("update logger option via deprecated method", () => {
    const t = new T();

    const id = t.id;
    const level = t.options().level;

    t.updateV1();

    const nid = t.id;
    const nlevel = t.options().level;

    expect(id).not.toEqual(nid);
    expect(level).not.toEqual(nlevel);
  });

  test("update logger option via new method", () => {
    const t = new T();

    const id = t.id;
    const level = t.options().level;

    t.updateV2();

    const nid = t.id;
    const nlevel = t.options().level;

    expect(id).not.toEqual(nid);
    expect(level).not.toEqual(nlevel);
  });
});
