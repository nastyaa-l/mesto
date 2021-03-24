// класс АПИ
export class Api {
  constructor(config){
    this._url = config.url;
    this._headers = config.headers;
  }

 // получение информации пользователя с сервера
  getDatas(){
    return fetch(this._url, {
      headers: this._headers,
    })
    .then (res => {
      if(res.ok){
         return res.json();
      }
      return Promise.reject(new Error ('Произошла ошибка со статус-кодом ' + res.status))
    })
    .catch(err => Promise.reject(err));
  }

  // обновление данных пользователя на сервере
  patchDatas(data){
    return fetch(this._url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.profileName,
        about: data.profileSub,
      })
    })
    .then (res => {
      if(res.ok){
       return res.json();
      }
      return Promise.reject(new Error ('Произошла ошибка со статус-кодом ' + res.status))
    })
    .catch(err => Promise.reject(err));
  }

  // добавление новой карточки на сервер
  postCards(data){
    return fetch(this._url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then (res => {
      if(res.ok){
       return res.json();
      }
      return Promise.reject(new Error ('Произошла ошибка со статус-кодом ' + res.status))
    })
    .catch(err => Promise.reject(err));
  }

  // удаление
  deleteDatas(id){
    return fetch(this._url + '/' + id, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then (res => {
      if(res.ok){
       return res.json();
      }
      return Promise.reject(new Error ('Произошла ошибка со статус-кодом ' + res.status))
    })
    .catch(err => Promise.reject(err));
  }

  // постановка лайка
  putDatas(id){
    return fetch(this._url + '/likes/' + id, {
      method: 'PUT',
      headers: this._headers,
    })
    .then (res => {
      if(res.ok){
       return res.json();
      }
      return Promise.reject(new Error ('Произошла ошибка со статус-кодом ' + res.status))
    })
    .catch(err => Promise.reject(err));
  }

   // обновление аватара
   patchAvatar(avatar){
    return fetch(this._url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
    .then (res => {
      if(res.ok){
       return res.json();
      }
      return Promise.reject(new Error ('Произошла ошибка со статус-кодом ' + res.status))
    })
    .catch(err => Promise.reject(err));
  }
}
