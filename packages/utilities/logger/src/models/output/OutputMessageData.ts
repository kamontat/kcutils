import type { JsonSortableData, SortableJson } from "@kcutils/helper";

export interface OutputMessageData extends Partial<SortableJson> {
  messages: JsonSortableData<string[]>;
}
