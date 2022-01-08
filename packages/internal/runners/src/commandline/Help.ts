export class Help {
  static empty(): Help {
    return new Help();
  }

  static initial(title: string): Help {
    return new Help(title);
  }

  constructor(
    private _title: string = "",
    private _paragraphs: string[] = []
  ) {}

  newParagraph(paragraph: string): this {
    this._paragraphs.push(paragraph);
    return this;
  }

  toString() {
    return `# ${this._title}
    
${this._paragraphs.join("\n\n")}`;
  }
}
