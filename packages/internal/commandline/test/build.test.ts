import { option, action } from "../src/controllers/build";

describe("Build Controller", () => {
  describe("Build Option", () => {
    test("constants", () => {
      expect(option.name).toBe("option");
      expect(option.previous).toBeFalsy();
    });
  });
  describe("Build Action", () => {
    test("constants", () => {
      expect(action.name).toBe("action");
      expect(action.previous).toBeTruthy();
    });
  });
});
