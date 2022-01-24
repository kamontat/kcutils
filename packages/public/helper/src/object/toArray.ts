export type JsonSortableData<T> = {
  index: number;
  data: T;
};

export type SortableJson = {
  [key: string]: JsonSortableData<string | string[]>;
};

const toArray = (json: Partial<SortableJson>): string[] => {
  return Object.keys(json)
    .sort((k1, k2) => {
      const v1 = json[k1] ?? { index: -1, data: "" };
      const v2 = json[k2] ?? { index: -1, data: "" };

      if (v1.index > v2.index) return 1;
      else if (v1.index < v2.index) return -1;
      else return 0;
    })
    .map((k) => json[k]?.data ?? "")
    .reduce<string[]>(
      (p, c) => (Array.isArray(c) ? [...p, ...c] : [...p, c]),
      [] as string[]
    );
};

export default toArray;
