export class UserInfo{
  constructor(profileName, profileSub){
    this._profileName = profileName;
    this._profileSub = profileSub;
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
