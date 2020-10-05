import { resolve } from "path";

import { ServiceOption } from "../models/ServiceOption";
import { Classify } from "../../models/query/Classify";

export const options: ServiceOption = {
  root: resolve(process.cwd(), "..", "..", ".."),
  name: "Deps",
  external: Classify.empty(),
  internal: Classify.empty(),
};
