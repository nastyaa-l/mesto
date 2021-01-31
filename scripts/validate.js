function showInputMessage(formElement, inputElement, erorMessage, ValidationObject){
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(ValidationObject.inputElement);
  formError.textContent = erorMessage;
  formError.classList.add(ValidationObject.errorClass);
}

function HideInputMessage(formElement, inputElement,ValidationObject){
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(ValidationObject.inputElement);
  formError.textContent ="";
  formError.classList.remove(ValidationObject.errorClass);
}

function IsValid(formElement, inputElement, ValidationObject){
  if(!inputElement.validity.valid){  //заметила,что первый попап не видит пустые инпуты и позволяет сохранять их,
                                    //со вторым таких проблем нет. Но не очень понимаю, из-за чего возникает этв ошибка
    showInputMessage(formElement, inputElement, inputElement.validationMessage, ValidationObject)
  }
  else{
    HideInputMessage(formElement, inputElement, ValidationObject)
  }
}

function setEventListeners(formElement, ValidationObject) {
  const formList = Array.from(formElement.querySelectorAll(ValidationObject.inputSelector));
  const buttonElement = formElement.querySelector(ValidationObject.submitButtonSelector);
  toggleButtonState(formList, buttonElement, ValidationObject);
  formList.forEach((inputElement) =>{
    inputElement.addEventListener('input', function(){
      IsValid(formElement, inputElement, ValidationObject);
      toggleButtonState(formList, buttonElement, ValidationObject);
    })
  })
}

function enableValidation(ValidationObject) {
  formSelector = Array.from(document.querySelectorAll(ValidationObject.formSelector));
  formSelector.forEach((formElement) =>{
    formElement.addEventListener('submit', function(event){
      event.preventDefault();
    })
    setEventListeners(formElement, ValidationObject);
  })
}

function hasInValid (formList){
  return formList.some((inputElement) => //если есть хоть один false, возвращает true
  {
    return !inputElement.validity.valid;
  }
  )}


function toggleButtonState (formList, buttonElement,ValidationObject){
  if(hasInValid(formList)){
    buttonElement.classList.add(ValidationObject.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }
  else {
    buttonElement.classList.remove(ValidationObject.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', true);
  }
}
