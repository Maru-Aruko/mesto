export default class Section {
    constructor({item, renderer}, containerSelector) {
        this._item = item;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderElement() {
        this._item.forEach(elem => {
            this._renderer(elem);
        });
    }

    addItem(item) {
        this._container.prepend(item);

    }
}