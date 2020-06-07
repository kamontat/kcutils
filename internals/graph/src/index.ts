import { getPackages } from "@lerna/project";
import { resolve } from "path";
import { Graph } from "./models/Graph";
import { Dependencies } from "./models/dependencies/Dependencies";
import { InternalDependencies } from "./models/dependencies/InternalDependency";
import { ExternalDependencies } from "./models/dependencies/ExternalDependency";

import { internalClassify, externalClassify } from "./settings";

getPackages(resolve(__dirname, "..", "..", "..")).then(_packages => {
  const graph = new Graph("Deps");

  const dependencies = new Dependencies();

  _packages.forEach(p => dependencies.add(InternalDependencies.from(internalClassify, p)));

  _packages.forEach(p => {
    const d = dependencies.get(p.name);
    if (d) {
      const deps = ExternalDependencies.from(externalClassify, p.dependencies || {}, dependencies);
      const devDeps = ExternalDependencies.from(externalClassify, p.devDependencies || {}, dependencies);
      const peerDeps = ExternalDependencies.from(externalClassify, p.peerDependencies || {}, dependencies);

      deps.forEach(dd => d.addDependOn(dd));
      devDeps.forEach(dd => d.addDevDependOn(dd));
      peerDeps.forEach(dd => d.addPeerDependOn(dd));
    }
  });

  graph.engine("circo");
  graph.visualize(dependencies);
  // console.log(graph.toString());
  graph.toPDF(process.cwd());
});
