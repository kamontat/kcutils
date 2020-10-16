export type { SeedGenerator, SeedFn, SeedPatch } from "./models/Seed";
export type { RandomNumberOption, RandomStringOption } from "./models/Random";
export { Seed } from "./models/Seed";
export { Random } from "./models/Random";

export {
  numberCharacter,
  englishUpperAlphabetCharacter,
  englishLowerAlphabetCharacter,
} from "./constants/randoms/list";

import { Fixed } from "./constants/seeds/fixed";
import { Xfnv1a } from "./constants/seeds/xfnv1a";
import { Xmur3 } from "./constants/seeds/xmur3";

const Seeds = {
  Fixed, // eslint-disable-line @typescript-eslint/naming-convention
  Xfnv1a, // eslint-disable-line @typescript-eslint/naming-convention
  Xmur3, // eslint-disable-line @typescript-eslint/naming-convention
};

import { Alea } from "./constants/randoms/Alea";
import { Xoshiro128PP } from "./constants/randoms/Xoshiro128PP";
import { Xoshiro128SS } from "./constants/randoms/Xoshiro128SS";

const Randoms = {
  Alea, // eslint-disable-line @typescript-eslint/naming-convention
  Xoshiro128PP, // eslint-disable-line @typescript-eslint/naming-convention
  Xoshiro128SS, // eslint-disable-line @typescript-eslint/naming-convention
};

export { Seeds, Randoms };
