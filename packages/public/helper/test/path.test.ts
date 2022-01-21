import { path } from "../index";

// eslint-disable-next-line @typescript-eslint/naming-convention
const { Paths } = path;

describe("Path Helper", () => {
  test("create new paths", () => {
    const p = new Paths(undefined);
    expect(p).not.toBeUndefined();
  });

  describe("Input data", () => {
    test("undefined; return empty string", () => {
      const p = new Paths(undefined);
      expect(p.filename).toEqual("");
      expect(p.dirdeep).toEqual(1);
    });

    test("null; return empty string", () => {
      const p = new Paths(null);
      expect(p.filename).toEqual("");
      expect(p.dirdeep).toEqual(1);
    });

    test("normal string; return normal string as filename", () => {
      const p = new Paths("hello world");
      expect(p.filename).toEqual("hello world");
      expect(p.dirdeep).toEqual(1);
    });

    test("normal full path string", () => {
      const p = new Paths("/ab/cd/ef/text.txt");
      expect(p.filename).toEqual("text.txt");
      expect(p.dirdeep).toEqual(3);
      expect(p.absolute).toEqual(true);
    });

    test("normal relative path string", () => {
      const p = new Paths("./ab/cd/../text.txt");
      expect(p.filename).toEqual("text.txt");
      expect(p.dirdeep).toEqual(1);
      expect(p.absolute).toEqual(false);
    });

    test("normal relative path string 2", () => {
      const p = new Paths("../xyz/./aaa/../../../ee/ab/cd/../text.txt");
      expect(p.filename).toEqual("text.txt");
      expect(p.dirdeep).toEqual(2);
      expect(p.absolute).toEqual(false);
    });

    test("path end with directory", () => {
      const p = new Paths("/abc/def/");
      expect(p.filename).toEqual("");
      expect(p.dirdeep).toEqual(2);
      expect(p.absolute).toEqual(true);
    });
  });

  describe("paths.at(<number>)", () => {
    test("on undefined path will always return internal", () => {
      const p = new Paths(undefined);

      expect(p.at(-1)).toEqual("internal");
      expect(p.at(-100)).toEqual("internal");
      expect(p.at(1)).toEqual("internal");
      expect(p.at(2)).toEqual("internal");
      expect(p.at(200)).toEqual("internal");
    });

    test("on normal string will always return internal", () => {
      const p = new Paths("normal string");

      expect(p.at(-1)).toEqual("internal");
      expect(p.at(-100)).toEqual("internal");
      expect(p.at(1)).toEqual("internal");
      expect(p.at(2)).toEqual("internal");
      expect(p.at(200)).toEqual("internal");
    });

    test("at(0) will return filename", () => {
      const p = new Paths(undefined);
      expect(p.at(0)).toEqual(p.filename);

      const p2 = new Paths("hello me");
      expect(p2.at(0)).toEqual(p2.filename);
    });

    test("return directory on <num> index", () => {
      const p = new Paths("/abc/def/ghi/jkl/text");

      expect(p.at(1)).toEqual("jkl");
      expect(p.at(2)).toEqual("ghi");
      expect(p.at(3)).toEqual("def");

      expect(p.at(4)).toEqual("abc");
      expect(p.at(5)).toEqual("abc");
      expect(p.at(100)).toEqual("abc");

      expect(p.at(-1)).toEqual("abc");
    });
  });

  describe("paths.first(<number>)", () => {
    test("first(-<number>) is filename", () => {
      const p = new Paths("/ab/cd/ef/text.txt");
      expect(p.first(-2)).toEqual(p.filename);
      expect(p.first(-10)).toEqual(p.filename);
      expect(p.first(-100)).toEqual(p.filename);
    });

    test("first(0) is filename", () => {
      const p = new Paths("/ab/cd/ef/text.txt");
      expect(p.first(0)).toEqual(p.filename);
    });

    test("return directory and file by number index", () => {
      const p = new Paths("/ab/cd/ef/gh/ij/kl/text.txt");
      expect(p.first(1)).toEqual("kl/text.txt");
      expect(p.first(4)).toEqual("ef/gh/ij/kl/text.txt");
      expect(p.first(20)).toEqual("ab/cd/ef/gh/ij/kl/text.txt");
      expect(p.first(100)).toEqual("ab/cd/ef/gh/ij/kl/text.txt");
    });
  });

  describe("paths.after(<regex>, <index>, <size>)", () => {
    test("invalid regex will start at first", () => {
      const p = new Paths("/ab/cd/ef/gh/ij/kl/text.txt");
      expect(p.after(/not_exist/, 0)).toEqual("ab");
    });

    test("invalid regex will start input index", () => {
      const p = new Paths("/ab/cd/ef/gh/ij/kl/text.txt");
      expect(p.after(/not_exist/, 2)).toEqual("ef");
    });

    test("get negative index", () => {
      const p = new Paths("/ab/cd/ef/gh/ij/kl/text.txt");
      expect(p.after(/ef/, -3)).toEqual("ef");
    });

    test("get negative size", () => {
      const p = new Paths("/ab/cd/ef/gh/ij/kl/text.txt");
      expect(p.after(/ef/, -3, -213)).toEqual("ef");
    });

    test("get directory after ef", () => {
      const p = new Paths("/ab/cd/ef/gh/ij/kl/text.txt");
      expect(p.after(/ef/, 0)).toEqual("ef");
      expect(p.after(/ef/, 1)).toEqual("gh");
      expect(p.after(/ef/, 3)).toEqual("kl");
    });

    test("get file directory name base on regex", () => {
      const p = new Paths("/this-is-very-long-directory/next/latest/data.txt");
      expect(p.after(/directory/, 0)).toEqual("this-is-very-long-directory");
    });

    test("get multiple directory path after regex", () => {
      const p = new Paths("/a/b/c/d/e/f/g/text.txt");
      expect(p.after(/c/, 0, 2)).toEqual("c/d/e");
      expect(p.after(/c/, 3, 2)).toEqual("f/g");
    });
  });

  describe("paths.includes(<regex>)", () => {
    test("find by layer", () => {
      const p = new Paths("/a/b/c/d/e/f/text.txt");

      expect(p.includes(/d/)).toEqual(true);
      expect(p.includes(/e/)).toEqual(true);
      expect(p.includes(/text*/)).toEqual(true);
    });

    test("cannot find when add path separator", () => {
      const p = new Paths("/a/b/c/d/e/f/text.txt");

      expect(p.includes(/d\/e\/f/)).toEqual(false);
      expect(p.includes(/f\/text*/)).toEqual(false);
    });
  });

  describe("path.fileExist", () => {
    test.each([
      ["/a/b/c/d/e/f.txt", true],
      ["/a/b/c/d/e/f", true],
      ["/a/b/c/", false],
      ["a/b/c/", false],
      ["/", false],
      [undefined, false],
    ])("when input is %s returns %s", (input, output) => {
      const p = new Paths(input);
      expect(p.isFileExist).toEqual(output);
    });
  });

  describe("path.directoryExist", () => {
    test.each([
      ["/a/b/c/d/e/f.txt", true],
      ["/a/b/c/d/e/f", true],
      ["/a/b/c/", true],
      ["a/b/c/", true],
      ["/", false],
      [undefined, false],
    ])("when input is %s returns %s", (input, output) => {
      const p = new Paths(input);
      expect(p.isDirectoryExist).toEqual(output);
    });
  });
});
