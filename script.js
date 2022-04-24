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

let popup = document.getElementById("popup");
let editButton = document.getElementById("editButton");
let closeButton = document.getElementById("closeButton");
let formElement = document.getElementById("form");
let nameInput = document.getElementById("nameInput");
let jobInput = document.getElementById("jobInput");

let nameElement = document.querySelector("#name");
let jobElement = document.querySelector("#job");

function openPopup() {
    popup.classList.add("popup_opened");
}

function closePopup() {
    popup.classList.remove("popup_opened");
}
//сброс input-ов в первоначальное состояние
function initForm() {
    let name = nameElement.textContent;
    let job = jobElement.textContent;
    nameInput.value = name;
    jobInput.value = job;
}

editButton.addEventListener("click", openPopup);

closeButton.addEventListener("click", function () {
    closePopup();
    initForm();
});

function formSubmitHandler(evt) {
    evt.preventDefault();
    let name = nameInput.value;
    let job = jobInput.value;
    nameElement.textContent = name;
    jobElement.textContent = job;
    closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);


