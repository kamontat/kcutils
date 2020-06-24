type Callback<T> = () => Promise<T>;

export class RetrySystem {
  constructor(private readonly delayMs: number) {}

  async try<T>(cb: Callback<T>, limit: number = 3): Promise<T> {
    try {
      return await cb();
    } catch (e) {
      if (limit > 1) {
        await new Promise(res => setTimeout(res, this.delayMs));
        return this.try(cb, limit - 1);
      } else return Promise.reject(new Error(e));
    }
  }
}
