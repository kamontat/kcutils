import { DependencyServices } from "./services/DependencyService";
import { OptionalServiceOption } from "./services/models/Option";

export const builder = (opts: OptionalServiceOption) => {
  const serv = new DependencyServices(opts);
  return serv.graph();
};

export * from "./models/query/Classify";
export * from "./models/query/Query";
export * from "./models/query/QueryBuilder";
