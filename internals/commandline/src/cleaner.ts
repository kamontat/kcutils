import del from "del";
import parser from "minimist";

import { AsyncRunner, Setting } from ".";

type Settings = {
  all: boolean;
};

const setting = new Setting({
  dirname: process.cwd(),
  input: process.argv.slice(2),
  transform: async ({ data }) => {
    const argument = parser(data);

    return {
      all: argument.all ?? false,
    } as Settings;
  },
});

const runner = new AsyncRunner(setting, async ({ helper, data }) => {
  const logs = helper.parent.path("**/*.log");
  const lib = helper.parent.path("lib");

  const tsbuildinfo = helper.parent.path("*.tsbuildinfo");
  const buildinfo = helper.parent.path("*.buildinfo");
  const build = helper.parent.path("*.build");

  const coverage = helper.parent.path("coverage");
  const junit = helper.parent.path("junit.xml");
  const eslint = helper.parent.path("eslint.xml");

  const arr = [logs, lib, tsbuildinfo, buildinfo, build, coverage, junit, eslint];
  if (data.all) {
    const nodeModules = helper.parent.path("node_modules");
    const lock = helper.parent.path("yarn.lock");
    arr.push(nodeModules, lock);
  }

  const deletedPaths = await del(arr);
  deletedPaths.forEach((v, i) => {
    console.log(`${i + 1}) remove ${v}`);
  });
});

runner.start();
