import { lerna } from "../lerna/core";

const cli = lerna(async ({ data }) => {
  if (data.build) require("./build");

  const args: string[] = ["exec", "yarn", "start"];
  return { arguments: args };
});

cli.start();
