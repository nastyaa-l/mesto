import {Popup} from "./Popup.js";

// класс попап формы
class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm){
    super(popupSelector);
    this._submitForm = submitForm;
  }

// сбор данных всех полей формы
  _getInputValues(){

  }

// добавление слушателей
  setEventListeners(){
    super.setEventListeners();
  }

// закрытие попапа
  close() {
    super.close();

  }
}
