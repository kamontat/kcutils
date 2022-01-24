import { OutputMessageMetadata } from "./OutputMessageMetadata";
import { OutputMessagePrefix } from "./OutputMessagePrefix";
import { OutputMessageData } from "./OutputMessageData";
import { OutputMessageSuffix } from "./OutputMessageSuffix";

export interface OutputMessage {
  metadata: OutputMessageMetadata;
  prefix: OutputMessagePrefix;
  data: OutputMessageData;
  suffix: OutputMessageSuffix;
}
