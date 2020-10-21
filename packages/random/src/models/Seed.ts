export type SeedFn = () => number;
export type SeedGenerator = (input: string) => SeedFn;
export type SeedPatch = (n: number) => number;

export class Seed {
  private seedFn: SeedFn;

  constructor(input: string, private seedGenerator: SeedGenerator) {
    this.seedFn = seedGenerator(input);
  }

  copy(input: string, newGenerator?: SeedGenerator): Seed {
    return new Seed(input, newGenerator ?? this.seedGenerator);
  }

  getSeed(patch?: SeedPatch): number {
    const result = this.seedFn();
    if (patch) return patch(result);
    else return result;
  }
}
