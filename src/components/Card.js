export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteConfirm,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked || false;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteConfirm = handleDeleteConfirm;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card");
    return cardTemplate.cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this).then((isLiked) => {
        this._isLiked = isLiked;
        this.renderLikes(this._isLiked);
      });
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteConfirm();
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  renderLikes(isLiked) {
    this._isLiked = isLiked;
    if (isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  getLikes() {
    return this._isLiked;
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImageEl = this._cardElement.querySelector(".card__photo");
    this.cardNameEl = this._cardElement.querySelector(".card__title");

    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this.cardNameEl.textContent = this._name;

    this.renderLikes(this._isLiked);
    this._setEventListeners();

    return this._cardElement;
  }

  getId() {
    return this._id;
  }
}
