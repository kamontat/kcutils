import type { Transformer } from "../models/Transformer";

export interface DataObject<T> {
  data: T;
  prefix: string;
  suffix: string;
}

export interface Data<T> extends DataObject<T> {
  transform: Transformer<DataObject<T>, string>;
}
