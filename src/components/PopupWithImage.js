import {Popup} from "./Popup.js";

// класс открытия изображения
export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
  }

// открытие изображение, смена картинки и описания карточки
  open(link, name){
    super.open();
    this._popupSelector.querySelector('.popup__image').src = link;
    this._popupSelector.querySelector('.popup__image').alt = name;
    this._popupSelector.querySelector('.popup__caption').textContent = name;
  }
}
