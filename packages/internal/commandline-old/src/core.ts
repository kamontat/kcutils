import { Context } from "@kcinternal/runners";

const context = Context.build();
context.question.askBoolean("Do you love me?");
