import Card from "../components/card.js";

import FormValidator from "../components/FormValidator.js";

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
const profileTitleInput = profileEditModal.querySelector(
  ".modal__input_type_name"
);
const profileDescriptionInput = profileEditModal.querySelector(
  ".modal__input_type_description"
);
const profileEditForm = profileEditModal.querySelector("#editProfileForm");
const addCardForm = profileCardModal.querySelector("#newCardForm");
const cardListEl = document.querySelector(".cards__list");

const cardTitleInput = addCardForm.querySelector(".modal__input_type_title");
const cardUrlInput = addCardForm.querySelector(".modal__input_type_url");
const cardSelector = "#card-template";

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscapeKeyPress);
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeKeyPress);
}

function createCard(data) {
  const card = new Card(data, cardSelector, handleImageClick);
  return card.getView();
}

function renderCard(cardData, cardListEl) {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
}

const Settings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
const editFormValidator = new FormValidator(Settings, profileEditForm);
const addFormValidator = new FormValidator(Settings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

function handleEscapeKeyPress(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function addClickOutsideToClose(modal) {
  addEventListener("mousedown", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
}

addClickOutsideToClose(profileEditModal);
addClickOutsideToClose(profileCardModal);
addClickOutsideToClose(previewImageModal);

function handleImageClick(data) {
  previewPhoto.src = data.link;
  titlePreview.textContent = data.name;
  previewPhoto.alt = data.name;
  openModal(previewImageModal);
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
  evt.target.reset();
  addFormValidator.resetValidation();
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

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
