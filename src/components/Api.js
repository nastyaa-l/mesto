// класс АПИ
export class Api {
  constructor(config){
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if(res.ok){
      return res.json();
   }
   return Promise.reject(new Error ('Произошла ошибка со статус-кодом ' + res.status))
  }

 // получение информации пользователя с сервера
  getDatas(){
    return fetch(this._url + 'users/me', {
      headers: this._headers,
    })
    .then ( this._checkResponse)
    .catch(err => Promise.reject(err));
  }

  // получение карточек с сервера
  getCards(){
    return fetch(this._url + 'cards', {
      headers: this._headers,
    })
    .then ( this._checkResponse)
    .catch(err => Promise.reject(err));
  }

  // обновление данных пользователя на сервере
  patchDatas(data){
    return fetch(this._url + 'users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.profileName,
        about: data.profileSub,
      })
    })
    .then ( this._checkResponse)
    .catch(err => Promise.reject(err));
  }

  // добавление новой карточки на сервер
  postCards(data){
    return fetch(this._url + 'cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then ( this._checkResponse)
    .catch(err => Promise.reject(err));
  }

  // удаление
  deleteDatas(id, elem){
    return fetch(this._url + 'cards/' + id, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then ((res) => {
      if(res.ok){
        elem.closest('.element').remove();
        return res.json();
     }
     return Promise.reject(new Error ('Произошла ошибка со статус-кодом ' + res.status))
    })
    .catch(err => Promise.reject(err));
  }

  deleteLikes(id) {
    return fetch(this._url + 'cards/likes/' + id, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then ( this._checkResponse)
    .catch(err => Promise.reject(err));
  }

  // постановка лайка
  putDatas(id){
    return fetch(this._url + 'cards/likes/' + id, {
      method: 'PUT',
      headers: this._headers,
    })
    .then ( this._checkResponse)
  }

   // обновление аватара
   patchAvatar(avatar){
    return fetch(this._url + 'users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
    .then ( this._checkResponse)
    .catch(err => Promise.reject(err));
  }
}
