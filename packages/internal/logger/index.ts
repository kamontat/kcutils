// settings    -> set how logger object initial
//                {  }
// transformer -> how output message will look like
//                {  }
// output      -> how output will be log to client
//                {  }
// message     -> data that can changes per log (might override settings)
//                {  }
// executor    -> combine all together

export { default as initial } from "./src/apis/initial";
export { default as build } from "./src/apis/build";
export { default as log } from "./src/apis/log";

export { default as newContext } from "./src/builders/newContext";
export { default as newTransformer } from "./src/builders/newTransformer";
export { default as newData } from "./src/builders/newData";
export { default as newSettings } from "./src/builders/newSettings";
export { default as newActions } from "./src/builders/newActions";

export { default as newMessage } from "./src/builders/newMessage";
export { default as newDefaults } from "./src/builders/newDefaults";
