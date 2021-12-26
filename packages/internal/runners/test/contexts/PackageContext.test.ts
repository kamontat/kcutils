import { Context, PackageContext } from "../..";

describe("PackageContext", () => {
  test("create package context", () => {
    const context = Context.build().package;
    expect(context).toBeDefined();
  });

  test("empty string will cause all function to return undefined", () => {
    const context = new PackageContext(``);
    expect(context.getMain()).toBeUndefined();
  });

  test("empty string will cause all function to return undefined", () => {
    const context = new PackageContext(`{"main": "index.js"`);
    expect(context.getMain()).toBeUndefined();
  });

  test("parse json correctly", () => {
    const context = new PackageContext(`{"main": "index.js"}`);
    expect(context.getMain()).toEqual("index.js");
  });
});
