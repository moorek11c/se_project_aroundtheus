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

// Show and hide saving overlay
function showSavingText(button) {
  button.textContent = "Saving...";
  button.disabled = true;
}

function hideSavingText(button) {
  button.textContent = "Save";
  button.disabled = true;
}

/***********
 * Profile *
 ***********/

// Selectors

const profileEditButton = document.querySelector("#profile-edit-button");
const profileCardModal = document.querySelector("#profile-card-modal");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector("#editProfileForm");
const saveButton = document.querySelector(".modal__save-button");

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
  showSavingText(saveButton);
  console.log("Submitting form with values:", formValues); // Log the form values
  api
    .editUserInfo(formValues)
    .then((editUserInfo) => {
      console.log("Profile updated:", editUserInfo); // Log the updated user info
      userInfo.setUserInfo(
        editUserInfo.name,
        editUserInfo.about,
        editUserInfo.avatar
      );

      profilePopup.close();
      hideSavingText(saveButton);
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
    });
}

/*************************
 * Profile Picture Modal *
 *************************/

const profilePictureButton = document.querySelector(".pencil-icon");

profilePictureButton.addEventListener("click", () => {
  profilePicturePopup.open();
});

const profilePicturePopup = new PopupWithForm(
  "#profile-picture-modal",
  handleProfilePictureFormSubmit
);
profilePicturePopup.setEventListeners();
// Selectors for profile picture form
const profilePictureForm = document.querySelector(
  "#profile-picture-modal form"
);
const profilePictureInput = profilePictureForm.querySelector(
  'input[name="newProfilePictureUrl"]'
);
const profilePictureSaveButton = profilePictureForm.querySelector(
  'button[type="submit"]'
);

// Disable save button if form is empty
profilePictureInput.addEventListener("input", () => {
  if (profilePictureInput.value.trim() === "") {
    profilePictureSaveButton.disabled = true;
  } else {
    profilePictureSaveButton.disabled = false;
  }
});

// Initial check to disable button if input is empty
if (profilePictureInput.value.trim() === "") {
  profilePictureSaveButton.disabled = true;
}

function handleProfilePictureFormSubmit(formValues) {
  showSavingText(profilePictureSaveButton); // Show saving text
  const newProfilePictureUrl = formValues.newProfilePictureUrl;
  console.log("New profile picture URL:", newProfilePictureUrl); // Log the new URL

  api
    .updateProfilePicture(newProfilePictureUrl)
    .then((updatedUser) => {
      console.log("Profile picture updated response:", updatedUser);
      userInfo.setUserInfo(
        updatedUser.name,
        updatedUser.about,
        updatedUser.avatar
      );
      profilePicturePopup.close();
      hideSavingText(profilePictureSaveButton); // Hide saving text
    })
    .catch((err) => {
      console.error("Error updating profile picture:", err);
      hideSavingText(profilePictureSaveButton); // Hide saving text on error
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
  const deleteCardSaveButton = document.querySelector(
    "#confirmation-modal button[type='submit']"
  ); // Get the submit button
  showSavingText(deleteCardSaveButton); // Show saving text
  api
    .deleteCard(currentCardToDelete.getId())
    .then(() => {
      currentCardToDelete.removeCard();
      deleteCardPopup.close();
      hideSavingText(deleteCardSaveButton);
    })
    .catch((err) => {
      console.error("Error deleting card:", err);
      hideSavingText(deleteCardSaveButton);
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
    handleLikeClick // Pass the card instance to the delete handler
  );
  return card.getView();
}
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
  const addCardSaveButton = document.querySelector(
    "#profile-card-modal button[type='submit']"
  ); // Get the submit button
  showSavingText(addCardSaveButton); // Show saving text

  showSavingText(saveButton);
  api
    .postCards(data)
    .then((newCard) => {
      const cardElement = createCard(newCard);
      section.addItem(cardElement);
      addCardPopup.close();
      hideSavingText(addCardSaveButton);
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
