export interface CallStack {
  path: string;
  typename: string | null;
  linenum: number | null;
  colmnum: number | null;
  funcname: string | null;
  method: string | null;
}
