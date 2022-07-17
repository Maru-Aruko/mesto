import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    setSubmitAction(submitAction) {
        this._handleSubmitCallback = submitAction;
    }

    setEventListeners() {
        super.setEventListener();
        this.popupElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleSubmitCallback();
        });
    }
}