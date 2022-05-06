let popupProfile = document.getElementById("popupProfile");
let editButton = document.getElementById("editButton");
let closeButtonProfile = document.getElementById("closeButtonProfile");
let formElementProfile = document.getElementById("formProfile");
let nameInput = document.getElementById("nameInput");
let jobInput = document.getElementById("jobInput");
let addButton = document.getElementById("addButton");
let popupAddPlace = document.getElementById("popupAddPlace");
let closeButtonAdd = document.getElementById("closeButtonAdd");
let formElementAddPlace = document.getElementById("formAddPlace");
let placeNameInput = document.getElementById("placeNameInput");
let placeLinkInput = document.getElementById("placeLinkInput");

let nameElement = document.getElementById("name");
let jobElement = document.getElementById("job");



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
const cardsContainer = document.querySelector(".cards");
const cardsTemplate = document.querySelector("#cards").content;



function addNewCard() {
  initialCards.forEach(newCard);
}

function newCard({ name, link }) {
  const cardElement = cardsTemplate
    .querySelector(".card")
    .cloneNode(true);
  cardElement.querySelector(".card__name").textContent = name;
  cardElement.querySelector(".card__img").src = link;
  cardElement.querySelector(".card__img").alt = name;

 cardsContainer.prepend(cardElement);
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
    newCard(newCardAdd)
    closePopupAddPlace();
}


let likeButtons = document.querySelectorAll(".card__like-button");

function clickLike(button) {
button.classList.toggle("card__like-button_active");
}

for (let i = 0; i < likeButtons.length; i++) {
likeButtons[i].addEventListener("click", function (event) {
let button = event.target;
clickLike(button);
});
}

editButton.addEventListener("click", openPopupProfile);
closeButtonProfile.addEventListener("click", closePopupProfile);
formElementProfile.addEventListener("submit", formSubmitHandlerProfile);
addButton.addEventListener("click", openPopupAddPlace);
closeButtonAdd.addEventListener("click",closePopupAddPlace);
formElementAddPlace.addEventListener("submit", formSubmitHandlerAddPlace)




