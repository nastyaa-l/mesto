//класс создания валидации формы
export class FormValidator {
  constructor(data, formElement){
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputElement = data.inputElement;
    this._errorClass = data.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  //показ ошибки инпута
  _showInputMessage(inputElement, erorMessage) {
    const formError = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputElement);
    formError.textContent = erorMessage;
    formError.classList.add(this._errorClass);
  }

  //скрытие ошибки инпута
  _hideInputMessage(inputElement) {
    const formError = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputElement);
    formError.textContent ="";
    formError.classList.remove(this._errorClass);
  }

  //проверка на валидность инпута
  _isValid(inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputMessage(inputElement,inputElement.validationMessage)
    }
    else{
      this._hideInputMessage(inputElement)
    }
  }

  //проверка валидности сразу всей формы(всех инпутов)
  _hasInValid (){
    return this._inputList.some((inputElement) => //если есть хоть один false, возвращает true
    {
      return !inputElement.validity.valid;
    }
  )}

  //блокировка кнопки сабмита
  _toggleButtonState (){
    if(this._hasInValid()){
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    }
    else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', true);
    }
  }

  //отключение кнопки сабмита
  disableButton(){
    this._toggleButtonState()
  };

  //обработка каждой формы
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) =>{
      inputElement.addEventListener('input', () =>{
        this._isValid(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      })
    })
  }

  //включение валидации для всех форм
  enableValidation(){
    this._formElement.addEventListener('submit', (event) =>{
      event.preventDefault();
    })
    this._setEventListeners();
  }
}
