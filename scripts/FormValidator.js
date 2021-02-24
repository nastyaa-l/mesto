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
  }

  _showInputMessage() {
    this._formError = this._formElement.querySelector(`.${this._inputElement.id}-error`);
    this._inputElement.classList.add(this._inputElement);
    this._formError.textContent = this._erorMessage;
    this._formError.classList.add(this._errorClass);
  }

  _hideInputMessage() {
    this._formError = this._formElement.querySelector(`.${this._inputElement.id}-error`);
    this._inputElement.classList.remove(this._inputElement);
    this._formError.textContent ="";
    this._formError.classList.remove(this._errorClass);
  }

  _isValid() {
    if(!this._inputElement.validity.valid) {
      this._showInputMessage()
    }
    else{
      this._hideInputMessage()
    }
  }

  _hasInValid (inputList){
    return inputList.some((inputElement) => //если есть хоть один false, возвращает true
    {
      return !inputElement.validity.valid;
    }
  )}

  _toggleButtonState (inputList){
    if(this._hasInValid(inputList)){
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    }
    else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', true);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList);
    inputList.forEach((inputElement) =>{
      inputElement.addEventListener('input', () =>{
        this._isValid();
        this._toggleButtonState(inputList);
      })
    })
  }

  enableValidation(){
    this._formElement.addEventListener('submit', (event) =>{
      event.preventDefault();
    })
    this._setEventListeners();
  }
}
