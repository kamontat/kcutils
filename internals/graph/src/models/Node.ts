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
style.newStyle(DependencyCategory.APPLICATION, { color: "red" });
// orange
style.newStyle(DependencyCategory.CORE, { color: "orange" });
// purple
style.newStyle(DependencyCategory.LIBRARY, { color: "purple" });
// green
style.newStyle(DependencyCategory.INTERNAL, { color: "mediumseagreen" });
// blue
style.newStyle(DependencyCategory.TYPE, { color: "lightskyblue" });
// white
style.newStyle(DependencyCategory.IGNORE, { color: "white" });
// white
style.newStyle(DependencyCategory.UNKNOWN, { color: "white" });

// dependencies link
style.newStyle(DependencyLink.DEP, { style: "bold", color: "black" });
// devDependencies link
style.newStyle(DependencyLink.DEV, { style: "normal", color: "gray" });
// peerDependencies link
style.newStyle(DependencyLink.PEER, { style: "normal", color: "gray" });

export class Node {
  private node: graphviz.Node;

  constructor(private graph: graphviz.Graph, private d: Dependency) {
    const styles = style.getStyles(d.type, d.category);

    const name = `${d.name} (v${d.version})`;
    this.node = this.graph.addNode(name, styles);
  }

  build(): void {
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

  get graphviz(): graphviz.Node {
    return this.node;
  }

  get dependency(): Dependency {
    return this.d;
  }
}
