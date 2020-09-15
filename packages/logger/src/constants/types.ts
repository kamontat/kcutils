import { LoggerTypeBuilder } from "../builder/LoggerTypeBuilder";
import { Types } from "../models/logger/LoggerType";

export const types = {
  fatal: LoggerTypeBuilder.initial()
    .withLabel("fatal")
    .withLevel("error")
    .withNewBadge(b => b.cross)
    .withNewColor(c => c.red)
    .get(),
  error: LoggerTypeBuilder.initial()
    .withLabel("error")
    .withLevel("error")
    .withNewBadge(b => b.cross)
    .withNewColor(c => c.red)
    .get(),
  warn: LoggerTypeBuilder.initial()
    .withLabel("warn")
    .withLevel("warn")
    .withNewBadge(b => b.warning)
    .withNewColor(c => c.yellow)
    .get(),
  success: LoggerTypeBuilder.initial()
    .withLabel("success")
    .withLevel("info")
    .withNewBadge(b => b.tick)
    .withNewColor(c => c.green)
    .get(),
  wait: LoggerTypeBuilder.initial()
    .withLabel("waiting")
    .withLevel("info")
    .withNewBadge(b => b.ellipsis)
    .withNewColor(c => c.blue)
    .get(),
  complete: LoggerTypeBuilder.initial()
    .withLabel("complete")
    .withLevel("info")
    .withNewBadge(b => b.checkboxOn)
    .withNewColor(c => c.cyan)
    .get(),
  start: LoggerTypeBuilder.initial()
    .withLabel("start")
    .withLevel("info")
    .withNewBadge(b => b.play)
    .withNewColor(c => c.green)
    .get(),
  stop: LoggerTypeBuilder.initial()
    .withLabel("stop")
    .withLevel("info")
    .withNewBadge(b => b.squareSmallFilled)
    .withNewColor(c => c.yellow)
    .get(),
  watch: LoggerTypeBuilder.initial()
    .withLabel("watching")
    .withLevel("info")
    .withNewBadge(b => b.ellipsis)
    .withNewColor(c => c.yellow)
    .get(),
  info: LoggerTypeBuilder.initial()
    .withLabel("info")
    .withLevel("info")
    .withNewBadge(b => b.info)
    .withNewColor(c => c.blue)
    .get(),
  log: LoggerTypeBuilder.initial().get(),
  debug: LoggerTypeBuilder.initial()
    .withLabel("debug")
    .withLevel("debug")
    .withNewBadge(b => b.circleCircle)
    .withNewColor(c => c.gray)
    .get(),
  silly: LoggerTypeBuilder.initial()
    .withLabel("silly")
    .withLevel("silly")
    .withNewBadge(b => b.circleCircle)
    .withNewColor(c => c.gray)
    .get(),
};

export type DefaultKeyTypes = keyof typeof types;

export type DefaultTypes = Types<DefaultKeyTypes>;
