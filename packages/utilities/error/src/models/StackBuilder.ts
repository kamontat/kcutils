import type { CallStack } from "./CallStack";

export type StackBuilder = (stacks: CallStack[]) => string | undefined;
