import {Popup} from "./Popup.js";

// класс открытия изображения
export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._popopImage = this._popupElement.querySelector('.popup__image');
    this._popupCaption = this._popupElement.querySelector('.popup__caption');
  }

// открытие изображение, смена картинки и описания карточки
  open(link, name){
    super.open();
    this._popopImage.src = link;
    this._popopImage.alt = name;
    this._popupCaption.textContent = name;
  }
}
