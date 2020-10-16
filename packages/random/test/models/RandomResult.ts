import { Random } from "../../src";

export class Result {
  static new(r: Random): Result {
    return new Result(r);
  }

  constructor(private r: Random) {}

  average(time: number = 1000, size?: number): ResultChecker {
    if (!size) size = time / 100;
    const map = new Map<number, number>();
    for (let index = 0; index < time; index++) {
      const e = this.r.number({ min: 1, max: size, inclusiveMax: true, integer: true });
      map.set(e, map.get(e) ?? 1);
    }

    return new ResultChecker(map);
  }
}

export class ResultChecker {
  constructor(private map: Map<number, number>) {}

  check(threshold: number = 0.1): Error[] {
    const errors: Error[] = [];
    const array = Array.from(this.map.entries());

    const firstElement = array.shift();
    if (firstElement) {
      const base = firstElement[1];
      const max = base + threshold;
      const min = base - threshold;

      array.forEach(key => {
        const [index, value] = key;
        if (value < min || value > max) {
          errors.push(
            new Error(
              `The result not distribute correctly on index ${index} not in length (max) ${max} > ${value} > ${min} (min)`
            )
          );
        }
      });
    } else {
      errors.push(new Error(`The map is empty`));
    }

    return errors;
  }
}
