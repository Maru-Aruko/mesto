import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement);
        this._imgPopup = this.popupElement.querySelector(".popup__img");
        this._popupImgText = this.popupElement.querySelector(".popup__text");
    }

    open(imgSrc, imgName) {
        this._imgPopup.src = imgSrc;
        this._imgPopup.alt = imgName;
        this._popupImgText.textContent = imgName;
        super.open();
    }
}