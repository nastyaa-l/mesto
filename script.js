
const openButton = document.querySelector('.profile__edit-button'),
      closeButtonEdit = document.querySelector('.popup__button_close-edit'),
      closeButtonAdd = document.querySelector('.popup__button_close-add'),
      form = document.querySelector('.popup__form'),
      addButton = document.querySelector('.profile__add-button'),
      imageCloseButton = document.querySelector('.popup__button_close-image'),
      newName = document.querySelector('.popup__input_form_name'),
      newSub = document.querySelector('.popup__input_form_subscription'),
      elementTemplate = document.querySelector('#element-template').content,
      profileName = document.querySelector('.profile__name'),
      profileSub = document.querySelector('.profile__subscription'),
      overlayAdd = document.querySelector('.popup__overlay_add-popup'),
      overlayEdit = document.querySelector('.popup__overlay_edit-popup'),
      overlayImage = document.querySelector('.popup__overlay_image-popup'),
      openImagePopup = document.querySelector('.popup__overlay_image-popup'),
      newElementName = document.querySelector('.popup__input_element_name'),
      newElementLink = document.querySelector('.popup__input_element_link'),
      addPopup = document.querySelector('.popup__form_add'),
      overlayList = Array.from(document.querySelectorAll('.popup__overlay')),
      list = document.querySelector('.elements__items');

//открытие попапа

function openPopup(overlayName){
  overlayName.classList.add('popup__overlay_active');
}

function imageIsOpened(evt){
  const popupImage = document.querySelector('.popup__image');
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.closest('.element').querySelector('.element__title').textContent;
  document.querySelector('.popup__caption').textContent=evt.target.closest('.element').querySelector('.element__title').textContent;
  openPopup(overlayImage);
};

 function popupIsOpened(){
  newName.value = profileName.textContent;
  newSub.value = profileSub.textContent;
  openPopup(overlayEdit);
}

function submitAddElemnts(event){
  event.preventDefault();
  profileName.textContent = newName.value;
  profileSub.textContent = newSub.value;
  closePopup(overlayEdit);
}

function closePopup(overlayName) {
  overlayName.classList.remove('popup__overlay_active');
};

function addNewCard(elem){
  list.prepend(elem);
}

function handleSubmit(event){
  event.preventDefault();
  const newEl = addCard(newElementName.value, newElementLink.value);
  addNewCard(newEl);
  addPopup.reset();
  closePopup(overlayAdd);
}

function setListeners(element) {
	element.querySelector('.element__like').addEventListener('click', addLikes);
  element.querySelector('.element__bin').addEventListener('click', deleteCards);
  element.querySelector('.element__picture').addEventListener('click',imageIsOpened);
}

function addLikes(evt){
  evt.target.classList.toggle('element__like_black');
}

function deleteCards(evt){
  evt.target.parentElement.remove();
}



addButton.addEventListener('click', function(){
  openPopup(overlayAdd);
});

closeButtonAdd.addEventListener('click', function(){
  closePopup(overlayAdd);
});

openButton.addEventListener('click', popupIsOpened);
closeButtonEdit.addEventListener('click', function(){
  closePopup(overlayEdit);
});

form.addEventListener('submit', submitAddElemnts);

addPopup.addEventListener('submit', handleSubmit);

imageCloseButton.addEventListener('click',function(){
  closePopup(overlayImage);
});

overlayList.forEach( overlayBlock =>{
  overlayBlock.addEventListener('click', function(evt){
    if (evt.target === evt.currentTarget) {
      closePopup(overlayBlock);
    }
  })
  overlayBlock.addEventListener('keydown', function(evt){
  if (evt.key==="Escape"){  //активриуется только полсе клика на попап ?
    closePopup(overlayBlock);
  }
  })
});





const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];



function render() {
initialCards.forEach((item,i) =>{
  const el = addCard(item.name,item.link);
  addCardDocElem(el);
})
};

function addCardDocElem(elem){
  list.append(elem);
}

function addCard(name,link){
  const element = elementTemplate.cloneNode(true);
  const newElementTitle = element.querySelector('.element__title'),
        newElementPic = element.querySelector('.element__picture');
  newElementTitle.textContent = name;
  newElementPic.src = link;
  newElementPic.alt = name;
  setListeners(element);
  return element;
}




function showInputMessage(formElement, inputElement, erorMessage){
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_active');
  formError.textContent = erorMessage;
  formError.classList.add('popup__input-error_active');
}

function HideInputMessage(formElement, inputElement){
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_active');
  formError.textContent ="";
  formError.classList.remove('popup__input-error_active');
}

function IsValid(formElement, inputElement){
  if(!inputElement.validity.valid){
    showInputMessage(formElement, inputElement, inputElement.validationMessage)
  }
  else{
    HideInputMessage(formElement, inputElement)
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) =>{
    inputElement.addEventListener('input', function(){
      IsValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    })
  })
}

function enableValidation() {
 formList = Array.from(document.querySelectorAll('.popup__form'));
 formList.forEach((formElement) =>{
    formElement.addEventListener('submit', function(event){
      event.preventDefault();
    })
    setEventListeners(formElement);
  })
}

function hasInValid (inputList){
  return inputList.some((inputElement) => //если есть хоть один false, возвращает true
  {
    return !inputElement.validity.valid;
  }
  )}

function toggleButtonState (inputList, buttonElement){
  if(hasInValid(inputList)){
    buttonElement.classList.add('popup__submit_disabled');
    buttonElement.setAttribute('disabled', true);
  }
  else {
    buttonElement.classList.remove('popup__submit_disabled');
    buttonElement.removeAttribute('disabled', true);
  }
}

render();

enableValidation()


