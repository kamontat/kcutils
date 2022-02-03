/**
 * @packageDocumentation
 * @module Logger.Constants
 */

import { LoggerTypeBuilder } from "../builder/LoggerTypeBuilder";
import { Types } from "../models/logger/LoggerType";

export const types = {
  fatal: LoggerTypeBuilder.initial()
    .withLabel("fatal")
    .withLevel("error")
    .withNewBadge(() => "X")
    .withNewColor((c) => c)
    .get(),
  error: LoggerTypeBuilder.initial()
    .withLabel("error")
    .withLevel("error")
    .withNewBadge(() => "x")
    .withNewColor((c) => c)
    .get(),
  warn: LoggerTypeBuilder.initial()
    .withLabel("warn")
    .withLevel("warn")
    .withNewBadge(() => "!!")
    .withNewColor((c) => c)
    .get(),
  success: LoggerTypeBuilder.initial()
    .withLabel("success")
    .withLevel("info")
    .withNewBadge(() => "/")
    .withNewColor((c) => c)
    .get(),
  wait: LoggerTypeBuilder.initial()
    .withLabel("waiting")
    .withLevel("info")
    .withNewBadge(() => "...")
    .withNewColor((c) => c)
    .get(),
  complete: LoggerTypeBuilder.initial()
    .withLabel("complete")
    .withLevel("info")
    .withNewBadge(() => "[X]")
    .withNewColor((c) => c)
    .get(),
  start: LoggerTypeBuilder.initial()
    .withLabel("start")
    .withLevel("info")
    .withNewBadge(() => "|>")
    .withNewColor((c) => c)
    .get(),
  stop: LoggerTypeBuilder.initial()
    .withLabel("stop")
    .withLevel("info")
    .withNewBadge(() => "[O]")
    .withNewColor((c) => c)
    .get(),
  watch: LoggerTypeBuilder.initial()
    .withLabel("watching")
    .withLevel("info")
    .withNewBadge(() => "...")
    .withNewColor((c) => c)
    .get(),
  info: LoggerTypeBuilder.initial()
    .withLabel("info")
    .withLevel("info")
    .withNewBadge(() => "#")
    .withNewColor((c) => c)
    .get(),
  log: LoggerTypeBuilder.initial().get(),
  debug: LoggerTypeBuilder.initial()
    .withLabel("debug")
    .withLevel("debug")
    .withNewBadge(() => "()")
    .withNewColor((c) => c)
    .get(),
  silly: LoggerTypeBuilder.initial()
    .withLabel("silly")
    .withLevel("silly")
    .withNewBadge(() => "()")
    .withNewColor((c) => c)
    .get(),
};

export type DefaultKeyTypes = keyof typeof types;

export type DefaultTypes = Types<DefaultKeyTypes>;
