import { Readable } from "stream";

import { DevNull } from "../src/stream";

class NumberStream extends Readable {
  private idx: number;

  constructor(private to: number) {
    super();
    this.idx = 0;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _read() {
    if (this.idx > this.to) return this.push(null);
    this.push("" + this.idx++);
  }
}

describe("Stream Helper", () => {
  test("without dev/null", () => {
    const data: any[] = [];
    const numbers = new NumberStream(2);

    return new Promise((res) => {
      numbers
        .on("data", function (d) {
          data.push(d);
        })
        .on("end", () => {
          expect(data).toHaveLength(3);
          res(void 0);
        });
    });
  });

  test("with dev/null", () => {
    const data: any[] = [];
    const numbers = new NumberStream(2);
    return new Promise((res) => {
      numbers
        .on("end", () => {
          expect(data).toHaveLength(0);
          res(void 0);
        })
        .pipe(DevNull.instance)
        .on("data", function (d) {
          console.log("data");
          data.push(d);
        });
    });
  });
});
