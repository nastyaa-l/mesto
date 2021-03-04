import {elementPicture, elementCaption, popupImage, openPopup, handleOpenImage} from "../src/index.js"

// класс создания карточек
export class Card {
  constructor (data, templateSelector){
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
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
      this._deleteCard();
    });
    this._element.querySelector('.element__picture').addEventListener('click', ()=> {
      handleOpenImage(this._link, this._name);
    });
  }
}


