type Constructor = new (...args: any[]) => any;

/**
 * apply mixins to input constructor to extends function
 *
 * @param derivedCtor base class for create mixin in
 * @param constructors extra object that should extends to base class
 * @see https://www.typescriptlang.org/docs/handbook/mixins.html
 */
const applyMixins = <T extends Constructor>(
  derivedCtor: T,
  constructors: Constructor[]
) => {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null)
      );
    });
  });
};

export default applyMixins;
