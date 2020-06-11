import { json } from "@kcutils/helper";

export interface OutputMessageData extends json.OptionalSortableJson {
  messages: json.JsonSortableData<string[]>;
}
