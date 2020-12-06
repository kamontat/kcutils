import { setProject } from "@kcutils/error";
setProject("@kcutils/gatsby-plugin-intl");

export { pageWrapper } from "./utils/wrapper";

export { onCreatePage, onCreateWebpackConfig } from "./gatsby/node";
