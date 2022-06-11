import {initialCards} from "./Card.js";
import FormValidator from "./FormValidator.js";


const popupProfile = document.getElementById("popupProfile");
const popupAddPlace = document.getElementById("popupAddPlace");

const popupProfileForm = popupProfile.querySelector(".popup__form");
const popupAddPlaceForm = popupAddPlace.querySelector(".popup__form");

const editButton = document.getElementById("editButton");
const closeButtonProfile = document.getElementById("closeButtonProfile");
const formElementProfile = document.getElementById("formProfile");
const nameInput = document.getElementById("nameInput");
const jobInput = document.getElementById("jobInput");
const addButton = document.getElementById("addButton");
const closeButtonAdd = document.getElementById("closeButtonAdd");
const formElementAddPlace = document.getElementById("formAddPlace");
const placeNameInput = document.getElementById("placeNameInput");
const placeLinkInput = document.getElementById("placeLinkInput");
const popupImg = document.getElementById("popupImg");
const closeButtonImg = document.getElementById("closeButtonImg");

const imgPopup = popupImg.querySelector(".popup__img");
const popupImgText = popupImg.querySelector(".popup__text");

let openedPopup = null;


const nameElement = document.getElementById("name");
const jobElement = document.getElementById("job");

const cardsContainer = document.querySelector(".cards");
const cardsTemplate = document.querySelector("#cards").content;

const popupList = Array.from(document.querySelectorAll(".popup"));

function clickLike(button) {
    button.classList.toggle("card__like-button_active");
}

function createCard({name, link}) {
    const cardElement = cardsTemplate
        .querySelector(".card")
        .cloneNode(true);
    cardElement.querySelector(".card__name").textContent = name;
    cardElement.querySelector(".card__img").src = link;
    cardElement.querySelector(".card__img").alt = name;

    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", function () {
        clickLike(likeButton)
    });

    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", function () {
        cardElement.remove();
    });

    const openImg = cardElement.querySelector(".card__img");
    openImg.addEventListener("click", function () {
        openPopupImg(link, name);
    });
    return cardElement;
}

function addCard(container, cardElement) {
    cardsContainer.prepend(cardElement);
}

function renderDefaultCards() {
    initialCards.forEach(function (cardData) {
        addCard(cardsContainer, createCard(cardData));
    });
}

renderDefaultCards();

function openPopup(popup) {
    openedPopup = popup;
    popup.classList.add("popup_opened");
    //В Yandex Browser не срабатывает keydown для клавиши Esc
    document.addEventListener("keyup", handleEscClose);
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keyup", handleEscClose);
    openedPopup = null;
}

function openPopupProfile() {
    initProfileForm();
    openPopup(popupProfile);
}

function openPopupImg(imgSrc, imgName) {
    imgPopup.src = imgSrc;
    imgPopup.alt = imgName;
    popupImgText.textContent = imgName;
    openPopup(popupImg);
}

function initProfileForm() {
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    closePopup(popupProfile);
}

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    const newCardAdd = {
        name: placeNameInput.value,
        link: placeLinkInput.value
    };
    addCard(cardsContainer, createCard(newCardAdd));
    popupAddPlaceForm.reset();
    closePopup(popupAddPlace);
}

function handleEscClose(evt) {
    if (evt.key === "Escape") {
        closePopup(openedPopup);
    }
}

function enablePopupCloseOnOverlayClick() {
    popupList.forEach((popupElement) => {
        popupElement.addEventListener("click", (evt) => {
            if (evt.target === popupElement) {
                closePopup(popupElement);
            }
        });
    });
}

enablePopupCloseOnOverlayClick();

const addPlacePopupValidator = new FormValidator({
        inputSelector: '.popup__input',
        submitButtonSelector: '.button__submit',
        inactiveButtonClass: '.button_inactive',
        inputErrorClass: 'popup__input_error',
        errorClass: 'popup__input-error_active'
    },
    popupAddPlaceForm
);

const profilePopupValidator = new FormValidator({
        inputSelector: '.popup__input',
        submitButtonSelector: '.button__submit',
        inactiveButtonClass: '.button_inactive',
        inputErrorClass: 'popup__input_error',
        errorClass: 'popup__input-error_active'
    },
    popupProfileForm
);

addPlacePopupValidator.enableValidation();
profilePopupValidator.enableValidation();


editButton.addEventListener("click", openPopupProfile);
closeButtonProfile.addEventListener("click", () => closePopup(popupProfile));
addButton.addEventListener("click", () => openPopup(popupAddPlace));
closeButtonAdd.addEventListener("click", () => closePopup(popupAddPlace));
closeButtonImg.addEventListener("click", () => closePopup(popupImg));
formElementProfile.addEventListener("submit", handleProfileFormSubmit);
formElementAddPlace.addEventListener("submit", handleAddCardFormSubmit);







