import {Popup} from "./Popup.js";

// класс открытия изображения
export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._popopCardImage = this._popupElement.querySelector('.popup__image');
    this._captionImage = this._popupElement.querySelector('.popup__caption');
  }

// открытие изображение, смена картинки и описания карточки
  open(link, name){
    super.open();
    this._popopCardImage.src = link;
    this._popopCardImage.alt = name;
    this._captionImage.textContent = name;
  }
}
