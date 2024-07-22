export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteConfirm) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    // this.handleDeleteClick = handleDeleteClick;
    this._handleDeleteConfirm = handleDeleteConfirm;
  }

  _setEventListeners() {
    // likebutton
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    // deletebutton
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteConfirm();
    });

    // imageclick

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null; // Helps in garbage collection
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardImageEl = this._cardElement.querySelector(".card__photo");
    this.cardNameEl = this._cardElement.querySelector(".card__title");
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._alt;
    this.cardNameEl.textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
