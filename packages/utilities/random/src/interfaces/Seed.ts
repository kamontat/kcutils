export type SeedFn = () => number;
export type SeedGenerator = (input: string) => SeedFn;
export type SeedPatch = (n: number) => number;

export interface ISeed {
  copy(input: string, newGenerator?: SeedGenerator): ISeed;
  getSeed(patch?: SeedPatch): number;
}
