import { json } from "@kcutils/helper";

export interface OutputMessageSuffix extends json.OptionalSortableJson {
  custom: json.JsonSortableData<string[]>;
}
