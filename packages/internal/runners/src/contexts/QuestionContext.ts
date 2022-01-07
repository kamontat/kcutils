import { createInterface } from "readline";

export class QuestionContext {
  constructor(
    private readonly stdin: NodeJS.ReadStream = process.stdin,
    private readonly stdout: NodeJS.WriteStream = process.stdout
  ) {}

  askString(title: string): Promise<string> {
    const i = this.newInterface();
    return new Promise((resolve) =>
      i.question(title, (answer) => {
        i.close();
        resolve(answer);
      })
    );
  }

  async askBoolean(
    title: string,
    yes: string[] = ["y", "yes", "true", "t"],
    no: string[] = ["n", "no", "false", "f"],
    def: boolean = false
  ): Promise<boolean> {
    const ans = await this.askString(title);
    if (yes.find((y) => ans.toLowerCase() === y.toLowerCase())) return true;
    else if (no.find((n) => ans.toLowerCase() === n.toLowerCase()))
      return false;
    else return def;
  }

  async askNumber(title: string, def: number = -1): Promise<number> {
    const ans = await this.askString(title);
    const number = parseFloat(ans);
    if (isFinite(number)) return number;
    else return def;
  }

  private newInterface() {
    return createInterface({
      input: this.stdin,
      output: this.stdout,
    });
  }
}
