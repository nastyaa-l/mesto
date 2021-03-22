import {deleteCard} from "../pages/index.js";

// класс создания карточек
export class Card {
  constructor (data, templateSelector, handleCardClick){
    this._name = data.name;
    this._link = data.link;
    this._like = data.likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    return this._element;
  }

  //удаление карточек
  _deleteCard() {
    this._element.remove();
  };

  //обработчики
  _setEvenetListeners() {
    this._element.querySelector('.element__like').addEventListener('click', (event) => {
      event.target.classList.toggle('element__like_black');
    });
    this._element.querySelector('.element__bin').addEventListener('click', () => {
      deleteCard.open();
    });
    this._element.querySelector('.element__picture').addEventListener('click', ()=> {
     this._handleCardClick(this._link, this._name);
    });
  }
}


