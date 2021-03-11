import {Popup} from "./Popup.js";

// класс попап формы
export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}){
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
  }

  // добавление слушателей
  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  // закрытие попапа и сбрасывание формы
  close() {
    super.close();
    this._form.reset();
  }

  // сбор данных всех полей формы
  _getInputValues(){
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  //добавление имени и описания профиля
  setFormData(data) {
    this._inputList.forEach(input => input.value = data[input.name] || '' );
  }

}
