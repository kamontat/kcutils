import type { JsonSortableData, SortableJson } from "@kcutils/helper";

export interface OutputMessageMetadata extends Partial<SortableJson> {
  datetime: JsonSortableData<string>;
  scopes: JsonSortableData<string[]>;
  filename: JsonSortableData<string>;
  seperator: JsonSortableData<string>;
}
