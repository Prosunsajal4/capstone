import "@testing-library/jest-dom";

Object.defineProperty(HTMLElement.prototype, "scrollTo", {
  value: function () {},
  writable: true,
  configurable: true,
});
