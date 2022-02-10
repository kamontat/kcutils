import type { Writable } from "../custom/Writable";

export interface InputOption {
  label?: string;
  prefix?: string;
  suffix?: string;
  message: string | string[];
  stream?: Writable | Writable[];
  appendStream?: boolean;
  scopes?: string[];
  timestamp?: string;
}
