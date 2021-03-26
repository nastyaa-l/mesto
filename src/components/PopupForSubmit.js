import {Popup} from "./Popup.js";

// класс попап формы
export class PopupForSubmit extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._button = this._popupElement.querySelector('.popup__submit_confirm');
    this._form = this._popupElement.querySelector('.popup__form');
    this._handleSubmit = this._handleFormSubmit.bind(this);
  }

   // добавление слушателей
   setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit);
  }

  _handleFormSubmit(event){
    event.preventDefault();

  }

  // закрытие попапа и сбрасывание формы
  close() {
    super.close();
  }
}
