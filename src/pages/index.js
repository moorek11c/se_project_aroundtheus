import Card from "../components/card.js";

import FormValidator from "../components/FormValidator.js";

import "../pages/index.css";

import Section from "../components/Section.js";

import PopupWithForm from "../components/PopupWithForm.js";

import { Settings, cardData } from "../Utils/Constants.js";

import PopupWithImage from "../components/PopupWithImage.js";

import UserInfo from "../components/UserInfo.js";

/***********
 * Profile *
 ***********/

// Selectors

const profileEditButton = document.querySelector("#profile-edit-button");
const profileCardModal = document.querySelector("#profile-card-modal");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector("#editProfileForm");

/********
 * Card *
 ********/

// Selectors

const addNewCardButton = document.querySelector(".profile__add-button");
const addCardForm = profileCardModal.querySelector("#newCardForm");
const cardSelector = "#card-template";
const cardListEl = document.querySelector(".cards__list");

/*****************
 * Preview Image *
 *****************/

const popupImage = new PopupWithImage("#preview-modal-image");
popupImage.setEventListeners();

function handleImageClick(name, link) {
  popupImage.open(name, link);
}

function createCard(data) {
  const card = new Card(data, cardSelector, handleImageClick);
  return card.getView();
}

// add Card
addNewCardButton.addEventListener("click", (evt) => {
  addCardPopup.open();
});

const addCardPopup = new PopupWithForm(
  "#profile-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

function handleAddCardFormSubmit(formValues) {
  const element = createCard(formValues);
  section.addItem(element);
  addCardPopup.close();
}

// profile

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
  userInfo.setUserInfo(formValues.name, formValues.job);
  profilePopup.close();
}

/************
 * userInfo *
 ************/

const userInfo = new UserInfo(".profile__title", ".profile__description");

// section

const section = new Section(
  {
    items: cardData,
    renderer: (cardData) => {
      const card = createCard(cardData);
      section.addItem(card);
    },
  },
  ".cards__list"
);
section.renderItems();

// Form validation

const editFormValidator = new FormValidator(Settings, profileEditForm);
const addFormValidator = new FormValidator(Settings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
