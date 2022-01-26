import type { SearchOption } from "../src/path";
import { getAt, slice, search, includes } from "../src/path";
import { internal } from "../src/path/_constants";

describe("Path Helper", () => {
  describe("getAt(<string>, <number>)", () => {
    test.each([
      [undefined, -1],
      [undefined, -100],
      [undefined, 1],
      [undefined, 2],
      [undefined, 200],
      ["non-path-string", -1],
      ["non-path-string", -100],
      ["non-path-string", 1],
      ["non-path-string", 2],
      ["non-path-string", 200],
    ])("getAt(%s, %s) always return <internal>", (key, index) => {
      expect(getAt(key, index)).toEqual(internal);
    });

    test.each([
      [0, "README.md"],
      [1, "jkl"],
      [2, "ghi"],
      [3, "def"],
      [4, "abc"],
      [5, "abc"],
      [10, "abc"],
      [-1, "abc"],
    ])("getAt(any, %s) should return %s", (index, output) => {
      expect(getAt("/abc/def/ghi/jkl/README.md", index)).toEqual(output);
    });
  });

  describe("slice(<string>, <number>)", () => {
    test.each([
      [-100, "README.md"],
      [-2, "README.md"],
      [0, "README.md"],
      [1, "ef/README.md"],
      [2, "cd/ef/README.md"],
      [3, "ab/cd/ef/README.md"],
      [4, "/ab/cd/ef/README.md"],
      [100, "/ab/cd/ef/README.md"],
    ])("slice(<any>, %s) should return %s", (index, output) => {
      expect(slice("/ab/cd/ef/README.md", index)).toEqual(output);
    });
  });

  describe("search(<string>, <regex>, <options>)", () => {
    test.each([
      [/not_exist/, { shift: 0 } as SearchOption, undefined],
      [/not_exist/, { shift: 2 } as SearchOption, undefined],
      [/ef/, { shift: -3 } as SearchOption, "ef"],
      [/ef/, { shift: -3, level: -213 } as SearchOption, "ef"],
      [/kl/, { shift: 0 } as SearchOption, "kl"],
      [/kl/, { shift: 1 } as SearchOption, "README.md"],
      [/kl/, { shift: 3 } as SearchOption, "README.md"],
      [/gh/, { level: 0 } as SearchOption, "gh"],
      [/gh/, { level: 1 } as SearchOption, "gh"],
      [/gh/, { level: 2 } as SearchOption, "gh/ij"],
      [/gh/, { level: 3 } as SearchOption, "gh/ij/kl"],
      [/gh/, { level: 4 } as SearchOption, "gh/ij/kl/README.md"],
      [/gh/, { level: 5 } as SearchOption, "gh/ij/kl/README.md"],
      [/cd/, { shift: 0, level: 1 } as SearchOption, "cd"],
      [/cd/, { shift: 1, level: 1 } as SearchOption, "ef"],
      [/cd/, { shift: 1, level: 2 } as SearchOption, "ef/gh"],
      [/cd/, { shift: 4, level: 2 } as SearchOption, "kl/README.md"],
      [/cd/, { shift: 4, level: 3 } as SearchOption, "kl/README.md"],
      [/cd/, { shift: 5, level: 3 } as SearchOption, "README.md"],
      [/cd/, { shift: 6, level: 3 } as SearchOption, "README.md"],
    ])("search(<any>, %s, '%p') should return %s", (regex, opts, output) => {
      const path = "/ab/cd/ef/gh/ij/kl/README.md";
      expect(search(path, regex, opts)).toEqual(output);
    });
  });

  describe("includes(<string>, <regex>)", () => {
    test("find by layer", () => {
      const path = "/a/b/c/d/e/f/text.txt";

      expect(includes(path, /d/)).toEqual(true);
      expect(includes(path, /e/)).toEqual(true);
      expect(includes(path, /text*/)).toEqual(true);
    });

    test("cannot find when add path separator", () => {
      const path = "/a/b/c/d/e/f/text.txt";

      expect(includes(path, /d\/e\/f/)).toEqual(false);
      expect(includes(path, /f\/text*/)).toEqual(false);
    });
  });
});
