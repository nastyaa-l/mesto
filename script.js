
const openButton = document.querySelector('.profile__edit-button'),
      closeButtonEdit = document.querySelector('.overlay__button_form-edit'),
      closeButtonAdd = document.querySelector('.overlay__button_form-add'),
      overlay = document.querySelector('.overlay'),
      form = overlay.querySelector('.overlay__form'),
      buttonSubmit = overlay.querySelector('.overlay__submit'),
      likes = document.querySelectorAll('.element__like'),
      addButton = document.querySelector('.profile__add-button'),
      popupEdit = document.querySelector('.overlay__popup_edit-form'),
      popupAdd = document.querySelector('.overlay__popup_add-form'),
      bin = document.querySelectorAll('.element__bin'),
      editPopup = document.querySelector('.overlay__popup_form-edit'),
      addForm = document.querySelector('.overlay__submit_form-add'),
      imageCloseButton = document.querySelector('.overlay__button_image'),
      newName = overlay.querySelector('.overlay__input_form_name'),
      newSub = overlay.querySelector('.overlay__input_form_subscription'),
      elementTemplate = document.querySelector('#element-template').content,
      profileName = document.querySelector('.profile__name'),
      profileSub = document.querySelector('.profile__subscription'),
      elementTitle = document.querySelectorAll('.element__title'),
      elementImage = document.querySelectorAll('.element__picture'),
      elementsItem = document.querySelector('.elements__items');


function openPopup(){
  overlay.classList.add('overlay_active');
  editPopup.classList.add('overlay__popup_form-edit_active');

}

function closePopup() {
    overlay.classList.remove('overlay_active');
    editPopup.classList.remove('overlay__popup_form-edit_active');
}

function popupIsOpened(){
  openPopup();
  newName.value = profileName.textContent;
  newSub.value = profileSub.textContent;
}

function submitAddElemnts(event){
  event.preventDefault();
  profileName.textContent = newName.value;
  profileSub.textContent = newSub.value;
  closePopup();
}

openButton.addEventListener('click', popupIsOpened);
closeButtonEdit.addEventListener('click', closePopup);
form.addEventListener('submit', submitAddElemnts);

//Возможно, в будущем придется удалить
overlay.addEventListener('click', function(event){
  if (event.target === event.currentTarget){
    closePopup();
    closeAddPopup();
    closeImage ()
  }
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
  const name=initialCards[i].name;
  const link = initialCards[i].link;
  addCard(name,link);
})
};


function addCard(name,link){
  const element = elementTemplate.cloneNode(true);
	element.querySelector('.element__title').textContent = name;
  element.querySelector('.element__picture').src = link;
  setListeners(element);
  list.append(element);
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

function openImage(evt){
  overlay.classList.add('overlay_active');
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
  document.querySelector('.overlay__popup_image').classList.add('overlay__popup_image_active');
  let overlayImage = document.querySelector('.overlay__image');
  overlayImage.src=evt.target.src;
  document.querySelector('.overlay__caption').textContent=evt.target.closest('.element').querySelector('.element__title').textContent;
 }

 const newElementName = document.querySelector('.overlay__input_element_name'),
 newElementLink = document.querySelector('.overlay__input_element_link'),
 addPopup = document.querySelector('.overlay__popup_form-add');


function handleSubmit(event){
  event.preventDefault();
  addCard(newElementName.value, newElementLink.value);
  document.querySelectorAll('.overlay__form')[1].reset();
  closeAddPopup();
}

addPopup.addEventListener('submit', handleSubmit)

function openAddPopup(){
  overlay.classList.add('overlay_active');
  addPopup.classList.add('overlay__popup_form-add_active');
}

function closeAddPopup() {
  overlay.classList.remove('overlay_active');
  addPopup.classList.remove('overlay__popup_form-add_active');

}

addButton.addEventListener('click', openAddPopup);
closeButtonAdd.addEventListener('click', closeAddPopup)



function closeImage(){
  overlay.classList.remove('overlay_active');
  document.querySelector('.overlay__popup_image').classList.remove('overlay__popup_image_active');
};

imageCloseButton.addEventListener('click', closeImage)
render();
