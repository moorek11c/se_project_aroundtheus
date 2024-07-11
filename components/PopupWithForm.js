import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._modalForm = this._popup.querySelector(".modal__add-form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._modalForm.reset();
    super.close();
    console.log("Form has been reset");
  }
}
