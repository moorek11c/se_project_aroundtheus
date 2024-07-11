// new class Section
// constructor takes 2 arguments: {items, renderer}
// items - array of data
// renderer - function that will render the data
// secondParameter - CSS selector where the data will be rendered
// public method renderItems() - renders all elements on page, iterates over each element in items
// public method addItem() - takes an DOM element and prepends it to the container

export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
}
