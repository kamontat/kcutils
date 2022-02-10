import type { Writable } from "../../src/models/custom/Writable";

export const mockStream = (
  overrideWrite: (chunk: any, encoding: BufferEncoding) => Promise<void>
): Writable => {
  return overrideWrite;
};
