export class UserInfo{
  constructor(nameSelector, subSelector, avatarSelector){
    this._profileName = document.querySelector(nameSelector);
    this._profileSub = document.querySelector(subSelector);
    this._profileAvatar = document.querySelector(avatarSelector)
  }

// объект с данными пользователя
  getUserInfo() {
    return {
      profileName: this._profileName.textContent,
      profileSub: this._profileSub.textContent,
      profileUrl: this._profileAvatar.url
    }
  }

// добавление новых данных профиля на страницу
  setUserInfo(name, sub) {
    this._profileName.textContent = name;
    this._profileSub.textContent = sub;
  }

  setAvatar(link) {
    this._profileAvatar.src = link;
  }
}
