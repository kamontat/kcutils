import flatmap from "../array/flatmap";

export type JsonSortableData<T> = {
  index: number;
  data: T;
};

export type SortableJson = {
  [key: string]: JsonSortableData<string | string[]>;
};

const toArray = (json: Partial<SortableJson>): (string | undefined)[] => {
  const output = Object.keys(json)
    .filter((k) => (json[k]?.index ?? -1) > 0 && (json[k]?.data ?? "") !== "")
    .sort((k1, k2) => {
      const v1 = json[k1] ?? { index: -1, data: "" };
      const v2 = json[k2] ?? { index: -1, data: "" };

      if (v1.index > v2.index) return 1;
      else if (v1.index < v2.index) return -1;
      else return 0;
    })
    .map((k) => json[k]?.data as string);

  return flatmap(output);
};

export default toArray;
