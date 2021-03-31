import { Helpers } from "../../helpers";
import { Context } from "./Context";

type Fn<IN, H extends Helpers, O> = (context: Context<IN, H>) => O;

export class Runner<IN, H extends Helpers, O> {
  constructor(
    private context: Context<IN, H>,
    private transformer: Fn<IN, H, O>
  ) {}
}
