export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._nameSelector = document.querySelector(".profile__title");
    this._jobSelector = document.querySelector(".profile__description");
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      job: this._jobSelector.textContent,
    };
  }

  setUserInfo(name, job) {
    this._nameSelector.textContent = name;
    this._jobSelector.textContent = job;
  }
}
