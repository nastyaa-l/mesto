// переменные - кнопки
const openButton = document.querySelector('.profile__edit-button'),
      closeButtonEdit = document.querySelector('.popup__button-close_close-edit'),
      closeButtonAdd = document.querySelector('.popup__button-close_close-add'),
      addButton = document.querySelector('.profile__add-button'),
      imageCloseButton = document.querySelector('.popup__button-close_close-image'),

// попапы
      popupAdd = document.querySelector('.popup__overlay_add-popup'),
      popupEdit = document.querySelector('.popup__overlay_edit-popup'),
      popupImage = document.querySelector('.popup__overlay_image-popup'),

// формы
      form = document.querySelector('.popup__form'),
      formAddPopup = document.querySelector('.popup__form_add'),

// инпуты
      inputName = document.querySelector('.popup__input_form_name'),
      inputSub = document.querySelector('.popup__input_form_subscription'),
      inputElementName = document.querySelector('.popup__input_element_name'),
      inputElementLink = document.querySelector('.popup__input_element_link'),

// элементы : карточки, профиль
      profileName = document.querySelector('.profile__name'),
      profileSub = document.querySelector('.profile__subscription'),
      elementPicture = document.querySelector('.popup__image'),
      elementCaption = document.querySelector('.popup__caption'),

//списки
      overlayList = Array.from(document.querySelectorAll('.popup__overlay')),
      list = document.querySelector('.elements__items'),
      elementTemplate = document.querySelector('#element-template').content;

// инпут соответсувует описанию профиля
inputName.value = profileName.textContent;
inputSub.value = profileSub.textContent;

// функция открытия попапа
function openPopup(popupName){
  popupName.classList.add('popup__overlay_active');
  document.addEventListener('keydown', function(evt){
    if (evt.key==="Escape"){
      closePopup(popupName);
    }
  })
};

// функция, меняющая картинку и описание карточки
function imageIsOpened(evt){
  elementPicture.src = evt.target.src;
  elementPicture.alt = evt.target.closest('.element').querySelector('.element__title').textContent;
  elementCaption.textContent = evt.target.closest('.element').querySelector('.element__title').textContent;
  openPopup(popupImage);
};

// сабмит профиля
function submitAddElemnts(event){
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileSub.textContent = inputSub.value;
  closePopup(popupEdit);
}


// закрытие попапа
function closePopup(popupName) {
  popupName.classList.remove('popup__overlay_active');
};

// добавление новой карточки в список карточек
function addNewCard(elem){
  list.prepend(elem);
}

//сабмит новой карточки из пользовательского ввода
function handleSubmit(event){
  event.preventDefault();
  const newEl = addCard(inputElementName.value, inputElementLink.value);
  addNewCard(newEl);
  formAddPopup.reset();
  closePopup(popupAdd);
}

// добавление событий на карточку
function setListeners(element) {
	element.querySelector('.element__like').addEventListener('click', addLikes);
  element.querySelector('.element__bin').addEventListener('click', deleteCards);
  element.querySelector('.element__picture').addEventListener('click',imageIsOpened);
}

// добавление лайков
function addLikes(evt){
  evt.target.classList.toggle('element__like_black');
}

// удаление карточек
function deleteCards(evt){
  evt.target.parentElement.remove();
}


// обработчики
addButton.addEventListener('click', () => openPopup(popupAdd));
closeButtonAdd.addEventListener('click', () => closePopup(popupAdd));
closeButtonEdit.addEventListener('click', () => closePopup(popupEdit));
openButton.addEventListener('click', () => openPopup(popupEdit));
form.addEventListener('submit', submitAddElemnts);
formAddPopup.addEventListener('submit', handleSubmit);
imageCloseButton.addEventListener('click', () => closePopup(popupImage));


// закрытие попапа по клику на оверлэй
overlayList.forEach( overlayBlock =>{
  overlayBlock.addEventListener('click', function(evt){
    if (evt.target === evt.currentTarget) {
      closePopup(overlayBlock);
    }
  })
});

// массив исходных карточек
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


// обработка массива карточек
function render() {
initialCards.forEach((item,i) =>{
  const el = addCard(item.name,item.link);
  addCardDocElem(el);
})
};

// добавление карточки из массива в список карточек
function addCardDocElem(elem){
  list.append(elem);
}

// добавление новой карточки
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

// вызов функции
render();



