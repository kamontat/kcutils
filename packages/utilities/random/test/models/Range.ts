import type { Random } from "../../index";

import { Result } from "./Result";

export class Range {
  static new(r: Random): Range {
    return new Range(r);
  }

  constructor(private r: Random) {}

  average(time: number = 1000, size?: number): Result {
    if (!size) size = time / 100;
    const map = new Map<number, number>();
    const options = {
      min: 1,
      max: size,
      inclusiveMax: true,
      integer: true,
    };

    for (let index = 0; index < time; index++) {
      const e = this.r.number(options);
      map.set(e, map.get(e) ?? 1);
    }

    return new Result(map);
  }
}
