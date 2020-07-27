export type JsonSortableData<T> = {
  index: number;
  data: T;
};

export type SortableJson = {
  [key: string]: JsonSortableData<string | string[]>;
};

export type OptionalSortableJson = Partial<SortableJson>;

type PossibleValue = any | any[];
type PossibleValues = PossibleValue | Record<string, PossibleValue>;

type NestedJson = Partial<Record<string, PossibleValues>>;

export const isObject = <T = unknown>(obj: T | undefined | null): obj is T => {
  if (obj === undefined || obj === null) return false;
  else return typeof obj === "object" && !Array.isArray(obj);
};

export const deepMerge = <T extends NestedJson, U extends NestedJson>(
  _jsonA?: T,
  _jsonB?: U,
  size: number = 20
): T & U => {
  const jsonA: T = Object.assign({}, isObject(_jsonA) ? _jsonA : ({} as any));
  const jsonB: U = Object.assign({}, isObject(_jsonB) ? _jsonB : ({} as any));

  return [jsonB].reduce((prev, obj) => {
    (Object.keys(obj) as Array<keyof typeof obj>).forEach(key => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal) && size > 0) {
        prev[key] = deepMerge(pVal, oVal, size - 1);
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, jsonA as T & U) as T & U;
};

export const toArray = (json: OptionalSortableJson): string[] => {
  return Object.keys(json)
    .sort((k1, k2) => {
      const v1 = json[k1] ?? { index: -1, data: "" };
      const v2 = json[k2] ?? { index: -1, data: "" };

      if (v1.index > v2.index) return 1;
      else if (v1.index < v2.index) return -1;
      else return 0;
    })
    .map(k => json[k]?.data ?? "")
    .reduce<string[]>((p, c) => (Array.isArray(c) ? [...p, ...c] : [...p, c]), [] as string[]);
};
