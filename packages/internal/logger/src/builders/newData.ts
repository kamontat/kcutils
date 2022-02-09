import type { Data, DataObject } from "../models/Data";

const defaultTransformer = <V>(obj: DataObject<V>): string => {
  return obj.prefix + obj.data + obj.suffix;
};

const newData = <V>(obj: Pick<Data<V>, "data"> & Partial<Data<V>>): Data<V> => {
  return {
    data: obj.data,
    prefix: obj.prefix ?? "",
    suffix: obj.suffix ?? "",
    transform: obj.transform ?? defaultTransformer,
  };
};

export default newData;
