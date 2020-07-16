import { lerna } from "../lerna/core";

const cli = lerna(async ({ data }) => {
  if (data.build) require("./build");
  const commands = data._;
  const args: string[] = ["exec", "yarn", ...(commands.length > 0 ? commands : ["start"])];
  return { arguments: args };
});

cli.start();
