import { Classify } from "../../models/query/Classify";

export interface ServiceOption {
  root: string;
  name: string;
  internal: Classify;
  external: Classify;
}

export type OptionalServiceOption = Partial<ServiceOption>;
