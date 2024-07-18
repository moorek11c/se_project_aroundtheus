import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupImage = this._popupElement.querySelector(
      ".modal__preview-image"
    );
    this._popupTitle = this._popupElement.querySelector(
      ".modal__preview-title"
    );
  }

  open(data) {
    this._popupImage.src = data.link;
    this._popupTitle.textContent = data.name;
    this._popupImage.alt = data.name;
    super.open();
  }
}
