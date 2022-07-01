export default class Popup {
    constructor(popupSelector) {
        this.popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this.popupElement.classList.add("popup_opened");
        //В Yandex Browser не срабатывает keydown для клавиши Esc
        document.addEventListener("keyup", this._handleEscClose);
    }

    close() {
        this.popupElement.classList.remove("popup_opened");
        document.removeEventListener("keyup", this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            if (this.popupElement.classList.contains("popup_opened")) {
                this.close();
            }
        }
    }

    setEventListener() {
        this.popupElement.addEventListener("click", (evt) => {
            if (evt.target.classList.contains("popup_opened")) {
                this.close();
            }
            if (evt.target.classList.contains("popup__close-button")) {
                this.close();
            }
        });
    }
}