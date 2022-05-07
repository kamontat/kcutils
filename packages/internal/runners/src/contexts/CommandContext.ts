/**
 * @public
 * commandline interface collection context
 */
export class CommandContext {
  // TODO: Implement this function
  /**
   * sometime we have to add path to commandline name
   * when commandline is not in $PATH or it's yarn bin files
   *
   * @param cmd commandline name
   * @returns valid commandline name
   */
  private commandResolver(cmd: string): string {
    return cmd;
  }

  /**
   * build node command with input argument
   * @param args node arguments
   * @returns node command in cli
   */
  node(...args: string[]): string[] {
    const cmd = this.commandResolver("node");
    return [cmd, ...args];
  }

  /**
   * build tsc command with input argument
   * @param configPath tsconfig.json
   * @param args tsc arguments
   * @returns tsc command in cli
   */
  tsc(configPath: string, ...args: string[]): string[] {
    const cmd = this.commandResolver("tsc");
    return [cmd, "--project", configPath, ...args];
  }

  /**
   * build rollup command with input argument
   * @param args rollup arguments
   * @returns rollup command in cli
   */
  rollup(...args: string[]): string[] {
    const cmd = this.commandResolver("rollup");
    return [cmd, "--config", ...args];
  }

  /**
   * build eslint command with input argument
   * @param configPath .eslintrc.json
   * @param args eslint arguments
   */
  eslint(configPath: string, ...args: string[]): string[] {
    const cmd = this.commandResolver("eslint");
    return [cmd, "--config", configPath, ...args];
  }

  /**
   * build jest command with input argument
   * @param configPath jest.config.js
   * @param args jest arguments
   */
  jest(configPath: string, ...args: string[]): string[] {
    const cmd = this.commandResolver("jest");
    return [cmd, "--config", configPath, ...args];
  }

  /**
   * build stryker run command with input option
   * @param configPath stryker.conf.js
   * @param args stryker option arguments
   */
  stryker(configPath: string, ...args: string[]): string[] {
    const cmd = this.commandResolver("stryker");
    return [cmd, ...args, "run", configPath];
  }
}
