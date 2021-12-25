/**
 * @public
 * commandline interface collection context
 */
export class CommandContext {
  /**
   * build node command with input argument
   *
   * @param args node arguments
   * @returns return node command
   */
  node(...args: string[]): string[] {
    return ["node", ...args];
  }
}
