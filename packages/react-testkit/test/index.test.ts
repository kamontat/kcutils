import React from "react";
import { render, shallow, mount, toJson } from "../src";

describe("Enzyme", () => {
  test("render react element", () => {
    const em = render(React.createElement("input", { name: "render" }));

    expect(em).not.toBeUndefined();
    expect(em.attr("name")).toContain("render");
  });

  test("shallow react element", () => {
    const em = shallow(React.createElement("input", { placeholder: "shallow" }));

    expect(em).not.toBeUndefined();
    expect(em.props()).toHaveProperty("placeholder");
  });

  test("mount react element", () => {
    expect(() => {
      mount(React.createElement("input", { min: 0 }));
    }).toThrow(); // It looks like you called `mount()` without a global document being loaded.
  });

  test("react element toJson", () => {
    const em = shallow(React.createElement("input", { prefix: "true" }));
    const json = toJson(em);

    expect(json).not.toBeUndefined();
    expect(json.props).toHaveProperty("prefix");
  });
});
