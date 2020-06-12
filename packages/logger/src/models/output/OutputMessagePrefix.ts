import { json } from "@kcutils/helper";

export interface OutputMessagePrefix extends json.OptionalSortableJson {
  badge: json.JsonSortableData<string>;
  label: json.JsonSortableData<string>;
  custom: json.JsonSortableData<string[]>;
}
