import {
  LoggerBuilder,
  LoggerOptionBuilder,
  WithLogger,
  LoggerLevelBuilder,
  LoggerSettingBuilder,
} from "@kcutils/logger";

export type Level = "debug" | "info" | "warn" | "error";

export abstract class SupportLogger extends WithLogger {
  constructor(level: Level, scope: string) {
    super(
      LoggerBuilder.initial().withOption(
        LoggerOptionBuilder.initial()
          .withColor()
          .withLevel(LoggerLevelBuilder.get().withName(level).name)
          .withSetting("filename", LoggerSettingBuilder.disabled())
          .withSetting("scope", LoggerSettingBuilder.initial().withPrefix("").withSuffix(""))
          .withScopes(["@kcutils/money", scope])
      )
    );
  }

  protected error(msg: string): void {
    this.logger.print("error", msg);
  }

  protected warn(msg: string): void {
    this.logger.print("warn", msg);
  }

  protected info(msg: string): void {
    this.logger.print("info", msg);
  }

  protected debug(msg: string): void {
    this.logger.print("debug", msg);
  }
}
