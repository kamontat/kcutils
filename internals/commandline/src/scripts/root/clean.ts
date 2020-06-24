import { lerna } from "../lerna/core";

const cli = lerna(({ helper }) => {
  const args: string[] = ["run", "clean"];
  if (helper.env.isCI()) args.push("--concurrency", "1");
  return { arguments: args };
});

cli.start();
