import {elementPicture, elementCaption, popupImage, openPopup} from "../scripts/script.js"

// класс создания карточек
export class Card {
  constructor (data){
    this._name = data.name;
    this._link = data.link;
  }

  // метод возвращения разметки карточки
  _getTemplate() {
    const cardElement = document
    .querySelector('#element-template')
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardElement;
  }

  // подготовка карточки к публикации
  generateCard() {
    this._element = this._getTemplate();
    this._setEvenetListeners();
    this._element.querySelector('.element__picture').src = this._link;
    this._element.querySelector('.element__picture').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }

  // лайк карточке
  _addLike() {
    this._element.querySelector('.element__like').classList.toggle('element__like_black');
  }

  //удаление карточек
  _deleteCard() {
    this._element.remove();
  };

  //открытие изображения
  _handleOpenImage(){
    elementPicture.src = this._element.querySelector('.element__picture').src;
    elementPicture.alt = this._element.closest('.element').querySelector('.element__title').textContent;
    elementCaption.textContent = this._element.closest('.element').querySelector('.element__title').textContent;
    openPopup(popupImage);
  };

  //обработчики
  _setEvenetListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._addLike();
    });
    this._element.querySelector('.element__bin').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('.element__picture').addEventListener('click', ()=> {
      this._handleOpenImage();
    });
  }
}


