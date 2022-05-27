const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}Error`);
    inputElement.classList.add("popup__input_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}Error`)
    inputElement.classList.remove("popup__input_error");
    errorElement.classList.remove("popup__input-error_active");
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const setSubmitButtonState = (formElement, showSubmit) => {
    const buttonElement = formElement.querySelector(".button__submit");
    if (showSubmit) {
        buttonElement.classList.remove("button_inactive");
    } else {
        buttonElement.classList.add("button_inactive");
    }
}

const updateSubmitButtonState = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
    const buttonElement = formElement.querySelector(".button__submit");

    if (hasInvalidInput(inputList)) {
        setSubmitButtonState(formElement, false);
    } else {
        setSubmitButtonState(formElement, true);
    }
}

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            updateSubmitButtonState(formElement);
        });
    });
};

const enableValidation = (data) => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
            setSubmitButtonState(formElement, false);
        });
        setEventListeners(formElement);
        updateSubmitButtonState(formElement);
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button__submit',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_active'
});