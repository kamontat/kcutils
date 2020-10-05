import { isAbsolute, join } from "path";

import graphviz from "graphviz";
import { Node } from "./Node";
import { Dependencies } from "./dependencies/Dependencies";

export class Graph {
  private graph: graphviz.Graph;
  private _engine: graphviz.RenderEngine;

  constructor(id: string) {
    this.graph = graphviz.digraph(id);

    this.graph.set("splines", "ortho");
    this.graph.set("ratio", "expand");
    this.graph.set("center", "1");
    this.graph.set("size", "10");

    this.graph.setNodeAttribut("fontsize", "12");
    this.graph.setNodeAttribut("shape", "component");
    this.graph.setNodeAttribut("margin", "0.22,0.22");

    this._engine = "dot";
  }

  visualize(ds: Dependencies): void {
    ds.loop(d => {
      const node = new Node(this.graph, d);
      node.build();
    });
  }

  toString(): string {
    return this.graph.to_dot();
  }

  engine(engine: graphviz.RenderEngine): this {
    this._engine = engine;
    return this;
  }

  toPDF(dirpath: string = "", filename: string = "graph.pdf"): Promise<void> {
    return this.render({ type: "pdf" }, dirpath, filename);
  }

  toPNG(dirpath: string = "", filename: string = "graph.png"): Promise<void> {
    return this.render({ type: "png:cairo:gd" }, dirpath, filename);
  }

  render(opts: graphviz.RenderOptions, dirpath: string, filename: string): Promise<void> {
    const filepath = this.getFilepath(dirpath, filename);

    return new Promise<void>((res, rej) => {
      this.graph.render(Object.assign({}, { use: this._engine }, opts), filepath, (code, out, err) => {
        if (code === 0) {
          console.log(`exported to ${filepath}`);
          return res();
        } else {
          console.log(out);
          console.error(err);
          return rej(new Error(err));
        }
      });
    });
  }

  private getFilepath(dirpath: string, filename: string): string {
    const abspath = dirpath !== "" && isAbsolute(dirpath) ? dirpath : join(process.cwd(), dirpath);
    return join(abspath, filename);
  }
}
