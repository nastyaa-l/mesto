import {Popup} from "./Popup.js";

// класс попап формы
export class PopupForSubmit extends Popup {
  constructor(popupSelector, formSubmit){
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._button = this._popupElement.querySelector('.popup__submit_confirm');
    this._form = this._popupElement.querySelector('.popup__form');
    this._handleSubmit = this._handleFormSubmit.bind(this);
  }

   // добавление слушателей
   setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('click', this._handleSubmit);
  }

  _handleFormSubmit(event){
    event.preventDefault();
    this._formSubmit(this._data, this._elem);
  }

  // закрытие попапа
  close() {
    super.close();
  }

  open(data, event) {
    super.open()
    this._data = data;
    this._elem = event.target;
  }
}
