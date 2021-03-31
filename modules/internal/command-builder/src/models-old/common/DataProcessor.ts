import { DataInterface } from "./Data";
import Helpers from "./Helper";

interface TransformerObject<D, H> {
  data: D;
  helper: H;
}

type Transformer<D, O, H> = (obj: TransformerObject<D, H>) => O;

abstract class DataProcessor<
  DATA extends DataInterface<any, any>,
  HELPER = Helpers
> {
  protected object: TransformerObject<DATA, HELPER>;
  constructor(data: DATA, helper: HELPER) {
    this.object = { data, helper };
  }

  abstract transform<NEW extends DataInterface<any, any>>(
    t: Transformer<DATA, NEW, HELPER>
  ): DataProcessor<NEW, HELPER>;
}

export default DataProcessor;
export type { Transformer };
