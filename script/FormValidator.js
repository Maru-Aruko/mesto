export default class FormValidator {
    constructor({
                    inputSelector,
                    submitButtonSelector,
                    inactiveButtonClass,
                    inputErrorClass,
                    errorClass
                },
                formElement
    ) {
        this._formElement = formElement;
        this._inputSelector = inputSelector;
        this._submitButtonSelector = submitButtonSelector;
        this._inactiveButtonClass = inactiveButtonClass;
        this._inputErrorClass = inputErrorClass;
        this._errorClass = errorClass;
        this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = formElement.querySelector(this._inactiveButtonClass);
    }


    _showInputError(inputElement) {
        const _errorElement = this._formElement.querySelector(`.${inputElement.id}Error`);
        inputElement.classList.add(this._inputErrorClass);
        _errorElement.textContent = inputElement.validationMessage;
        _errorElement.classList.add(this._errorClass);
    };


    _hideInputError(inputElement) {
        const _errorElement = this._formElement.querySelector(`.${inputElement.id}Error`);
        inputElement.classList.remove(this._inputErrorClass);
        _errorElement.classList.remove(this._errorClass);
        _errorElement.textContent = '';
    };


    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };


    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };


    _setSubmitButtonState = (formElement, showSubmit) => {
        this._buttonElement.disabled = !showSubmit;
    }


    _updateSubmitButtonState = (formElement) => {
        if (this._hasInvalidInput(this._inputList)) {
            this._setSubmitButtonState(formElement, false);
        } else {
            this._setSubmitButtonState(formElement, true);
        }
    }


    _setEventListeners(formElement) {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._updateSubmitButtonState(formElement);
            });
        });
    };

    resetErrors() {
        this._inputList.forEach((input) => {
           this._hideInputError(input);
        });
    }

    enableValidation = () => {
        this._formElement.addEventListener('submit', function () {
            this._setSubmitButtonState(false);
        }.bind(this));
        this._setEventListeners();
        this._updateSubmitButtonState();
    };
}