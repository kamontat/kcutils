import { Writable } from "stream";

const setImmediate = (fn: (error?: Error | null) => void) => {
  setTimeout(fn, 0);
};

/**
 * This can use in all Writeable object to write data to /dev/null channel
 */
class DevNull extends Writable {
  static get instance(): Writable {
    return new DevNull();
  }

  constructor() {
    super();
  }

  _write(
    _chunk: any,
    _encoding: BufferEncoding,
    callback: (error?: Error | null) => void
  ) {
    return setImmediate(callback);
  }
}

export default DevNull;
