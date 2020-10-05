import del from "del";

import { AsyncRunner, Setting } from "../..";

interface Settings {
  all: boolean;
}

const setting = new Setting({
  dirname: process.cwd(),
  input: process.argv.slice(2),
  transform: async ({ data, helper }) => {
    const argument = helper.argument.parse(data);

    return {
      all: argument.all ?? false,
    } as Settings;
  },
});

const runner = new AsyncRunner(setting, async ({ helper, data }) => {
  const logs = helper.on("parent").path("**/*.log");
  const lib = helper.on("parent").path("lib");

  const tsbuildinfo = helper.on("parent").path("*.tsbuildinfo");
  const buildinfo = helper.on("parent").path("*.buildinfo");
  const build = helper.on("parent").path("*.build");

  const coverage = helper.on("parent").path("coverage");
  const junit = helper.on("parent").path("junit.xml");
  const eslint = helper.on("parent").path("eslint.xml");
  const stryker = helper.on("parent").path(".stryker-tmp");
  const reports = helper.on("parent").path("reports");

  const arr = [logs, lib, tsbuildinfo, buildinfo, build, coverage, junit, eslint, stryker, reports];
  if (data.all) {
    const nodeModules = helper.on("parent").path("node_modules");
    const lock = helper.on("parent").path("yarn.lock");
    arr.push(nodeModules, lock);
  }

  const deletedPaths = await del(arr);
  deletedPaths.forEach((v, i) => {
    console.log(`${i + 1}) remove ${v}`);
  });
});

runner.start();
