import { C } from "./C";

// 'percent' is number in range [0 - 100]
// 'decimal' is number in range [0 - 100]
// 'number' is number in range [x - y]
export type Type = "percent" | "number" | "decimal";
export type NumberType = C<"type", Type>;
