import { LoggerType, Types } from "../models/logger/LoggerType";

export const types = {
  fatal: {
    label: "fatal",
    badge: b => b.cross,
    color: c => c.red,
    level: "error",
  } as LoggerType,
  error: {
    label: "error",
    badge: b => b.cross,
    color: c => c.red,
    level: "error",
  } as LoggerType,
  warn: {
    label: "warn",
    badge: b => b.warning,
    color: c => c.yellow,
    level: "warn",
  } as LoggerType,
  fav: {
    label: "favorite",
    badge: b => b.heart,
    color: c => c.magenta,
    level: "info",
  } as LoggerType,
  info: {
    label: "info",
    badge: b => b.info,
    color: c => c.blue,
    level: "info",
  } as LoggerType,
  star: {
    label: "star",
    badge: b => b.star,
    color: c => c.yellow,
    level: "info",
  } as LoggerType,
  success: {
    label: "success",
    badge: b => b.tick,
    color: c => c.green,
    level: "info",
  } as LoggerType,
  wait: {
    label: "waiting",
    badge: b => b.ellipsis,
    color: c => c.blue,
    level: "info",
  } as LoggerType,
  complete: {
    label: "complete",
    badge: b => b.checkboxOn,
    color: c => c.cyan,
    level: "info",
  } as LoggerType,
  pending: {
    label: "pending",
    badge: b => b.checkboxOff,
    color: c => c.magenta,
    level: "info",
  } as LoggerType,
  note: {
    label: "note",
    badge: b => b.bullet,
    color: c => c.blue,
    level: "info",
  } as LoggerType,
  start: {
    label: "start",
    badge: b => b.play,
    color: c => c.green,
    level: "info",
  } as LoggerType,
  stop: {
    label: "stop",
    badge: b => b.squareSmallFilled,
    color: c => c.yellow,
    level: "info",
  } as LoggerType,
  await: {
    label: "awaiting",
    badge: b => b.ellipsis,
    color: c => c.blue,
    level: "info",
  } as LoggerType,
  watch: {
    label: "watching",
    badge: b => b.ellipsis,
    color: c => c.yellow,
    level: "info",
  } as LoggerType,
  log: {
    label: "",
    badge: _b => "",
    color: c => c.reset,
    level: "info",
  } as LoggerType,
  debug: {
    label: "debug",
    badge: b => b.circleCircle,
    color: c => c.gray,
    level: "debug",
  } as LoggerType,
  silly: {
    label: "silly",
    badge: b => b.circleCircle,
    color: c => c.gray,
    level: "silly",
  } as LoggerType,
};

export type DefaultKeyTypes = keyof typeof types;

export type DefaultTypes = Types<DefaultKeyTypes>;
