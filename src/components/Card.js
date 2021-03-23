import {deleteCard} from "../pages/index.js";

// класс создания карточек
export class Card {
  constructor (data, templateSelector, isBin, api, handleCardClick){
    this._name = data.name;
    this._link = data.link;
    this._like = data.likes.length;
    this._templateSelector = templateSelector;
    this._isBin = isBin;
    this._handleCardClick = handleCardClick;
    this._data = data;
    this._api = api;
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
    if (this._isBin){
      this._element.querySelector('.element__bin').classList.add('element__bin_active');
    }
    return this._element;
  }

  //удаление карточек
  _deleteCard() {
    this._api.deleteDatas(this._element.id)
    .then(() => {
      this._element.remove();
    })
    .catch( err => {
      console.log('ошибка при удалении', err)
    })
  };

  //добавление лайков карточке
  _likeCard(event) {
    console.log(this._data)
    if (event.target.classList.contains('element__like_black')){
      this._api.deleteDatas(this._data._id)
      .then(() => event.target.classList.remove('element__like_black'))
      .then(() => this.like -= 1)
      .catch ((err) => {
        console.log ('ошибка при удалении', err)
      })
    }

    else {
      this._api.putDatas()
      event.target.classList.add('element__like_black');
    }
  }

  //обработчики
  _setEvenetListeners() {
    this._element.querySelector('.element__like').addEventListener('click', (event) => {
      this._likeCard(event);
     // event.target.classList.toggle('element__like_black');
    });
    this._element.querySelector('.element__bin').addEventListener('click', () => {
      deleteCard.open();
    });
    this._element.querySelector('.element__picture').addEventListener('click', ()=> {
      this._handleCardClick(this._link, this._name);
    });
  }
}


