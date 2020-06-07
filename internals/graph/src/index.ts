import { DependencyServices, OptionalServiceOptions } from "./services/DependencyService";

export const builder = (opts: OptionalServiceOptions) => {
  const serv = new DependencyServices(opts);
  return serv.graph();
};

export * from "./models/query/Classify";
export * from "./models/query/Query";
export * from "./models/query/QueryBuilder";
