import graphviz from "graphviz";

import { Dependency } from "./dependencies/Dependency";
import { Stylist } from "./styles/Stylist";
import { DependencyType } from "./dependencies/DependencyType";
import { DependencyCategory } from "./dependencies/DependencyCategory";
import { DependencyLink } from "./dependencies/DependencyLink";

const style = new Stylist({ color: "black", fontcolor: "black", style: "normal" });

style.newStyle(DependencyType.EXTERNAL, { style: "dashed", fontcolor: "gray20" });
style.newStyle(DependencyType.INTERNAL, { fontcolor: "blue" });

// red
style.newStyle(DependencyCategory.APPLICATION, { color: "red4" });

// blue
style.newStyle(DependencyCategory.CORE, { color: "lightsteelblue1" });
// green
style.newStyle(DependencyCategory.LIBRARY, { color: "palegreen" });
// orange
style.newStyle(DependencyCategory.INTERNAL, { color: "orange4" });
// pink
style.newStyle(DependencyCategory.TYPE, { color: "lightpink" });

// red
style.newStyle(DependencyLink.DEP, { style: "bold", color: "black" });
// black
style.newStyle(DependencyLink.DEV, { style: "dashed", color: "black" });
// gray
style.newStyle(DependencyLink.PEER, { style: "dashed", color: "gray" });

export class Node {
  private node: graphviz.Node;

  constructor(private graph: graphviz.Graph, private d: Dependency) {
    const styles = style.getStyles(d.type, d.category);

    const name = `${d.name} (v${d.version})`;
    this.node = this.graph.addNode(name, styles);
  }

  build() {
    this.dependency.dependOns.forEach(dep =>
      this.graph.addEdge(this.node, new Node(this.graph, dep).node, style.getStyle(DependencyLink.DEP))
    );
    this.dependency.devDependOns.forEach(dep =>
      this.graph.addEdge(this.node, new Node(this.graph, dep).node, style.getStyle(DependencyLink.DEV))
    );
    this.dependency.peerDependOns.forEach(dep =>
      this.graph.addEdge(this.node, new Node(this.graph, dep).node, style.getStyle(DependencyLink.PEER))
    );
  }

  get graphviz() {
    return this.node;
  }

  get dependency() {
    return this.d;
  }
}
