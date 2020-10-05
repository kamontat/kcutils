import { Graph } from "./models/Graph";
import { DependencyServices } from "./services/DependencyService";
import { OptionalServiceOption } from "./services/models/ServiceOption";

export const builder = (opts: OptionalServiceOption): Promise<Graph> => {
  const serv = new DependencyServices(opts);
  return serv.graph();
};

export * from "./models/query/Classify";
export * from "./models/query/Query";
export * from "./models/query/QueryBuilder";

export * from "./models/dependencies/DependencyCategory";
export * from "./models/dependencies/DependencyLink";
export * from "./models/dependencies/DependencyType";
