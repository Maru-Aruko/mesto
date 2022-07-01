import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this.popupElement.querySelector(".popup__form");
        this._popupInputList = this._popupForm.querySelectorAll(".popup__input");

    }

    _getInputValues() {
        this._formValues = {};
        this._popupInputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListener() {
        this._popupForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
        super.setEventListener();
    }

    close() {
        this._popupForm.reset();
        super.close();
    }

}