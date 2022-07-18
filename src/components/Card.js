export default class Card {
    constructor({name, link, likes, _id, owner},
                myId,
                selector,
                handleCardClick,
                handleDeleteCardClick,
                handleLikeClick) {
        this._name = name;
        this._link = link;
        this._likes = likes;
        this._id = _id;
        this._ownerId = owner._id;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
        this._handleLikeClick = handleLikeClick;
        this._selector = selector;
        this._myId = myId;

    }

    isLiked() {
        return Boolean(this._likes.find((item) => item._id === this._myId));
    }

    updateLike(item) {
        this._likes = item["likes"]
    }

    updateLikesView() {
        this._getLikeValue();
        this._checkLikeState();
    }

    _getLikeValue() {
        this._cardElement.querySelector(".card__like-counter").textContent = this._likes.length;
    }

    _checkLikeState() {
        if (this.isLiked()) {
            this._likeButton.classList.add("card__like-button_active");
        } else {
            this._likeButton.classList.remove("card__like-button_active");
        }
    }

    _getTemplate() {
        return document.querySelector(this._selector).content.querySelector(".card")
            .cloneNode(true);
    }

    _setEventListeners() {
        this._likeButton.addEventListener("click", () => this._handleLikeClick());
        this._cardImgElement.addEventListener("click", () => this._openImg());
        this._deleteButton.addEventListener("click", () => this._handleDeleteCardClick((this._id)));
    }

    createCard() {
        this._cardElement = this._getTemplate();
        this._likeButton = this._cardElement.querySelector(".card__like-button");
        this._cardImgElement = this._cardElement.querySelector(".card__img");
        this._deleteButton = this._cardElement.querySelector(".card__delete-button");


        if (this._ownerId === this._myId) {
            this._deleteButton.classList.remove("card__delete-button_hide");
        }

        this._cardElement.querySelector(".card__name").textContent = this._name;
        this._cardImgElement.src = this._link;
        this._cardImgElement.alt = this._name;
        this.updateLikesView();

        this._setEventListeners();

        return this._cardElement;
    }

    _openImg() {
        this._handleCardClick(this._link, this._name);
    }

    removeCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }


}













