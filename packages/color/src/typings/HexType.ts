import { C } from "./C";

export type Type = "hex" | "hex3" | "hex4" | "hex6" | "hex8";
export type HexType<T extends Type = Type> = C<"type", T>;
