import { IGatsbyPluginDef } from "gatsby-plugin-ts-config";

export type ConfigPlugins = Array<IGatsbyPluginDef<string, any> | string>;

export type MetaValue = string | number | boolean | Record<string, any>;
export type SiteMetadata = Record<string, MetaValue>;

export interface ConfigObject {
  plugins?: ConfigPlugins;
  siteMetadata?: SiteMetadata;
}

export interface AnyConfigObject {
  [key: string]: any;
}
