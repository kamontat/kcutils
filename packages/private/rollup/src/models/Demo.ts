export default class Demo {
  constructor(private _id: number, private _msg: string = "demo") {}

  get id(): number {
    return this._id;
  }

  get message(): string {
    return this._msg;
  }

  next(): number {
    return this._id + 1;
  }

  updateMessage(msg: string) {
    this._msg = msg;
  }

  toString() {
    return `${this._id}: ${this._msg}`;
  }
}

const HelloWorld = new Demo(0, "hello world");

export { HelloWorld };
