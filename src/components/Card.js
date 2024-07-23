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
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._isLiked = data.isLiked;
    this._handleDeleteConfirm = handleDeleteConfirm;
    this._handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this)
        .then((isLiked) => {
          this._isLiked = isLiked;
          this.renderLikes(this._isLiked);
        })
        .catch((err) => console.error(err));
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

  renderLikes(isLiked) {
    this._isLiked = isLiked;
    const likeButton = this._cardElement.querySelector(".card__like-button");
    if (this._isLiked) {
      likeButton.classList.add("card__like-button_active");
    } else {
      likeButton.classList.remove("card__like-button_active");
    }
  }

  getLikes() {
    return this._isLiked;
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null; // Helps in garbage collection
  }

  _handleLikeClick() {}

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
    this.renderLikes(this._isLiked);
    this._setEventListeners();

    return this._cardElement;
  }
  getId() {
    return this._id;
  }
}
