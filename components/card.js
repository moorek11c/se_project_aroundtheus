export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });

    this._cardImageEl = this._cardElement.querySelector(".card__photo");
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteClick() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = document
      .querySelector("#card-template")
      .textContent.querySelector(".card")
      .cloneNode(true);

    this._setEventListeners();
    this._cardImageEl.src = this._link;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardImageEl.alt = this._name;

    return this._cardElement;
  }
}
