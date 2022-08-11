import { Random, ISeed } from "../../index";

export class MockRandom extends Random {
  pseudo(): number {
    return this.getSeed();
  }
  copy(s?: ISeed) {
    return new MockRandom(s ?? this.seed);
  }
}
