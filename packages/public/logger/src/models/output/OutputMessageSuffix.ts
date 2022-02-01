import type { JsonSortableData, SortableJson } from "@kcutils/helper";

export interface OutputMessageSuffix extends Partial<SortableJson> {
  custom: JsonSortableData<string[]>;
}
