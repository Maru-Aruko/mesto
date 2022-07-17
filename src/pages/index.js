import Card from "../components/Card.js";
import "./index.css";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
    selectors,
    popupProfileForm,
    popupAddPlaceForm,
    editButton,
    nameInput,
    jobInput,
    addButton,
    editAvatarButton,
    popupEditAvatarForm
} from "../utils/constants";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-45',
    headers: {
        authorization: '361cddb0-0cf4-404e-a741-1847db62073a',
        'Content-Type': 'application/json'
    }
});

let myId;
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([me, card]) => {
        myId = me._id;
        userInfo.setUserInfo(me);
        cards.renderElement(card)
        console.log(me, card)
    })
    .catch((err) => {
        console.log(err)
    })

const popupWithImage = new PopupWithImage(".popup_img-bg");
popupWithImage.setEventListener();

const popupConfirm = new PopupWithConfirmation("#popupConfirm")
popupConfirm.setEventListeners();

function initialClassCard(data) {
    const card = new Card(
        data,
        myId,
        "#cards",
        () => popupWithImage.open(data.link, data.name),
        (id) => {
            popupConfirm.setSubmitAction(() => {
                api.removeCard(id)
                    .then(() => {
                        card._removeCard();
                        popupConfirm.close();
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            popupConfirm.open()
        },
        () => {
            if (!card.isLiked()) {
                api.addLike(data._id)
                    .then((data) => {
                        card.updateLike(data)
                        card.updateLikesView();
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else {
                api
                    .removeLike(data._id)
                    .then((data) => {
                        card.updateLike(data)
                        card.updateLikesView();
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        })
    return card.createCard();
}

const cards = new Section({
    renderer: (item) => {
        const cardItem = initialClassCard(item);
        cards.addItem(cardItem);
    },
}, ".cards");

const userInfo = new UserInfo({
    profileName: ".profile__name",
    profileInfo: ".profile__job",
    profileAvatar: ".profile__avatar-img"
});

const popupEditProfile = new PopupWithForm("#popupProfile", (formData) => {
    popupEditProfile.addUX(true)
    api.setProfile(formData)
        .then((me) => {
            userInfo.setUserInfo(me);
            popupEditProfile.close();
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => popupEditProfile.addUX(false))

}, ".popup__save-button");
popupEditProfile.setEventListener();

editButton.addEventListener("click", () => {
    const userInfoData = userInfo.getUserInfo();
    initProfileForm(userInfoData);
    profilePopupValidator.resetErrors();
    popupEditProfile.open();
});

const popupAddPlace = new PopupWithForm("#popupAddPlace", (formData) => {
    popupAddPlace.addUX(true)
    api.addNewCard(formData)
        .then((card) => {
            const newCard = initialClassCard(card);
            cards.addItem(newCard);
            popupAddPlace.close();
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => popupAddPlace.addUX(false))
}, ".popup__create-button");
popupAddPlace.setEventListener();

const popupEditAvatar = new PopupWithForm("#popupEditAvatar", (formData) => {
    popupEditAvatar.addUX(true)
    api.changeAvatar(formData)
        .then((avatar) => {
            userInfo.setUserInfo(avatar);
            popupEditAvatar.close();
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => popupEditAvatar.addUX(false))
}, ".popup__edit-button")
popupEditAvatar.setEventListener()

addButton.addEventListener("click", () => {
    addPlacePopupValidator.resetErrors();
    popupAddPlace.open();
})

editAvatarButton.addEventListener("click", () => {
    popupEditAvatar.open();
})

function initProfileForm(data) {
    nameInput.value = data.name;
    jobInput.value = data.about;
}

const addPlacePopupValidator = new FormValidator(selectors, popupAddPlaceForm);
const profilePopupValidator = new FormValidator(selectors, popupProfileForm);
const editAvatarPopupValidator = new FormValidator(selectors, popupEditAvatarForm)

addPlacePopupValidator.enableValidation();
profilePopupValidator.enableValidation();
editAvatarPopupValidator.enableValidation();






