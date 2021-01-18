let openButton = document.querySelector('.profile__edit-button');
let closeButtonEdit = document.querySelector('.overlay__button_form-edit');
const closeButtonAdd = document.querySelector('.overlay__button_form-add');
let overlay = document.querySelector('.overlay');
let form = overlay.querySelector('.overlay__form');
let buttonSubmit = overlay.querySelector('.overlay__submit');
let profileName = document.querySelector('.profile__name')
let newName = overlay.querySelector('.overlay__input_form_name');
let profileSub = document.querySelector('.profile__subscription');
let newSub = overlay.querySelector('.overlay__input_form_subscription');
const likes = document.querySelectorAll('.element__like'),
      addButton = document.querySelector('.profile__add-button'),
      popupEdit = document.querySelector('.overlay__popup_edit-form'),
      popupAdd = document.querySelector('.overlay__popup_add-form'),
      bin = document.querySelectorAll('.element__bin'),
      editPopup = document.querySelector('.overlay__popup_form-edit'),
      addPopup = document.querySelector('.overlay__popup_form-add'),
      addForm = document.querySelector('.overlay__submit_form-add'),
      imageCloseButton = document.querySelector('.overlay__button_image'),
      elementTemplate = document.querySelector('#element-template').content;

let elementTitle = document.querySelectorAll('.element__title'),
    elementImage = document.querySelectorAll('.element__picture'),
    newElementName = document.querySelector('.overlay__input_element_name'),
    newElementLink = document.querySelector('.overlay__input_element_link'),
    elementsItem = document.querySelector('.elements__items');




function openPopup(){
  overlay.classList.add('overlay_active');
  editPopup.classList.add('overlay__popup_form-edit_active');
  newName.value = profileName.textContent;
  newSub.value = profileSub.textContent;
}

function closePopup() {
    overlay.classList.remove('overlay_active');
    editPopup.classList.remove('overlay__popup_form-edit_active');
}

function submit(event){
  event.preventDefault();
  profileName.textContent = newName.value;
  profileSub.textContent = newSub.value;
  closePopup();
}

openButton.addEventListener('click', openPopup);
closeButtonEdit.addEventListener('click', closePopup);
form.addEventListener('submit', submit);

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

elementTitle.forEach((item,i) => {
  item.textContent=initialCards[i].name;
})

elementImage.forEach((item,i) =>{
  item.src=initialCards[i].link;
  item.alt=initialCards[i].name;
})

//открытие формы

function openAddPopup(){
  overlay.classList.add('overlay_active');
  addPopup.classList.add('overlay__popup_form-add_active');
}

function closeAddPopup() {
  overlay.classList.remove('overlay_active');
  addPopup.classList.remove('overlay__popup_form-add_active');
  newElementName.value = "";
  newElementLink.value = "";

}

addButton.addEventListener('click', openAddPopup);
closeButtonAdd.addEventListener('click', closeAddPopup)




  //добавление элементов

function addElements(event){
  event.preventDefault()
  const element = elementTemplate.cloneNode(true);
  element.querySelector('.element__title').textContent = newElementName.value;
  element.querySelector('.element__picture').src = newElementLink.value;
  setListeners(element);
  elementsItem.prepend(element);
  closeAddPopup();
}

addForm.addEventListener('click', addElements);

function setListeners(element) {
	element.querySelector('.element__like').addEventListener('click', addLikes);
  element.querySelector('.element__bin').addEventListener('click', deleteCards);
  element.querySelector('.element__picture').addEventListener('click',openImage);
}
// лайки

function addLikes(evt){
  evt.target.classList.toggle('element__like_black');
}

likes.forEach(item => {
  item.addEventListener('click', addLikes)
})

//удаение элементов
function deleteCards(evt){
  evt.target.parentElement.remove();
}
bin.forEach(item => {
  item.addEventListener('click', deleteCards);
  })


//открытие попапа  с картинкой
 function openImage(evt){
  overlay.classList.add('overlay_active');
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
  document.querySelector('.overlay__popup_image').classList.add('overlay__popup_image_active');
  let overlayImage = document.querySelector('.overlay__image');
  overlayImage.src=evt.target.src;
  document.querySelector('.overlay__caption').textContent=elementTitle[i].textContent;
 }

elementImage.forEach((item, i) => {
  item.addEventListener('click', openImage)
})


function closeImage(){
  overlay.classList.remove('overlay_active');
  document.querySelector('.overlay__popup_image').classList.remove('overlay__popup_image_active');
};

imageCloseButton.addEventListener('click', closeImage)
