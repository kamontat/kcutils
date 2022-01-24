import { json } from "@kcutils/helper";

export interface OutputMessageMetadata extends json.OptionalSortableJson {
  datetime: json.JsonSortableData<string>;
  scopes: json.JsonSortableData<string[]>;
  filename: json.JsonSortableData<string>;
  seperator: json.JsonSortableData<string>;
}
