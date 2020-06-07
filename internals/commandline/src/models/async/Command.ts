export interface Command<R> {
  start(): Promise<R>;
}
