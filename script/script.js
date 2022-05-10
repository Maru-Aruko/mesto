const popupProfile = document.getElementById("popupProfile");
const editButton = document.getElementById("editButton");
const closeButtonProfile = document.getElementById("closeButtonProfile");
const formElementProfile = document.getElementById("formProfile");
const nameInput = document.getElementById("nameInput");
const jobInput = document.getElementById("jobInput");
const addButton = document.getElementById("addButton");
const popupAddPlace = document.getElementById("popupAddPlace");
const closeButtonAdd = document.getElementById("closeButtonAdd");
const formElementAddPlace = document.getElementById("formAddPlace");
const placeNameInput = document.getElementById("placeNameInput");
const placeLinkInput = document.getElementById("placeLinkInput");
const popupImg = document.getElementById("popupImg");
const closeButtonImg = document.getElementById("closeButtonImg");
const popupAddPlaceForm = popupAddPlace.querySelector(".popup__form")

const nameElement = document.getElementById("name");
const jobElement = document.getElementById("job");

const cardsContainer = document.querySelector(".cards");
const cardsTemplate = document.querySelector("#cards").content;


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

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
    container.prepend(cardElement);
}


function renderDefaultCards() {
    initialCards.forEach(function (cardData) {
        addCard(cardsContainer, createCard(cardData));
    });
}

renderDefaultCards();

function openPopup(popup) {
    popup.classList.add("popup_opened");
}

function closePopup(popup) {
    popup.classList.remove("popup_opened")
}

function openPopupProfile() {
    initForm();
    openPopup(popupProfile);
}

function openPopupImg(imgSrc, imgName) {
    popupImg.querySelector(".popup__img").src = imgSrc;
    popupImg.querySelector(".popup__img").alt = imgName;
    popupImg.querySelector(".popup__text").textContent = imgName;
    openPopup(popupImg);
}

//сброс input-ов в первоначальное состояние
function initForm() {
    nameInput.value = nameElement.textContent;
    jobInput.value = jobElement.textContent;
}

function formSubmitHandlerProfile(evt) {
    evt.preventDefault();
    nameElement.textContent = nameInput.value;
    jobElement.textContent = jobInput.value;
    closePopup(popupProfile);
}

function formSubmitHandlerAddPlace(evt) {
    evt.preventDefault();
    const newCardAdd = {
        name: placeNameInput.value,
        link: placeLinkInput.value
    };
    addCard(cardsContainer, createCard(newCardAdd));
    popupAddPlaceForm.reset();
    closePopup(popupAddPlace);
}

editButton.addEventListener("click", openPopupProfile);
closeButtonProfile.addEventListener("click", () => closePopup(popupProfile));
addButton.addEventListener("click", () => openPopup(popupAddPlace));
closeButtonAdd.addEventListener("click", () => closePopup(popupAddPlace));
closeButtonImg.addEventListener("click", () => closePopup(popupImg));
formElementProfile.addEventListener("submit", formSubmitHandlerProfile);
formElementAddPlace.addEventListener("submit", formSubmitHandlerAddPlace);







