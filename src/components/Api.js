// класс АПИ
export class Api {
  constructor(config){
    this.url = config.url;
    this.headers = config.headers;
  }

 // получение информации пользователя с сервера
  getDatas(){
    return fetch(this.url, {
      headers: this.headers,
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
    return fetch(this.url, {
      method: 'PATCH',
      headers: this.headers,
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
    return fetch(this.url, {
      method: 'POST',
      headers: this.headers,
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
}
