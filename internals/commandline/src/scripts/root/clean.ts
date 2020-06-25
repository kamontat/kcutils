import { lerna } from "../lerna/core";

const cli = lerna(({ data, helper }) => {
  const isAll: boolean = data.all;

  const args: string[] = ["run", "clean"];
  if (helper.env.isCI()) args.push("--concurrency", "1");
  if (isAll) args.push("--", "--all");

  return { arguments: args };
});

cli.start();
