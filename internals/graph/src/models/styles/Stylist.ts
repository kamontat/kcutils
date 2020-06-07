import { StyleObject } from "./StyleObject";

export class Stylist {
  private map: Map<string, StyleObject>;

  constructor(private initial: StyleObject = {}) {
    this.map = new Map();
  }

  newStyle(name: string, obj: StyleObject) {
    this.map.set(name, obj);
  }

  getStyle(name: string): StyleObject | undefined {
    return this.map.get(name);
  }

  getStyles(...names: string[]): StyleObject {
    return names.reduce((p, name) => {
      const style = this.getStyle(name);

      if (style) return { ...p, ...style };
      else return p;
    }, this.initial);
  }
}
