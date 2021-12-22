import { HelloWorld } from "@kcprivate/rollup";
import { Demo } from "@kcprivate/tsc";

console.log(HelloWorld.toString());
console.log(new Demo(5, "tsc example").toString());
