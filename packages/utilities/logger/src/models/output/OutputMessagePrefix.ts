import type { JsonSortableData, SortableJson } from "@kcutils/helper";

export interface OutputMessagePrefix extends Partial<SortableJson> {
  badge: JsonSortableData<string>;
  label: JsonSortableData<string>;
  custom: JsonSortableData<string[]>;
}
