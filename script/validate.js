const showInputError = (selectors, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}Error`);
    inputElement.classList.add(selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);
};

const hideInputError = (selectors, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}Error`)
    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.classList.remove(selectors.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (selectors, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(selectors, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(selectors, formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const setSubmitButtonState = (selectors, formElement, showSubmit) => {
    const buttonElement = formElement.querySelector(selectors.inactiveButtonClass);
    buttonElement.disabled = !showSubmit;
}

const updateSubmitButtonState = (selectors, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);

    if (hasInvalidInput(inputList)) {
        setSubmitButtonState(selectors, formElement, false);
    } else {
        setSubmitButtonState(selectors, formElement, true);
    }
}

const setEventListeners = (selectors, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(selectors, formElement, inputElement);
            updateSubmitButtonState(selectors, formElement);
        });
    });
};

const enableValidation = (selectors) => {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            setSubmitButtonState(selectors, formElement, false);
        });
        setEventListeners(selectors, formElement);
        updateSubmitButtonState(selectors, formElement);
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button__submit',
    inactiveButtonClass: '.button_inactive',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_active'
});