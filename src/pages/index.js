import {initialCards} from "../components/Init.js";
import Card from "../components/Card.js";
import "./index.css";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {selectors, popupProfileSelector, popupAddPlaceSelector, popupProfileForm, popupAddPlaceForm, editButton, nameInput,jobInput,addButton, nameElement, jobElement} from "../utils/constants";

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
    initProfileForm(userInfoData);
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

function initProfileForm(data) {
    nameInput.value = data.name;
    jobInput.value = data.info;
}

const addPlacePopupValidator = new FormValidator(selectors, popupAddPlaceForm);
const profilePopupValidator = new FormValidator(selectors, popupProfileForm);

addPlacePopupValidator.enableValidation();
profilePopupValidator.enableValidation();






