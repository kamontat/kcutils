import { arrowRight } from "figures";

import { StrictOption } from "../models/logger/LoggerOption";
import { Writable } from "stream";

export const options: StrictOption = {
  debug: false,
  output: ["file", "console"],
  json: false,
  interactive: false,
  disabled: false,
  color: true,
  level: "info",
  datetime: "date",
  censor: () => "secure",
  separator: arrowRight,
  scopes: [] as string[],
  secrets: [] as string[],
  overrideStream: false,
  streams: [] as Writable[],
};
