import {Card} from "./Card.js"

// переменные - кнопки
export const openButton = document.querySelector('.profile__edit-button'),
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
export function openPopup(popupName){
  popupName.classList.add('popup__overlay_active');
  document.addEventListener('keydown', closePopupwithEsc)
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
};

// закрытие попапа
function closePopup(popupName) {
  popupName.classList.remove('popup__overlay_active');
  document.removeEventListener('keydown', closePopupwithEsc)
};

// добавление слушателя на эскейп
function closePopupwithEsc(event) {
    if(event.key === 'Escape'){
        closePopup(document.querySelector('.popup__overlay_active'))
    }
};

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

//обработка массива карточек и показ их на старнице
initialCards.forEach ((item) => {
  const card = new Card(item);
  const cardElement = card.generateCard();
  list.append(cardElement);
})

//сабмит новой карточки из пользовательского ввода
function handleSubmit(event){
  event.preventDefault();
  const cardItem = {
    name: inputElementName.value,
    link: inputElementLink.value
  }
  const card = new Card(cardItem);
  const cardElement = card.generateCard();
  list.prepend(cardElement)
  formAddPopup.reset();
  closePopup(popupAdd);
};
