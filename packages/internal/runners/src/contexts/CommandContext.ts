/**
 * @public
 * commandline interface collection context
 */
export class CommandContext {
  /**
   * build node command with input argument
   * @param args node arguments
   * @returns node command in cli
   */
  node(...args: string[]): string[] {
    return ["node", ...args];
  }

  /**
   * build tsc command with input argument
   * @param configPath tsconfig.json
   * @param args tsc arguments
   * @returns tsc command in cli
   */
  tsc(configPath: string, ...args: string[]): string[] {
    return ["tsc", "--project", configPath, ...args];
  }

  /**
   * build rollup command with input argument
   * @param args rollup arguments
   * @returns rollup command in cli
   */
  rollup(...args: string[]): string[] {
    return ["rollup", "--config", ...args];
  }

  /**
   * build eslint command with input argument
   * @param configPath .eslintrc.json
   * @param args eslint arguments
   */
  eslint(configPath: string, ...args: string[]): string[] {
    return ["eslint", "--config", configPath, ...args];
  }

  /**
   * build jest command with input argument
   * @param configPath jest.config.js
   * @param args jest arguments
   */
  jest(configPath: string, ...args: string[]): string[] {
    return ["jest", "--config", configPath, ...args];
  }

  /**
   * build stryker run command with input option
   * @param configPath stryker.conf.js
   * @param args stryker option arguments
   */
  stryker(configPath: string, ...args: string[]): string[] {
    return ["stryker", ...args, "run", configPath];
  }
}
