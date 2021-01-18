
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
      addPopup = document.querySelector('.overlay__popup_form-add'),
      addForm = document.querySelector('.overlay__submit_form-add'),
      imageCloseButton = document.querySelector('.overlay__button_image');

let newName = overlay.querySelector('.overlay__input_form_name'),
    profileName = document.querySelector('.profile__name'),
    profileSub = document.querySelector('.profile__subscription'),
    newSub = overlay.querySelector('.overlay__input_form_subscription'),
    elementTitle = document.querySelectorAll('.element__title'),
    elementImage = document.querySelectorAll('.element__picture'),
    newElementName = document.querySelector('.overlay__input_element_name'),
    newElementLink = document.querySelector('.overlay__input_element_link'),
    elementsItem = document.querySelector('.elements__items');
   // elementsNode = document.querySelectorAll('.element')




function openPopup(){
  overlay.classList.add('overlay_active');
  editPopup.classList.add('overlay__popup_form-edit_active');
  newName.value = profileName.textContent;editPopup.classList.add('overlay__popup_form-edit_active');
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
}

addButton.addEventListener('click', openAddPopup);
closeButtonAdd.addEventListener('click', closeAddPopup)




  //добавление элементов

const elementTemplate = document.querySelector('#element-template').content;
let node = document.querySelectorAll('.element');
let postArray = Array.from(document.querySelectorAll('.element'));
console.log(postArray);

function addElements(event){
  event.preventDefault();
  const element = elementTemplate.cloneNode(true);
  element.querySelector('.element__title').textContent = newElementName.value;
  element.querySelector('.element__picture').src = newElementLink.value;
  elementsItem.prepend(element);
  closeAddPopup();
  console.log(elementsItem);
  console.log(node);
}

addForm.addEventListener('click', addElements);


// лайки

likes.forEach(item => {
  item.addEventListener('click', function(){
    item.classList.toggle('element__like_black')
  })
})

//удаение элементов

bin.forEach(item => {
  item.addEventListener('click', function(){
  item.parentElement.remove();
  })
  })


//открытие попапа  с картинкой



elementImage.forEach((item, i) => {
  item.addEventListener('click', function(){
    overlay.classList.add('overlay_active');
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    document.querySelector('.overlay__popup_image').classList.add('overlay__popup_image_active');
    let overlayImage = document.querySelector('.overlay__image');
    overlayImage.src=item.src;
    document.querySelector('.overlay__caption').textContent=elementTitle[i].textContent;
  })
})

function closeImage(){
  overlay.classList.remove('overlay_active');
  document.querySelector('.overlay__popup_image').classList.remove('overlay__popup_image_active');
};

imageCloseButton.addEventListener('click', closeImage)
