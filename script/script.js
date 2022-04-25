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
    initForm();
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

closeButton.addEventListener("click", function () {
    closePopup();
});

function formSubmitHandler(evt) {
    evt.preventDefault();
    let name = nameInput.value;
    let job = jobInput.value;
    nameElement.textContent = name;
    jobElement.textContent = job;
    closePopup();
}
editButton.addEventListener("click", openPopup);
formElement.addEventListener("submit", formSubmitHandler);


