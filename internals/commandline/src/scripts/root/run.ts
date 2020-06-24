import { lerna } from "../lerna/core";

const cli = lerna(async ({ data }) => {
  if (data.build) require("./build");

  const on = data.on;
  if (!on) throw new Error("must have --on=<package_name>");

  const args: string[] = ["exec", "yarn", "start", "--scope", on];
  return { arguments: args };
});

cli.start();
