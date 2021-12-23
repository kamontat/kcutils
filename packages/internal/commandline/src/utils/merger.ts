import Demo from "../models/Demo";

/**
 * merge demo object together
 * @param d1 first demo object
 * @param d2 second demo object
 * @returns merged demo object
 */
const mergeDemo = (d1: Demo, d2: Demo): Demo => {
  return new Demo(d1.id + d2.id, d1.message + d2.message);
};

export { mergeDemo };
