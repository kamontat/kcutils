import { applyMixins } from "../src/mixin";

class Jumpable {
  jump() {
    return "jump";
  }
}

class Duckable {
  duck() {
    return "duck";
  }
}

describe("Mixin", () => {
  test("able to extends Sprite function from jumpable class", () => {
    class Sprite {
      x = 1;
      y = 2;
    }
    interface Sprite extends Jumpable, Duckable {}

    applyMixins(Sprite, [Duckable, Jumpable]);

    const sprite = new Sprite();
    expect(sprite.x).toEqual(1);
    expect(sprite.y).toEqual(2);

    expect(sprite.jump()).toEqual("jump");
    expect(sprite.duck()).toEqual("duck");
  });
});
