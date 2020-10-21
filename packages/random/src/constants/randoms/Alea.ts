import { Random } from "../../models/Random";
import { Seed } from "../../models/Seed";

/**
 * Alea is based on MWC (Multiply-with-Carry). It includes its own string hash function: Mash.
 *
 * @see https://github.com/bryc/code/blob/master/jshash/PRNGs.md#alea
 */
export class Alea extends Random {
  private n: number = 4022871197;
  private a = this.mash(" ");
  private b = this.mash(" ");
  private c = this.mash(" ");

  private x = 1;
  private y = 0;

  constructor(seed: Seed) {
    super(seed);

    const seedString = seed.getSeed().toString();
    this.a -= this.mash(seedString);
    this.b -= this.mash(seedString);
    this.c -= this.mash(seedString);

    this.a < 0 && this.a++;
    this.b < 0 && this.b++;
    this.c < 0 && this.c++;
  }

  private mash(seed: string): number {
    let t;
    let s;
    let f;
    const e = 0.02519603282416938;
    for (let u = 0; u < seed.length; u++)
      (s = seed.charCodeAt(u)),
        (f = e * (this.n += s) - ((this.n * e) | 0)),
        (this.n = 4294967296 * ((t = f * ((e * this.n) | 0)) - (t | 0)) + (t | 0));
    return (this.n | 0) * 2.3283064365386963e-10;
  }

  pseudo(): number {
    this.y = this.x * 2.3283064365386963e-10 + this.a * 2091639;
    this.a = this.b;
    this.b = this.c;
    this.x = this.y | 0;
    this.c = this.y - this.x;

    return this.c;
  }

  copy(s?: Seed): Random {
    return new Alea(s ?? this.seed);
  }
}
