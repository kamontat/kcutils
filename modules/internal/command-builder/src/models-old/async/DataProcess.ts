import Data, { DataInterface } from "../common/Data";
import DataProcessor, { Transformer } from "../common/DataProcessor";
import Helpers from "../common/Helper";

class DataProcess<
  D extends DataInterface<any, any>,
  H = Helpers
> extends DataProcessor<D, H> {
  transform<NEW extends DataInterface<any, any>>(
    t: Transformer<D, NEW, H>
  ): DataProcess<NEW, H> {
    const _data: NEW = t(this.object);
    return new DataProcess(_data, this.object.helper);
  }
}

const p = new DataProcess(
  Data.new(Promise.resolve("test"), { test: true }),
  Helpers.new()
);

p.transform(({ data }) => {
  return data.clone({ data: data.getData().then((t) => t + " new") });
})
  .transform(({ data }) => data.setOption({ test: false, override: true }))
  .transform(({ data }) => data.setData(100));
