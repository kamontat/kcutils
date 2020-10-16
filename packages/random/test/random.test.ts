import { Random } from "../src";
import { Fixed } from "../src/constants/seeds/fixed";

describe("Random", () => {
  test("Fix seed will return fix result", () => {
    class T extends Random {
      pseudo(): number {
        return this.seed.getSeed();
      }
    }

    const seed = new Fixed(1);
    const r = new T(seed);

    expect(r.pseudo()).toEqual(1);
    expect(r.pseudo()).toEqual(1);
  });
});
