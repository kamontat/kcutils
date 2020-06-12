import { Writable } from "stream";

export interface InputOption {
  label?: string;
  prefix?: string;
  suffix?: string;
  message: string | string[];
  stream?: Writable | Writable[];
  appendStream?: boolean;
}
