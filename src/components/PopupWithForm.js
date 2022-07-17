import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit, submitButton) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this.popupElement.querySelector(".popup__form");
        this._popupInputList = this._popupForm.querySelectorAll(".popup__input");
        this._submitButton = document.querySelector(submitButton);
        this._submitButtonDefaultText = this._submitButton.textContent;
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

    addUX(loading) {
        if (loading) {
            this._submitButton.textContent = "Сохранение...";
        } else {
            this._submitButton.textContent = this._submitButtonDefaultText;
        }
    }

    close() {
        this._popupForm.reset();
        super.close();
    }

}