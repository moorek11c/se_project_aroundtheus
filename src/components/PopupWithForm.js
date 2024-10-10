import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector(".modal__form");

    if (!this._popupForm) {
      console.error(`Form not found in popup with selector: ${popupSelector}`);
      return;
    }
    this._submitBtn = this._popupForm.querySelector(
      ".modal__save-button, .confirm__modal-button"
    );
    if (!this._submitBtn) {
      console.error(
        `Submit button not found in form with selector: ${popupSelector}`
      );
      return;
    }

    this._submitBtnText = this._submitBtn.textContent;
    this._inputList = Array.from(
      this._popupForm.querySelectorAll(".modal__input")
    );
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (this._submitBtn) {
      if (isLoading) {
        this._submitBtn.textContent = loadingText;
        this._submitBtn.disabled = true;
      } else {
        this._submitBtn.textContent = this._submitBtnText;
        this._submitBtn.disabled = false;
      }
    }
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setInputsValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
