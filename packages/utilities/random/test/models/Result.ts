export class Result {
  constructor(private map: Map<number, number>) {}

  check(threshold: number = 0.1): Error[] {
    const errors: Error[] = [];
    const array = Array.from(this.map.entries());

    const firstElement = array.shift();
    if (firstElement) {
      const base = firstElement[1];
      const max = base + threshold;
      const min = base - threshold;

      array.forEach((key) => {
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
