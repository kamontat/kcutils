import { Writable } from "stream";

const setImmediate = (fn: (error?: Error | null) => void) => {
  setTimeout(fn, 0);
};

/**
 * This can use in all Writeable object to write data to /dev/null channel
 */
class DevNull extends Writable {
  constructor() {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _write(
    _chunk: any,
    _encoding: BufferEncoding,
    callback: (error?: Error | null) => void
  ) {
    return setImmediate(callback);
  }
}

export default { null: new DevNull() };
