export const selectors = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.button__submit',
    inactiveButtonClass: '.button_inactive',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_active'
}
export const popupProfileSelector = document.getElementById("popupProfile");
export const popupAddPlaceSelector = document.getElementById("popupAddPlace");
export const popupConfirmSelector = document.getElementById("popupConfirm")
export const popupEditAvatarSelector = document.getElementById("popupEditAvatar")

export const popupProfileForm = popupProfileSelector.querySelector(".popup__form");
export const popupAddPlaceForm = popupAddPlaceSelector.querySelector(".popup__form");
export const popupEditAvatarForm = popupEditAvatarSelector.querySelector(".popup__form");

export const editButton = document.getElementById("editButton");
export const nameInput = document.getElementById("nameInput");
export const jobInput = document.getElementById("jobInput");
export const addButton = document.getElementById("addButton");
export const deleteButton = document.querySelectorAll("#deleteButton");
export const editAvatarButton = document.querySelector(".profile__avatar-overlay");

export const nameElement = document.getElementById("name");
export const jobElement = document.getElementById("job");
