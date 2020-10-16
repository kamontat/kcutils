import { Random } from "../../models/Random";
import { Seed } from "../../models/Seed";

/**
 * This is Xoshiro128++ included in Xoshiro family.
 * @see https://github.com/bryc/code/blob/master/jshash/PRNGs.md#xoshiro
 */
export class Xoshiro128PP extends Random {
  private a: number;
  private b: number;
  private c: number;
  private d: number;

  constructor(seed: Seed) {
    super(seed);
    this.a = this.getSeed();
    this.b = this.getSeed();
    this.c = this.getSeed();
    this.d = this.getSeed();
  }

  pseudo(): number {
    const t = this.b << 9;
    let r = this.a + this.d;
    r = ((r << 7) | (r >>> 25)) + this.a;
    this.c = this.c ^ this.a;
    this.d = this.d ^ this.b;
    this.b = this.b ^ this.c;
    this.a = this.a ^ this.d;
    this.c = this.c ^ t;
    this.d = (this.d << 11) | (this.d >>> 21);
    return (r >>> 0) / 4294967296;
  }
}
