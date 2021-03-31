type Fn<I, O> = (input: I) => O;
type Transformer<I, OP, O = I, OOP = OP> = (data: Data<I, OP>) => Data<O, OOP>;

type DataDataObject<D> = { data: D };
type DataOptionObject<O> = { option: O };
type DataObject<D, O> = DataDataObject<D> & DataOptionObject<O>;

interface DataInterface<D, OP> {
  getData(): D;
  getOption(): OP;

  setFn<ND, NOP>(
    fn: Fn<DataObject<D, OP>, DataObject<ND, NOP>>
  ): DataInterface<ND, NOP>;

  setData<ND>(data: ND): DataInterface<ND, OP>;
  setDataFn<ND>(dataFn: Fn<D, ND>): DataInterface<ND, OP>;

  setOption<NOP>(option: NOP): DataInterface<D, NOP>;
  setOptionFn<NOP>(optionFn: Fn<OP, NOP>): DataInterface<D, NOP>;

  build(t: Transformer<D, OP>): DataInterface<D, OP>;
  build<ND>(t: Transformer<D, OP, ND>): DataInterface<ND, OP>;
  build<NOP>(t: Transformer<D, OP, D, NOP>): DataInterface<D, NOP>;
  build<ND, NOP>(t: Transformer<D, OP, ND, NOP>): DataInterface<ND, NOP>;

  clone(): DataInterface<D, OP>;
  clone<ND>(o: DataDataObject<ND>): DataInterface<ND, OP>;
  clone<NOP>(o: DataOptionObject<NOP>): DataInterface<D, NOP>;
  clone<ND, NOP>(o: DataObject<ND, NOP>): DataInterface<ND, NOP>;

  action(fn: Fn<DataObject<D, OP>, void>): DataInterface<D, OP>;
}

class Data<D, OP> implements DataInterface<D, OP> {
  static new<D, O>(data: D, option: O): DataInterface<D, O> {
    return new Data(data, option);
  }

  private object: DataObject<D, OP>;
  private constructor(data: D, option: OP) {
    this.object = {
      data,
      option,
    };
  }

  getData() {
    return this.object.data;
  }

  getOption() {
    return this.object.option;
  }

  setFn<ND, NOP>(
    fn: Fn<DataObject<D, OP>, DataObject<ND, NOP>>
  ): Data<ND, NOP> {
    const newObj = fn(this.object);
    return this.clone(newObj);
  }

  setData<ND>(data: ND): Data<ND, OP> {
    return this.clone({ data });
  }

  setDataFn<ND>(data: Fn<D, ND>): Data<ND, OP> {
    return this.setData(data(this.object.data));
  }

  setOption<NOP>(option: NOP): Data<D, NOP> {
    return this.clone({ option });
  }

  setOptionFn<NOP>(option: Fn<OP, NOP>): Data<D, NOP> {
    return this.setOption(option(this.object.option));
  }

  clone<ND = D, NOP = OP>(o?: Partial<DataObject<ND, NOP>>): Data<ND, NOP> {
    const data: ND =
      o && o.data ? o.data : ((this.object.data as unknown) as ND);
    const option: NOP =
      o && o.option ? o.option : ((this.object.option as unknown) as NOP);
    return new Data(data, option);
  }

  build<O, OOP>(transformer: Transformer<D, OP, O, OOP>): Data<O, OOP> {
    return transformer(this);
  }

  action(fn: Fn<DataObject<D, OP>, void>): DataInterface<D, OP> {
    fn(this.object);
    return this;
  }
}

export default Data;

export type { Transformer, DataInterface };
