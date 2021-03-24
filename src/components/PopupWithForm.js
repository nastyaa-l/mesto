import {Popup} from "./Popup.js";

// класс попап формы
export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}){
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector('.popup__form');
    this._button = this._popupElement.querySelectorAll('.popup__submit')[0];
    this._newButton = this._popupElement.querySelectorAll('.popup__submit')[1];

  }

  // добавление слушателей
  setEventListeners(){
  console.log(this._newButton)
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      this.renderLoading(true);
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
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  //загрузка отправки на сервер
  renderLoading(isLoading){
    if(isLoading){
      console.log(true)
      this._button.classList.add('.popup__form_sending');
      this._newButton.classList.remove('.popup__form_sending');
    }
    else {
      console.log(false)
      this._button.classList.remove('.popup__form_sending');
      this._newButton.classList.add('.popup__form_sending');
    }
  }

  //добавление имени и описания профиля
  setFormData(data) {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._inputList.forEach(input => input.value = data[input.name] || '' );
  }
}
