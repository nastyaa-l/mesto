
const openButton = document.querySelector('.profile__edit-button'),
      closeButtonEdit = document.querySelector('.overlay__button_form-edit'),
      closeButtonAdd = document.querySelector('.overlay__button_form-add'),
      form = document.querySelector('.overlay__form'),
      addButton = document.querySelector('.profile__add-button'),
      imageCloseButton = document.querySelector('.overlay__button_image'),
      newName = document.querySelector('.overlay__input_form_name'),
      newSub = document.querySelector('.overlay__input_form_subscription'),
      elementTemplate = document.querySelector('#element-template').content,
      profileName = document.querySelector('.profile__name'),
      profileSub = document.querySelector('.profile__subscription'),
      overlayAdd = document.querySelector('.overlay__add-popup'),
      overlayEdit = document.querySelector('.overlay__edit-popup'),
      openImagePopup = document.querySelector('.overlay__image-popup');

//открытие попапа

function openPopup(overlayName){
  overlayName.classList.add('overlay_active');
}

function openImage(evt){
  openImagePopup.classList.add('overlay_active');
  openImagePopup.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
  document.querySelector('.overlay__popup_image').classList.add('overlay__popup_image_active');
  let overlayImage = document.querySelector('.overlay__image');
  overlayImage.src=evt.target.src;
  document.querySelector('.overlay__caption').textContent=evt.target.closest('.element').querySelector('.element__title').textContent;
 };

 function popupIsOpened(){
  openPopup(overlayEdit);
  newName.value = profileName.textContent;
  newSub.value = profileSub.textContent;
}

function submitAddElemnts(event){
  event.preventDefault();
  profileName.textContent = newName.value;
  profileSub.textContent = newSub.value;
  closePopup(overlayEdit);
}

//закрытие

function closePopup(overlayName) {
  overlayName.classList.remove('overlay_active'); //при закрытии блок почему-то уезжает в левый угол :(
};

function closeImage(){
  openImagePopup.classList.remove('overlay_active');
  document.querySelector('.overlay__popup_image').classList.remove('overlay__popup_image_active');
};

/*Клик по оверлею
overlay.addEventListener('click', function(event){
  if (event.target === event.currentTarget){
  }
  });*/



//добавление новой карточки

function addNewCard(elem){
  list.prepend(elem);
}

const newElementName = document.querySelector('.overlay__input_element_name'),
newElementLink = document.querySelector('.overlay__input_element_link'),
addPopup = document.querySelector('.overlay__popup_form-add');


function handleSubmit(event){
event.preventDefault();
const newEl = addCard(newElementName.value, newElementLink.value);
addNewCard(newEl);
document.querySelectorAll('.overlay__form')[1].reset();
closePopup(overlayAdd);
}

function setListeners(element) {
	element.querySelector('.element__like').addEventListener('click', addLikes);
  element.querySelector('.element__bin').addEventListener('click', deleteCards);
  element.querySelector('.element__picture').addEventListener('click',openImage);
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
})

openButton.addEventListener('click', popupIsOpened);
closeButtonEdit.addEventListener('click',function(){
  closePopup(overlayEdit);
});
form.addEventListener('submit', submitAddElemnts);

addPopup.addEventListener('submit', handleSubmit);

imageCloseButton.addEventListener('click', closeImage);


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
  const name=initialCards[i].name;
  const link = initialCards[i].link;
  const el = addCard(name,link);
  addCardDocElem(el);
})
};

function addCardDocElem(elem){
  list.append(elem);
}

function addCard(name,link){
  const element = elementTemplate.cloneNode(true);
	element.querySelector('.element__title').textContent = name;
  element.querySelector('.element__picture').src = link;
  setListeners(element);
  return element;
}

render();
