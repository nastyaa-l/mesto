export class UserInfo{
  constructor(nameSelector, subSelector){
    this._profileName = document.querySelector(nameSelector);
    this._profileSub = document.querySelector(subSelector);
  }

// объект с данными пользователя
  getUserInfo() {
    return {
      profileName: this._profileName.textContent,
      profileSub: this._profileSub.textContent
    }
  }

// добавление новых данных профиля на страницу
  setUserInfo(info) {
    this._profileName.textContent = info.profileName;
    this._profileSub.textContent = info.profileSub;
  }
}
