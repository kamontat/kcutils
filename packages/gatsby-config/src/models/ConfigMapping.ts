import { ConfigPlugins } from "./ConfigObject";

export type ConfigMapping = {
  "gatsby-transformer-sharp": undefined;
  "gatsby-transformer-json": undefined;
  "gatsby-plugin-react-helmet": undefined;
  "gatsby-plugin-sharp": undefined;
  "gatsby-plugin-slug": undefined;
  "gatsby-plugin-sass": undefined;
  "gatsby-plugin-sitemap": undefined;
  "gatsby-transformer-remark": {
    commonmark: boolean;
    footnotes: boolean;
    pedantic: boolean;
    gfm: boolean;
    plugins?: ConfigPlugins;
  };
  "gatsby-plugin-netlify": {
    /**
     * option to add more headers. "Link" headers are transformed by the below criteria
     */
    headers: Record<string, any>;
    /**
     * option to add headers for all pages. "Link" headers are transformed by the below criteria
     */
    allPageHeaders: Array<Record<string, any>>;
    /**
     * boolean to turn off the default security headers
     */
    mergeSecurityHeaders: boolean;
    /**
     * boolean to turn off the default gatsby js headers
     */
    mergeLinkHeaders: boolean;
    /**
     * boolean to turn off the default caching headers
     */
    mergeCachingHeaders: boolean;
    /**
     * boolean to turn off automatic creation of redirect rules for client only paths
     */
    generateMatchPathRewrites: boolean;
  };
  "gatsby-plugin-graphql-codegen": {
    codegen: boolean;
    documentPaths: Array<string>;
    fileName: string;
    codegenDelay: number;
  };
  "gatsby-plugin-styled-components": {
    displayName: boolean;
    fileName: boolean;
    minify: boolean;
    transpileTemplateLiterals: boolean;
  };
  "gatsby-plugin-manifest": {
    name: string;
    short_name: string; // eslint-disable-line @typescript-eslint/naming-convention
    start_url: string; // eslint-disable-line @typescript-eslint/naming-convention
    background_color: string; // eslint-disable-line @typescript-eslint/naming-convention
    theme_color: string; // eslint-disable-line @typescript-eslint/naming-convention
    display: string;
    icon: string;
  };
  "gatsby-plugin-google-tagmanager": {
    id: string;
    includeInDevelopment: boolean;
    defaultDataLayer: Record<string, string>;
    routeChangeEventName: string;
  };
  "gatsby-plugin-typescript": {
    allExtensions: boolean;
    isTSX: boolean;
    jsxPragma: string;
  };
  "gatsby-alias-imports": {
    rootFolder?: string;
    aliases?: Record<string, string>;
  };
  "gatsby-plugin-i18n": {
    langKeyForNull?: string;
    langKeyDefault?: string;
    useLangKeyLayout?: boolean;
    prefixDefault?: boolean;
    markdownRemark?: {
      postPage: string;
      query: string;
    };
  };
  "gatsby-plugin-i18n-tags": {
    tagPage?: string;
    tagsUrl?: string;
    langKeyForNull?: string;
    langKeyDefault?: string;
    prefixDefault?: boolean;
  };
};
