import React from "react";
import { render, shallow, toJson } from "../src";

describe("Enzyme", () => {
  test("render react element", () => {
    const em = render(React.createElement("input"));
    expect(em).not.toBeUndefined();
  });
  test("shallow react element", () => {
    const em = shallow(React.createElement("input"));
    expect(em).not.toBeUndefined();
  });
  test("react element toJson", () => {
    const em = shallow(React.createElement("input", { prefix: "true" }));
    const json = toJson(em);

    expect(json).not.toBeUndefined();
    expect(json.props).toHaveProperty("prefix");
  });
});
