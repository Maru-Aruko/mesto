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
const popupImgElement = popupImg.querySelector(".popup__img");
const closeButtonImg = document.getElementById("closeButtonImg");

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

    cardsContainer.prepend(cardElement);
}

function addNewCard() {
    initialCards.forEach(createCard);
}

addNewCard();

function openPopupProfile() {
    popupProfile.classList.add("popup_opened");
    initForm();
}

function closePopupProfile() {
    popupProfile.classList.remove("popup_opened");
}

function openPopupAddPlace() {
    popupAddPlace.classList.add("popup_opened");
    placeNameInput.value = "";
    placeLinkInput.value = "";
}

function closePopupAddPlace() {
    popupAddPlace.classList.remove("popup_opened");
}

function openPopupImg(imgSrc, imgName) {
    popupImg.classList.add("popup_opened");
    popupImg.querySelector(".popup__img").src = imgSrc;
    popupImg.querySelector(".popup__text").textContent = imgName;
}

function closePopupImg() {
    popupImg.classList.remove("popup_opened");
}

//сброс input-ов в первоначальное состояние
function initForm() {
    let name = nameElement.textContent;
    let job = jobElement.textContent;
    nameInput.value = name;
    jobInput.value = job;
}

function formSubmitHandlerProfile(evt) {
    evt.preventDefault();
    let name = nameInput.value;
    let job = jobInput.value;
    nameElement.textContent = name;
    jobElement.textContent = job;
    closePopupProfile();
}

function formSubmitHandlerAddPlace(evt) {
    evt.preventDefault();
    const newCardAdd = {
        name: placeNameInput.value,
        link: placeLinkInput.value
    };
    createCard(newCardAdd);
    closePopupAddPlace();
}

editButton.addEventListener("click", openPopupProfile);
closeButtonProfile.addEventListener("click", closePopupProfile);
formElementProfile.addEventListener("submit", formSubmitHandlerProfile);
addButton.addEventListener("click", openPopupAddPlace);
closeButtonAdd.addEventListener("click", closePopupAddPlace);
formElementAddPlace.addEventListener("submit", formSubmitHandlerAddPlace);
closeButtonImg.addEventListener("click", closePopupImg);







