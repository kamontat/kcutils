import { lerna } from "../lerna/core";

const cli = lerna(({ helper }) => {
  const args: string[] = ["exec", "yarn", "test", "--no-bail"];

  if (helper.env.isCI()) return ["jest", "--ci", "--runInBand"];
  return args;
});

cli.start();
