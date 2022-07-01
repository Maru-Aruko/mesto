import {initialCards} from "./Init.js";
import Card from "./Card.js";
import "../pages/index.css";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";

const popupProfileSelector = document.getElementById("popupProfile");
const popupAddPlaceSelector = document.getElementById("popupAddPlace");

const popupProfileForm = popupProfileSelector.querySelector(".popup__form");
const popupAddPlaceForm = popupAddPlaceSelector.querySelector(".popup__form");

const editButton = document.getElementById("editButton");
const nameInput = document.getElementById("nameInput");
const jobInput = document.getElementById("jobInput");
const addButton = document.getElementById("addButton");

const nameElement = document.getElementById("name");
const jobElement = document.getElementById("job");


const popupWithImage = new PopupWithImage(".popup_img-bg");
popupWithImage.setEventListener();

function initialClassCard(data) {
    const card = new Card(
        data,
        "#cards",
        () => popupWithImage.open(data.link, data.name));
    return card.createCard();
}

const cards = new Section({
    item: initialCards,
    renderer: (item) => {
        const cardItem = initialClassCard(item);
        cards.addItem(cardItem);
    },
}, ".cards");
cards.renderElement();


const userInfo = new UserInfo({profileName: ".profile__name", profileInfo: ".profile__job"});

const popupEditProfile = new PopupWithForm("#popupProfile", (formData) => {
    userInfo.setUserInfo({newUserName: formData["name-input"], newUserInfo: formData["job-input"]});
    popupEditProfile.close();
});
popupEditProfile.setEventListener();

editButton.addEventListener("click", () => {
    const userInfoData = userInfo.getUserInfo();
    nameInput.value = userInfoData.name;
    jobInput.value = userInfoData.info;
    initProfileForm();
    profilePopupValidator.resetErrors();
    popupEditProfile.open();

});

const popupAddPlace = new PopupWithForm("#popupAddPlace", (formData) => {

    const item = {name: formData["place-name"], link: formData["place-link"]};
    const card = initialClassCard(item);
    cards.addItem(card);
    popupAddPlace.close();
});
popupAddPlace.setEventListener();

addButton.addEventListener("click", () => {
    addPlacePopupValidator.resetErrors();
    popupAddPlace.open();
})

function initProfileForm() {
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;
}

const selectors = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.button__submit',
    inactiveButtonClass: '.button_inactive',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_active'
}

const addPlacePopupValidator = new FormValidator(selectors, popupAddPlaceForm);
const profilePopupValidator = new FormValidator(selectors, popupProfileForm);

addPlacePopupValidator.enableValidation();
profilePopupValidator.enableValidation();






