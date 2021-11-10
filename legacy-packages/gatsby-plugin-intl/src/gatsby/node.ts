import { GatsbyNode } from "gatsby";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = (): void => {
  console.log("test");
};

export const onCreatePage: GatsbyNode["onCreatePage"] = (): void => {
  console.log("test");
};

export const onPreInit: GatsbyNode["onPreInit"] = () => {
  console.log("Loaded @kcutils/gatsby-plugin-intl");
};
