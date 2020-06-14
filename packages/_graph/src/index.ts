import { builder, Classify, QueryBuilder } from "@kcinternal/graph";

const externalModels = new QueryBuilder();
const external = new Classify(externalModels, true);

const internalModels = new QueryBuilder();
const internal = new Classify(internalModels, true);

(async () => {
  const graph = await builder({ root: process.cwd(), name: "Deps", external, internal });

  try {
    await graph.toPDF("");
  } catch (e) {
    console.error(e);
  }
})();
