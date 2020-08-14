import { builder, Classify, QueryBuilder, DependencyCategory } from "@kcinternal/graph";

const externalModels = new QueryBuilder();
externalModels.add(DependencyCategory.APPLICATION, /(react)/);
externalModels.add(DependencyCategory.CORE, /(graphviz|lerna|enzyme|stryker-mutator)/);
externalModels.add(DependencyCategory.LIBRARY, /(chalk|figures)/);
const external = new Classify(externalModels, false);

const internalModels = new QueryBuilder();
internalModels.add(DependencyCategory.INTERNAL, /(kcinternal)/);
internalModels.add(DependencyCategory.LIBRARY, /(kcutils)/);
const internal = new Classify(internalModels, true);

(async () => {
  const graph = await builder({ root: process.cwd(), name: "Deps", external, internal });
  graph.engine("fdp");

  try {
    await graph.toPDF();
  } catch (e) {
    console.error(e);
  }
})();
