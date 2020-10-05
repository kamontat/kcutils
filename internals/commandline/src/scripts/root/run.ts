import { lerna } from "../lerna/core";

const cli = lerna(async ({ data }) => {
  if (data.build) require("./build");

  // ._ will be adding by default, so I add default value if it not exist
  if (!data._) data._ = [];
  if (data._.length <= 0) data._.push("start");

  return { arguments: ["exec", "yarn"] };
});

cli.start();
