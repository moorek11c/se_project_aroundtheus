export default class Popup {
  constructor({ popupSelector }) {
    this._popup = document.querySelector(".modal");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("modal_is-opened");
    document.addEventListener("keydown", this._handleEscClose);
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("modal_is-opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("modal__close-button") ||
        evt.target.classList.contains("modal_is-opened")
      ) {
        close();
      }
    });
    this._popup.addEventListener("keydown", this._handleEscClose);
  }
}

// function handleEscapeKeyPress(event) {
//     if (event.key === "Escape") {
//       const openedModal = document.querySelector(".modal_is-opened");
//       if (openedModal) {
//         closeModal(openedModal);
//       }
//     }
//   }
