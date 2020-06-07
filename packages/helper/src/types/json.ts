export type JsonSortableData<T> = {
  index: number;
  data: T;
};

export type Json = {
  [key: string]: JsonSortableData<string | string[]>;
};

export type OptionalJson = Partial<Json>;
