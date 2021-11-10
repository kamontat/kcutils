import { ConfigBuilder } from "../src";

describe("Config builder", () => {
  test("default builder with return { siteMetadata: {} }", () => {
    const builder = new ConfigBuilder();

    expect(builder.build()).toEqual({ siteMetadata: {} });
  });

  test("null input to builder with return { siteMetadata: {} }", () => {
    const builder = new ConfigBuilder(null as any);

    expect(builder.build()).toEqual({ siteMetadata: {} });
  });

  test("custom base configuration", () => {
    const builder = new ConfigBuilder({ test: true });

    expect(builder.build()).toEqual({ siteMetadata: {}, test: true });
  });

  test("custom base siteMetadata config", () => {
    const builder = new ConfigBuilder({ siteMetadata: { hello: "world" } });

    expect(builder.build()).toEqual({ siteMetadata: { hello: "world" } });
  });

  test("add new title to config", () => {
    const builder = new ConfigBuilder();

    expect(builder.addTitle("title").build()).toEqual({ siteMetadata: { title: "title" } });
  });

  test("add new short name to config", () => {
    const builder = new ConfigBuilder();

    expect(builder.addShortName("short").build()).toEqual({ siteMetadata: { shortName: "short" } });
  });

  test("add new description to config", () => {
    const builder = new ConfigBuilder();

    expect(builder.addDescription("title").build()).toEqual({ siteMetadata: { description: "title" } });
  });

  test("add new icon to config", () => {
    const builder = new ConfigBuilder();

    expect(builder.addIcon("/tmp/icon.png").build()).toEqual({ siteMetadata: { icon: "/tmp/icon.png" } });
  });

  test("add new site url to config", () => {
    const builder = new ConfigBuilder();

    expect(builder.addSiteUrl("https://google.com").build()).toEqual({
      siteMetadata: { siteUrl: "https://google.com" },
    });
  });

  test("add new start url to config", () => {
    const builder = new ConfigBuilder();

    expect(builder.addStartUrl("/test").build()).toEqual({ siteMetadata: { startUrl: "/test" } });
  });

  test("add multiple metadata to config", () => {
    const builder = new ConfigBuilder();

    expect(builder.addStartUrl("/me").addTitle("hello").addDescription("world").build()).toEqual({
      siteMetadata: { title: "hello", description: "world", startUrl: "/me" },
    });
  });

  test("add undefined as a title to config", () => {
    const builder = new ConfigBuilder();

    expect(builder.addTitle(undefined).build()).toEqual({ siteMetadata: {} });
  });

  test("add normal plugin without option", () => {
    const builder = new ConfigBuilder();

    builder.addPlugin("new-plugin-name");

    expect(builder.build()).toEqual({ siteMetadata: {}, plugins: ["new-plugin-name"] });
  });

  test("add normal plugin with option", () => {
    const builder = new ConfigBuilder();

    builder.addPlugin("plugin-options", { test: true });

    expect(builder.build()).toEqual({
      siteMetadata: {},
      plugins: [{ resolve: "plugin-options", options: { test: true } }],
    });
  });

  test("disabled undefined plugins", () => {
    const builder = new ConfigBuilder();
    const c1 = builder.build();

    builder.disablePlugin("not-exist-plugin");

    const c2 = builder.build();

    expect(c1).toEqual(c2); // nothing disabled
  });

  test("disabled empty plugins", () => {
    const builder = new ConfigBuilder({ plugins: [] });
    const c1 = builder.build();

    builder.disablePlugin("not-exist-plugin");

    const c2 = builder.build();

    expect(c1).toEqual(c2); // nothing disabled
  });

  test("disabled plugins without option will remove plugin from list", () => {
    const p1 = "test-plugin-1";
    const p2 = "test-plugin-2";
    const p3 = "test-plugin-3";

    const builder = new ConfigBuilder();
    builder.addPlugin(p1).addPlugin(p2).addPlugin(p3);

    const c1 = builder.build();
    const c2 = builder.disablePlugin(p2).build();

    expect(c1.plugins).toHaveLength(3);
    expect(c2.plugins).toHaveLength(2);
  });

  test("disabled plugins with option will remove plugin from list", () => {
    const p1 = "test-plugin-1";
    const p1Option = { name: "p1" };

    const p2 = "test-plugin-2";
    const p2Option = { name: "p2", test: true };

    const p3 = "test-plugin-3";
    const p3Option = { name: "p3", plugin: "p3", error: undefined };

    const builder = new ConfigBuilder();
    builder.addPlugin(p1, p1Option).addPlugin(p2, p2Option).addPlugin(p3, p3Option);

    const c1 = builder.build();
    const c2 = builder.disablePlugin(p2).build();

    expect(c1.plugins).toHaveLength(3);
    expect(c2.plugins).toHaveLength(2);
  });
});
