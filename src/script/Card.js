export default class Card {
    constructor({name, link},
                selector,
                handleCardClick) {
        this._name = name;
        this._link = link;
        this._handleCardClick = handleCardClick;
        this._selector = selector;
    }

    _getTemplate() {
        return document.querySelector(this._selector).content.querySelector(".card")
            .cloneNode(true);
    }

    _setEventListeners() {
        this._likeButton.addEventListener("click", () => this._toggleLikeButton());
        this._cardImgElement.addEventListener("click", () => this._openImg());
        this._deleteButton.addEventListener("click", () => this._removeCard());
    }

    createCard() {
        this._cardElement = this._getTemplate();
        this._likeButton = this._cardElement.querySelector(".card__like-button");
        this._cardImgElement = this._cardElement.querySelector(".card__img");
        this._deleteButton = this._cardElement.querySelector(".card__delete-button");


        this._cardElement.querySelector(".card__name").textContent = this._name;
        this._cardImgElement.src = this._link;
        this._cardImgElement.alt = this._name;

        this._setEventListeners();

        return this._cardElement;
    }

    _openImg() {
        this._handleCardClick(this._link, this._name);
    }

    _removeCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    _toggleLikeButton() {
        this._likeButton.classList.toggle("card__like-button_active");
    }
}











