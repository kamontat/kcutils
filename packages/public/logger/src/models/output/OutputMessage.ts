import type { OutputMessageMetadata } from "./OutputMessageMetadata";
import type { OutputMessagePrefix } from "./OutputMessagePrefix";
import type { OutputMessageData } from "./OutputMessageData";
import type { OutputMessageSuffix } from "./OutputMessageSuffix";

export interface OutputMessage {
  metadata: OutputMessageMetadata;
  prefix: OutputMessagePrefix;
  data: OutputMessageData;
  suffix: OutputMessageSuffix;
}
