import newLoggerLevels from "../builders/newLoggerLevels";
import { stdnull, stdout, stderr, stdebug } from "./writable";

const defaultLevels = newLoggerLevels({
  silent: {
    level: 0,
    stream: stdnull,
  },
  error: {
    level: 1,
    stream: stderr,
  },
  warn: {
    level: 2,
    stream: stderr,
  },
  info: {
    level: 3,
    stream: stdout,
  },
  debug: {
    level: 4,
    stream: stdebug,
  },
});

const verboseLevels = newLoggerLevels({
  silent: {
    level: 0,
    stream: stdnull,
  },
  error: {
    level: 1,
    stream: stderr,
  },
  warn: {
    level: 2,
    stream: stderr,
  },
  info: {
    level: 3,
    stream: stdout,
  },
  debug: {
    level: 4,
    stream: stdebug,
  },
  verbose: {
    level: 5,
    stream: stdebug,
  },
  silly: {
    level: 6,
    stream: stdebug,
  },
});

export default defaultLevels;
export { verboseLevels };
