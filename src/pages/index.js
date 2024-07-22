import Card from "../components/Card.js";

import FormValidator from "../components/FormValidator.js";

import "../pages/index.css";

import Section from "../components/Section.js";

import PopupWithForm from "../components/PopupWithForm.js";

import { Settings } from "../Utils/Constants.js";

import PopupWithImage from "../components/PopupWithImage.js";

import UserInfo from "../components/UserInfo.js";

import Api from "../components/Api.js";

// API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "9a2a6717-e342-435d-a8a9-13aa291b9ad5",
    "Content-Type": "application/json",
  },
});

/***********
 * Profile *
 ***********/

// Selectors

const profileEditButton = document.querySelector("#profile-edit-button");
const profileCardModal = document.querySelector("#profile-card-modal");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector("#editProfileForm");

const userInfo = new UserInfo(".profile__title", ".profile__description");

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData.name, userData.about);
  })
  .catch((err) => {
    console.error("Error fetching user info:", err);
  });

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profilePopup.setInputsValues(currentUserInfo);
  profilePopup.open();
});

const profilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);
profilePopup.setEventListeners();

function handleProfileFormSubmit(formValues) {
  console.log("Submitting form with values:", formValues); // Log the form values
  api
    .editUserInfo(formValues)
    .then((editUserInfo) => {
      console.log("Profile updated:", editUserInfo); // Log the updated user info
      userInfo.setUserInfo(editUserInfo.name, editUserInfo.about);
      profilePopup.close();
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
    });
}
/********
 * Card *
 ********/
// deleteConfirmBtn = document.querySelector("#confirm-delete-button");

// Selectors

const addNewCardButton = document.querySelector(".profile__add-button");
const addCardForm = profileCardModal.querySelector("#newCardForm");
const cardSelector = "#card-template";
const cardListEl = document.querySelector(".cards__list");

/***********************
 * delete card confirm *
 ***********************/
const deleteCardPopup = new PopupWithForm(
  "#confirmation-modal",
  handleDeleteConfirm
);
deleteCardPopup.setEventListeners();

let currentCardToDelete = null;

function handleDeleteClick(card) {
  currentCardToDelete = card;
  deleteCardPopup.open();
}

function handleDeleteConfirm() {
  // Simulate a successful server call with a promise
  api
    .deleteCard(currentCardToDelete._id)
    .then(() => {
      currentCardToDelete.removeCard();
      deleteCardPopup.close();
    })
    .catch((err) => {
      console.error("Error deleting card:", err);
    });
}

/*****************
 * Preview Image *
 *****************/

const popupImage = new PopupWithImage("#preview-modal-image");
popupImage.setEventListeners();

function handleImageClick(name, link) {
  popupImage.open(name, link);
}

function createCard(data) {
  const card = new Card(
    data,
    cardSelector,
    handleImageClick,
    () => handleDeleteClick(card) // Pass the card instance to the delete handler
  );
  return card.getView();
}

const section = new Section(
  {
    items: [], // Start with an empty array, to be populated later
    renderer: (data) => {
      const cardElement = createCard(data);
      section.addItem(cardElement);
    },
  },
  ".cards__list"
);

// add Card
addNewCardButton.addEventListener("click", (evt) => {
  addCardPopup.open();
});

const addCardPopup = new PopupWithForm(
  "#profile-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

function handleAddCardFormSubmit(data) {
  api
    .postCards(data)
    .then((newCard) => {
      const cardElement = createCard(newCard);
      section.addItem(cardElement);
      addCardPopup.close();
    })
    .catch((err) => {
      console.error("Error adding new card:", err);
    });
}

// profile

/************
 * userInfo *
 ************/

function renderCards() {
  api
    .initialCards()
    .then((cards) => {
      console.log("cards fetched", cards); // Ensure this logs an array of card objects

      const section = new Section(
        {
          items: cards, // Pass the array of card objects
          renderer: (data) => {
            const cardElement = createCard(data);
            section.addItem(cardElement);
          },
        },
        ".cards__list"
      );
      section.renderItems(); // Render all items
    })
    .catch((err) => {
      console.error("Error loading initial cards:", err);
    });
}

renderCards();

// Form validation

const editFormValidator = new FormValidator(Settings, profileEditForm);
const addFormValidator = new FormValidator(Settings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
