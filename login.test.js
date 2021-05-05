// ./login.test.js

const { getByText } = require("@testing-library/dom");
require("@testing-library/jest-dom/extend-expect");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.resolve(__dirname, "./login.html"), "utf8");

let dom;
let container;

describe("Test for elements on Login page", () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    container = dom.window.document.body;
  });

  it("Page renders a heading element", () => {
    expect(container.querySelector("h2")).not.toBeNull();
    expect(
      getByText(container, "Login")
    ).toBeInTheDocument();
  });
});