import { Writable } from "stream";

export class MockStream extends Writable {
  constructor(private readonly overrideWrite: (chunk: any, encoding: BufferEncoding) => Promise<void>) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention,@typescript-eslint/explicit-module-boundary-types
  _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void): void {
    this.overrideWrite(chunk, encoding);
    callback();
  }
}
