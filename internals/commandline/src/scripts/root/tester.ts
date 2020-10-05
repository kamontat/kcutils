import { lerna } from "../lerna/core";

const cli = lerna(({ helper }) => {
  const args: string[] = ["exec", "yarn", "test", "--no-bail"];

  if (helper.env.isCI()) return { arguments: ["jest", "--ci", "--runInBand"], override: true };
  return { arguments: args };
});

cli.start();
