import type { PrefixType, SuffixType } from "./LoggerFormat";

interface LoggerEvent {
  initialSettings?: () => void;
  buildPrefix?: (prefix: PrefixType) => void;
  buildMessage?: () => void;
  buildSuffix?: (suffix: SuffixType) => void;
  beforeEnterStream?: () => void;
  afterEnterStream?: () => void;
}

export default LoggerEvent;
