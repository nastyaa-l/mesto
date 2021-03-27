import {Popup} from "./Popup.js";

// класс попап формы
export class PopupForSubmit extends Popup {
  constructor(popupSelector, FormSubmit){
    super(popupSelector);
    this._FormSubmit = FormSubmit;
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
    this._FormSubmit(this._data, this._elem);
  }

  // закрытие попапа и сбрасывание формы
  close() {
    super.close();
  }

  open(data, event) {
    super.open()
    this._data = data;
    this._elem = event.target;
  }
}
