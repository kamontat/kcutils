import { Fixed, Xfnv1a, Xmur3 } from "../index";

describe("Predefined seed", () => {
  test.each([
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [10, 10],
    [1.112, 1.112],
    [123, 123],
    [123.99, 123.99],
  ])("Fixed: Fixed(%s).getSeed() return %s", (i, j) => {
    const f = new Fixed(i);
    expect(f.getSeed()).toBeCloseTo(j, 5);
  });

  test.each([
    ["text", 824417223, 1684408431],
    ["string", 3903872657, 3114980239],
    ["number", 1793145994, 4017401038],
    ["", 1493338014, 2822906736],
    ["boolean", 4108559831, 723513985],
  ])("XFNV1A: Xfnv1a(%s).getSeed() return %s", (i, j, k) => {
    const x = new Xfnv1a(i);
    expect(x.getSeed()).toBeCloseTo(j, 4);
    expect(x.getSeed()).toBeCloseTo(k, 4);

    const y = new Xfnv1a(i);
    expect(y.getSeed()).toBeCloseTo(j, 4);
  });

  test("XFNV1A: Average of result random number will be the sum (approximately +- 1000)", () => {
    const inputString = "this is very longgggggggggggggggg string";
    const size = 500;

    /**
     * This magic number depend on input string for hashing and recusive size
     */
    const magicNumber = 2143722380;
    const round = 1;

    const a = new Xfnv1a(inputString);

    let sum = 0;
    for (let i = 0; i < size; i++) {
      sum += a.getSeed();
    }
    const result = sum / size;

    expect(result).toBeGreaterThanOrEqual(magicNumber - round);
    expect(result).toBeLessThanOrEqual(magicNumber + round);
  });

  test.each([
    ["text", 549197882, 228113408],
    ["string", 3171331317, 2532059804],
    ["number", 2173514142, 3761507789],
    ["", 167010153, 2610615433],
    ["boolean", 2579961042, 19056677],
  ])("XMUR3: Xmur3(%s).getSeed() return %s", (i, j, k) => {
    const x = new Xmur3(i);
    expect(x.getSeed()).toBeCloseTo(j, 4);
    expect(x.getSeed()).toBeCloseTo(k, 4);

    const y = new Xmur3(i);
    expect(y.getSeed()).toBeCloseTo(j, 4);
  });

  test("XMUR3: Average of result random number will be the sum (approximately +- 1000)", () => {
    const inputString = "this is very longgggggggggggggggg string";
    const size = 500;

    /**
     * This magic number depend on input string for hashing and recusive size
     */
    const magicNumber = 2202321726;
    const round = 1;

    const a = new Xmur3(inputString);

    let sum = 0;
    for (let i = 0; i < size; i++) {
      sum += a.getSeed();
    }
    const result = sum / size;

    expect(result).toBeGreaterThanOrEqual(magicNumber - round);
    expect(result).toBeLessThanOrEqual(magicNumber + round);
  });
});
