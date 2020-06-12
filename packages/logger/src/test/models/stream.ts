import { Writable } from "stream";

export class MockStream extends Writable {
  constructor(private readonly overrideWrite: (chunk: any, encoding: BufferEncoding) => Promise<void>) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _write(_chunk: any, _encoding: BufferEncoding, callback: (error?: Error | null) => void) {
    this.overrideWrite(_chunk, _encoding);
    callback();
  }
}
