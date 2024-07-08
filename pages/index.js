import Card from "../components/card.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const card = new Card(cardData);

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileCardModal = document.querySelector("#profile-card-modal");
const profileEditModal = document.querySelector("#profile-edit-modal");
const previewImageModal = document.querySelector("#preview-modal-image");
const previewPhoto = document.querySelector("#modal-image-preview");
const titlePreview = document.querySelector("#modal-title-preview");

const profileModalCloseButton = profileEditModal.querySelector(
  "#modal-close-button"
);

const addCardModalCloseButton = profileCardModal.querySelector(
  "#modal-close-button"
);

const previewCloseButton = previewImageModal.querySelector(
  "#preview-close-button"
);

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector(".modal__input");
const profileDescriptionInput = document.querySelector(
  ".modal__input:last-of-type"
);
const profileEditForm = profileEditModal.querySelector("#editProfileForm");
const addCardForm = profileCardModal.querySelector("#newCardForm");
const cardListEl = document.querySelector(".cards__list");

const cardTitleInput = addCardForm.querySelector(".modal__input_type_title");
const cardUrlInput = addCardForm.querySelector(".modal__input_type_url");

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscapeKeyPress);
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeKeyPress);
}

// function renderCard(cardData, cardListEl) {
//   const cardElement = getCardElement(cardData);
//   cardListEl.prepend(cardElement);
// }

// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageEl = cardElement.querySelector(".card__photo");
//   const cardTitleEl = cardElement.querySelector(".card__title");
//   const likeButton = cardElement.querySelector(".card__like-button");
//   const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

// cardImageEl.addEventListener("click", () => {
//   previewPhoto.src = cardData.link;
//   titlePreview.textContent = cardData.name;
//   previewPhoto.alt = cardData.name;
//   openModal(previewImageModal);
// });

// cardDeleteBtn.addEventListener("click", () => {
//   cardElement.remove();
// });

// likeButton.addEventListener("click", () => {
//   likeButton.classList.toggle("card__like-button_active");
// });

// cardTitleEl.textContent = cardData.name;
// cardImageEl.src = cardData.link;
// cardImageEl.alt = cardData.name;

// return cardElement;
// }

function handleEscapeKeyPress(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function addClickOutsideToClose(modal) {
  modal.addEventListener("", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  addCardForm.reset();
  closeModal(profileCardModal);
}

previewCloseButton.addEventListener("click", () =>
  closeModal(previewImageModal)
);

profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

addNewCardButton.addEventListener("click", () => openModal(profileCardModal));

addCardModalCloseButton.addEventListener("click", () =>
  closeModal(profileCardModal)
);

// initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
