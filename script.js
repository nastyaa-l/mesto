
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
      addPopup = document.querySelector('.popup__form_add');

//открытие попапа

function openPopup(overlayName){
  overlayName.classList.add('popup__overlay_active');
  const formElement = document.querySelector('.popup__form_edit');
const formInput = formElement.querySelector('.popup__input_form_name');
const formError = formElement.querySelector(`.${formInput.id}-error`);
console.log(formInput)

function showInputMessage(element, erorMessage){
  element.classList.add('popup__input_active');
  formError.text = erorMessage;
  formError.classList.add('popup__input-error_active');
}

function HideInputMessage(element){
  element.classList.remove('popup__input_active');
  formError.text ="";
  formError.classList.remove('popup__input-error_active');
}

function IsValid(){
  if(!form.Input.validity.valid){
    showInputMessage(formInput, formInput.validityMessage)
  }
  else{
    HideInputMessage(formInput)
  }
}

IsValid();
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

function closePopup(overlayName, event) {
  overlayName.classList.remove('popup__overlay_active');
};


/*Клик по оверлею
overlay.addEventListener('click', function(event){
  if (event.target === event.currentTarget){
  }
  });*/

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

//обработчики


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


//добавление исходных карточек

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

const list=document.querySelector('.elements__items');


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



render();
