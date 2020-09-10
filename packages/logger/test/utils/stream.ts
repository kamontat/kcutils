import { Writable } from "stream";

import { Logger } from "../../src";
import { MockStream } from "../models/stream";

export type JestStream = { fn: jest.Mock<any, any>; stream: Writable };
export type LoggerJestStream = { stream: jest.Mock<any, any>; logger: Logger<""> };

export const newMockStream = (): JestStream => {
  const fn = jest.fn();
  const stream = new MockStream(fn);

  return { fn, stream };
};

export const withCustomStream = (_logger: Logger): LoggerJestStream => {
  const s = newMockStream();
  const logger = _logger.copy({ streams: [s.stream], overrideStream: true });

  return { logger, stream: s.fn };
};

export const getStreamChunk = (stream: jest.Mock<any, any>, times: number = 1): string => {
  const length = stream.mock.calls.length;
  const _times = times > length ? length - 1 : times - 1;

  const buffer = stream.mock.calls[_times][0] as Buffer;
  return buffer.toString();
};
