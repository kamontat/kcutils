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

  visualize(ds: Dependencies) {
    ds.loop(d => {
      const node = new Node(this.graph, d);
      node.build();
    });
  }

  toString() {
    return this.graph.to_dot();
  }

  engine(engine: graphviz.RenderEngine) {
    this._engine = engine;
  }

  toPDF(filepath: string) {
    console.log(`exporting to ${filepath}`);
    // eslint-disable-next-line
    this.graph.render({ type: "pdf", use: this._engine }, `${filepath}/graph.pdf`);
  }

  toPNG(filepath: string) {
    console.log(`exporting to ${filepath}`);
    // eslint-disable-next-line
    this.graph.render({ type: "png:cairo:gd", use: this._engine }, `${filepath}/graph.png`);
  }
}
