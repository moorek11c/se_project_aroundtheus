// import { Settings } from "../Utils/Constants.js";

class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formElement;
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._setEventListeners();
    this._toggleButtonState();
  }

  _showError(inputEl) {
    const errorElement = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorElement.textContent = inputEl.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideError(inputEl) {
    const errorElement = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._inputErrorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showError(inputEl);
    } else {
      this._hideError(inputEl);
    }
  }

  _toggleButtonState() {
    const isInputInvalid = this._hasInvalidInput(this._inputEls);
    const isFormEmpty = this._inputEls.every(
      (inputEl) => inputEl.value.trim() === ""
    );

    if (isInputInvalid || isFormEmpty) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputEl) => !inputEl.validity.valid);
  }

  _setEventListeners() {
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputEls.forEach((inputEl) => {
      this._hideError(inputEl);
    });
    this.disableButton();
  }

  enableValidation() {
    this._setEventListeners();
  }

  reset() {
    this._form.reset();
  }
}

export default FormValidator;
