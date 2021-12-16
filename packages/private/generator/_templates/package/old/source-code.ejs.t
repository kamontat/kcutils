---
to: ../../<%= type %>/<%= h.toSafeName(name) %>/src/index.ts
---

export class Index {
  constructor(private message: string = "hello, welcome to <%= name %>") {}

  toString() {
    return this.message;
  }

  print() {
    console.log(this.message);
  }
}
