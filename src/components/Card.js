import {deleteCard, api} from "../pages/index.js";


// класс создания карточек
export class Card {
  constructor (data, templateSelector, isBin, api, handleCardClick, popup){
    this._name = data.name;
    this._link = data.link;
    this._like = data.likes.length;
    this._templateSelector = templateSelector;
    this._isBin = isBin;
    this._handleCardClick = handleCardClick;
    this._data = data;
    this._api = api;
    this._popup = popup;
  }

  // метод возвращения разметки карточки
  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardElement;
  }

  // подготовка карточки к публикации
  generateCard() {
    this._element = this._getTemplate();
    this._setEvenetListeners();
    this._elementPicture = this._element.querySelector('.element__picture');
    this._elementPicture.src = this._link;
    this._elementPicture.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._elementLike = this._element.querySelector('.element__like-num');
    this._elementLike.textContent = this._like;
    this._getBins(this._element);
    return this._element;
  }

  // включение корзин для карточек своего профиля
  _getBins(elem){
    api.getDatas()
    .then (data => {
      if (this._isBin || data._id === this._data.owner._id){
        elem.querySelector('.element__bin').classList.add('element__bin_active');
      }})
    .catch (err => console.log ('ошибка в получении данных', err))
  }

  //удаление карточек
  _deleteCard() {
    this._api.deleteDatas(this._data._id)
    .then(() => {
      this._element.remove();
    })
    .then(()=>{
      this._popup.close();
    })
    .catch( err => {
      console.log('ошибка при удалении', err)
    })
  };

  //добавление лайков карточке
  _likeCard(event) {
    const isLiked = event.target.classList.contains('element__like_black');
    console.log(this._api)
    if (isLiked){
      this._api.deleteDatas(this._data._id)
      .then(() => event.target.classList.remove('element__like_black'))
      .then(() => this.like -= 1)
      .catch ((err) => {
        console.log ('ошибка при удалении', err)
      })
    }

    else {
      event.target.classList.add('element__like_black')
      this._api.putDatas(this._data._id);
      console.log(this._data._id)

    }
  }

  //обработчики
  _setEvenetListeners() {
    this._element.querySelector('.element__like').addEventListener('click', (event) => {
      this._likeCard(event);
     // event.target.classList.toggle('element__like_black');
    });
    this._element.querySelector('.element__bin').addEventListener('click', () => {
      this._popup.open();
      this._popup._popupElement.querySelector('.popup__submit_confirm').addEventListener('click' , () =>{
        this._deleteCard();
      })
    });
    this._element.querySelector('.element__picture').addEventListener('click', ()=> {
      this._handleCardClick(this._link, this._name);
    });
  }
}


