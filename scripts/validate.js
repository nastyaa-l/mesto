// показ ошибки инпута
function showInputMessage(formElement, inputElement, erorMessage, validationObject){
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationObject.inputElement);
  formError.textContent = erorMessage;
  formError.classList.add(validationObject.errorClass);
}

// скрытие ошибки инпута
function hideInputMessage(formElement, inputElement,validationObject){
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationObject.inputElement);
  formError.textContent ="";
  formError.classList.remove(validationObject.errorClass);
}

// проверка на валидность инпута
function isValid(formElement, inputElement, validationObject){
  if(!inputElement.validity.valid) {
    showInputMessage(formElement, inputElement, inputElement.validationMessage, validationObject)
  }
  else{
    hideInputMessage(formElement, inputElement, validationObject)
  }
}

//проверка валидности сразу всей формы(всех инпутов)
function hasInValid (inputList){
  return inputList.some((inputElement) => //если есть хоть один false, возвращает true
  {
    return !inputElement.validity.valid;
  }
  )}

//блокировка кнопки сабмита
function toggleButtonState (inputList, buttonElement,validationObject){
  if(hasInValid(inputList)){
    buttonElement.classList.add(validationObject.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }
  else {
    buttonElement.classList.remove(validationObject.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', true);
  }
}

// обработка каждой формы
function setEventListeners(formElement, validationObject) {
  const inputList = Array.from(formElement.querySelectorAll(validationObject.inputSelector));
  const buttonElement = formElement.querySelector(validationObject.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationObject);
  inputList.forEach((inputElement) =>{
    inputElement.addEventListener('input', function(){
      isValid(formElement, inputElement, validationObject);
      toggleButtonState(inputList, buttonElement, validationObject);
    })
  })
}

//включение валидации для всех форм
function enableValidation(validationObject) {
  formList = Array.from(document.querySelectorAll(validationObject.formSelector));
  formList.forEach((formElement) =>{
    formElement.addEventListener('submit', function(event){
      event.preventDefault();
    })
    setEventListeners(formElement, validationObject);
  })
}

// вызов функции с объектом исходных значений
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputElement: 'popup__input_active',
  errorClass: 'popup__input-error_active'
  });
