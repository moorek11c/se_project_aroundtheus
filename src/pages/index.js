import Card from "../components/Card.js";

import FormValidator from "../components/FormValidator.js";

import "./index.css";

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

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector("#editProfileForm");

/*******************
 * Profile Picture *
 *******************/

const profilePictureButton = document.querySelector(".pencil-icon");
const profilePictureModal = document.querySelector("#profile-picture-modal");
const profilePictureForm = profilePictureModal.querySelector(
  "#profile-picture-form"
);
const profilePictureSaveButton = profilePictureModal.querySelector(
  "#profile-picture-save"
);

/*************
 * User Info *
 *************/

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__picture"
);

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData.name, userData.about, userData.avatar);
  })
  .catch((err) => {
    console.error("Error fetching user info:", err);
  });

/***************
 * ProfileEdit *
 ***************/
const editFormValidator = new FormValidator(Settings, profileEditForm);
editFormValidator.enableValidation();

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profilePopup.setInputsValues(currentUserInfo);
  profilePopup.open();
  editFormValidator.resetValidation();
});

/******************
 * Profile Submit *
 ******************/

function handleProfileFormSubmit(formValues) {
  profilePopup.renderLoading(true);

  api
    .editUserInfo(formValues)
    .then((editUserInfo) => {
      userInfo.setUserInfo(
        editUserInfo.name,
        editUserInfo.about,
        editUserInfo.avatar
      );

      profilePopup.close();
      profileEditForm.reset();
      editFormValidator.disableButton();
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
    })
    .finally(() => {
      profilePopup.renderLoading(false);
    });
}

const profilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);
profilePopup.setEventListeners();

/*************************
 * Profile Picture Modal *
 *************************/

const profilePictureFormValidator = new FormValidator(
  Settings,
  profilePictureForm
);
profilePictureFormValidator.enableValidation();

profilePictureButton.addEventListener("click", () => {
  profilePicturePopup.open();
  profilePictureFormValidator.resetValidation();
});

function handleAvatarFormSubmit(formValues) {
  const newProfilePictureUrl = formValues.newProfilePictureUrl;
  profilePicturePopup.renderLoading(true);

  api
    .updateProfilePicture(newProfilePictureUrl)
    .then((updatedUser) => {
      userInfo.setUserInfo(
        updatedUser.name,
        updatedUser.about,
        updatedUser.avatar
      );
      profilePicturePopup.close();
      profilePictureFormValidator.disableButton();
      profilePictureFormValidator.reset();
    })
    .catch((err) => {
      console.error("Error updating profile picture:", err);
    })
    .finally(() => {
      profilePicturePopup.renderLoading(false);
    });
}

const profilePicturePopup = new PopupWithForm(
  "#profile-picture-modal",
  handleAvatarFormSubmit
);
profilePicturePopup.setEventListeners();

/********
 * Card *
 ********/

const profileCardModal = document.querySelector("#profile-card-modal");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardForm = profileCardModal.querySelector("#newCardForm");
const addCardSubmitBtn = profileCardModal.querySelector("#card-save");
const cardSelector = "#card-template";

/****************
 * Add New Card *
 ****************/
const addFormValidator = new FormValidator(Settings, addCardForm);
addFormValidator.enableValidation();

addNewCardButton.addEventListener("click", (evt) => {
  addCardPopup.open();
  addFormValidator.resetValidation();
});

const addCardPopup = new PopupWithForm(
  "#profile-card-modal",
  handleAddCardFormSubmit
);
addCardPopup.setEventListeners();

function handleAddCardFormSubmit(data) {
  addCardPopup.renderLoading(true);

  api
    .postCards(data)
    .then((newCard) => {
      const cardElement = createCard(newCard);
      section.addItem(cardElement);
      addCardPopup.close();
      addFormValidator.disableButton();
      addFormValidator.reset();
    })
    .catch((err) => {
      console.error("Error adding new card:", err);
    })
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
}

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
  deleteCardPopup.renderLoading(true);
  api
    .deleteCard(currentCardToDelete.getId())
    .then(() => {
      currentCardToDelete.removeCard();
      deleteCardPopup.close();
    })
    .catch((err) => {
      console.error("Error deleting card:", err);
      hideSavingText(deleteCardSaveButton);
    })
    .finally(() => {
      deleteCardPopup.renderLoading(false);
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
    () => handleDeleteClick(card),
    handleLikeClick
  );
  return card.getView();
}
/*********
 * Likes *
 *********/

function handleLikeClick(card) {
  const isLiked = card.getLikes();
  if (isLiked) {
    return api
      .unlikeCard(card.getId())
      .then((res) => {
        card.renderLikes(false);
        return false;
      })
      .catch((err) => {
        console.error("Error unliking card:", err);
        throw err;
      });
  } else {
    return api
      .likeCard(card.getId())
      .then((res) => {
        card.renderLikes(true);
        return true;
      })
      .catch((err) => {
        console.error("Error liking card:", err);
        throw err;
      });
  }
}

const section = new Section(
  {
    items: [],
    renderer: (data) => {
      const cardElement = createCard(data);
      section.addItem(cardElement);
    },
  },
  ".cards__list"
);

/*****************
 * Initial Cards *
 *****************/

function renderCards() {
  api
    .initialCards()
    .then((cards) => {
      const section = new Section(
        {
          items: cards,
          renderer: (data) => {
            const cardElement = createCard(data);
            section.addItem(cardElement);
          },
        },
        ".cards__list"
      );
      section.renderItems();
    })
    .catch((err) => {
      console.error("Error loading initial cards:", err);
    });
}

renderCards();
