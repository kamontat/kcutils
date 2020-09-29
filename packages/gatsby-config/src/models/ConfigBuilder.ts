import { generic } from "@kcutils/helper";
import { WithLogger, LoggerBuilder } from "@kcutils/logger";

import { ConfigObject, AnyConfigObject, MetaValue } from "./ConfigObject";

type StringRecord<V extends any = any> = {
  [k: string]: V;
};

export class ConfigBuilder<M extends StringRecord<any> = StringRecord<any>> extends WithLogger {
  private config: ConfigObject & AnyConfigObject;

  constructor(config: ConfigObject & AnyConfigObject = {}, loggerBuilder?: LoggerBuilder<"">) {
    super(loggerBuilder);

    this.config = generic.noExist(config) ? { siteMetadata: {} } : config;
    if (generic.noExist(this.config.siteMetadata)) this.config.siteMetadata = {};
  }

  addTitle(title?: string): ConfigBuilder<M> {
    return this.addMeta("title", title);
  }

  addShortName(name?: string): ConfigBuilder<M> {
    return this.addMeta("shortName", name);
  }

  addDescription(description?: string): ConfigBuilder<M> {
    return this.addMeta("description", description);
  }

  addSiteUrl(siteUrl?: string): ConfigBuilder<M> {
    return this.addMeta("siteUrl", siteUrl);
  }

  addStartUrl(startUrl?: string): ConfigBuilder<M> {
    return this.addMeta("startUrl", startUrl);
  }

  addIcon(icon?: string): ConfigBuilder<M> {
    return this.addMeta("icon", icon);
  }

  addMeta(name: string, value?: MetaValue): ConfigBuilder<M> {
    if (generic.noExist(this.config.siteMetadata)) this.config.siteMetadata = {};
    if (generic.isExist(value)) this.config.siteMetadata[name] = value;

    return this;
  }

  addPlugin<K extends keyof M, O extends M[K]>(key: K, options?: O): ConfigBuilder<M> {
    if (generic.noExist(this.config.plugins)) this.config.plugins = [];

    if (generic.noExist(options)) this.config.plugins.push(key as string);
    else this.config.plugins.push({ resolve: key as string, options });

    return this;
  }

  disablePlugin<K extends keyof M, O extends M[K]>(key: K, _options?: O): ConfigBuilder<M> {
    this.logger.print("info", `disabled plugin: ${key}`);

    if (generic.noExist(this.config.plugins)) return this;
    if (this.config.plugins.length <= 0) return this;

    const plugins = this.config.plugins.filter(v => {
      if (generic.isString(v)) return v !== key;
      else return v.resolve !== key;
    });

    this.config.plugins = plugins; // replace with new plugins
    return this;
  }

  // copy new object instance
  build(): ConfigObject & AnyConfigObject {
    return Object.assign({}, this.config);
  }
}
