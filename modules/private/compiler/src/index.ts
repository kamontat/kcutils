export class Index {
  constructor(private message: string = "hello, welcome to compiler") {}

  toString() {
    return this.message;
  }

  print() {
    console.log(this.message);
  }
}
