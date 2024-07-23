export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    console.log("avatar", this._avatarElement);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement ? this._avatarElement.src : null,
    };
  }

  setUserInfo(name, about, avatar) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    if (avatar && this._avatarElement) {
      this._avatarElement.src = avatar; // Set avatar if provided
    }
  }
}
