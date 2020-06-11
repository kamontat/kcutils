export interface InputOption {
  label?: string;
  prefix?: string;
  suffix?: string;
  message: string | string[];
  stream?: NodeJS.WriteStream | NodeJS.WriteStream[];
}
