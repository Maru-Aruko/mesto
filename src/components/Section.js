export default class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderElement(items) {
       items.reverse().forEach(elem => {
            this._renderer(elem);
        });
    }

    addItem(item) {
        this._container.prepend(item);

    }
}