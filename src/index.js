//импорты
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {initialCards} from "../scripts/config.js";
import {Section} from "../components/Section.js";
import {Popup} from "../components/Popup.js";
import {PopupWithImage} from "../components/PopupWithImage.js";

// переменные - кнопки
export const openButton = document.querySelector('.profile__edit-button'),
      closeButtonEdit = document.querySelector('.popup__button-close_close-edit'),
      closeButtonAdd = document.querySelector('.popup__button-close_close-add'),
      addButton = document.querySelector('.profile__add-button'),
      closeButtonImage = document.querySelector('.popup__button-close_close-image'),

// попапы
      popupAdd = document.querySelector('.popup__overlay_add-popup'),
      popupEdit = document.querySelector('.popup__overlay_edit-popup'),
      popupImage = document.querySelector('.popup__overlay_image-popup'),

// формы
      form = document.querySelector('.popup__form'),
      formAddPopup = document.querySelector('.popup__form_add'),
      formEditPopup = document.querySelector('.popup__form_edit'),

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
      list = document.querySelector('.elements__items');

//объект с селекторами валидации
const validationObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputElement: 'popup__input_active',
    errorClass: 'popup__input-error_active'
}

// инпут соответсувует описанию профиля
inputName.value = profileName.textContent;
inputSub.value = profileSub.textContent;

// функция открытия попапа
/*export function openPopup(popupName){
  popupName.classList.add('popup__overlay_active');
//  document.addEventListener('keydown', closePopupwithEsc)
};*/

/*
// функция, меняющая картинку и описание карточки
export function handleOpenImage(link, name){
  elementPicture.src = link;
  elementPicture.alt = name;
  elementCaption.textContent = name;
  openPopup(popupImage);
};
*/

// сабмит профиля
function submitAddElemnts(event){
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileSub.textContent = inputSub.value;
  closePopup(popupEdit);
};

// закрытие попапа
/*function closePopup(popupName) {
  popupName.classList.remove('popup__overlay_active');
  document.removeEventListener('keydown', closePopupwithEsc)
};*/

// добавление слушателя на эскейп
/*function closePopupwithEsc(event) {
    if(event.key === 'Escape'){
      closePopup(document.querySelector('.popup__overlay_active'))
    }
};*/

// создание карточки с изображением
function createCard(item){
  const card = new Card(item, '#element-template');
  return card.generateCard();
};

// закрытие попапа редактирования профиля
const closeEditPopup = new Popup(popupEdit);
closeEditPopup.setEventListeners();

// закрытие попапа добавление карточки
const closeAddPopup = new Popup(popupAdd);
closeAddPopup.setEventListeners();

// закрытие изображения
const closeImagePopup = new PopupWithImage(popupImage);
closeImagePopup.setEventListeners();

//добавление карточки на страницу
const cardList = new Section({
  data: initialCards,
  renderer : (item) => {
    createCard(item);
    cardList.setItem(createCard(item));
  }
}, list);

cardList.renderItems();

//сабмит новой карточки из пользовательского ввода
function handleSubmit(event){
  event.preventDefault();
//добавление карточек пользователем
  const userCardList = new Section({
    data: [{
      name: inputElementName.value,
      link: inputElementLink.value
    }],
    renderer: (item) => {
      createCard(item);
      userCardList.prependItem(createCard(item));
    }
  }, list);
  userCardList.renderItems();
  formAddPopup.reset();
  openValidatorForm.disableButton();
  closePopup(popupAdd);
};

//валидация формы попапа добавления карточки
const openValidatorForm = new FormValidator(validationObject, formAddPopup);
openValidatorForm.enableValidation();

//валидация формы попапа редактирования профиля
const editValidatorForm = new FormValidator(validationObject, formEditPopup);
editValidatorForm.enableValidation();

// закрытие попапа по клику на оверлэй
overlayList.forEach( overlayBlock =>{
  overlayBlock.addEventListener('click', function(evt){
    if (evt.target === evt.currentTarget) {
      const overlay = new Popup(overlayBlock);
      overlay.close();
    }
  })
});

// обработчики
addButton.addEventListener('click', () => {
  const openPopup = new Popup(popupAdd);
  openPopup.open();
});
//closeButtonAdd.addEventListener('click', () => closePopup(popupAdd));
//closeButtonEdit.addEventListener('click', () => closePopup(popupEdit));
openButton.addEventListener('click', () => {
  const openPopup = new Popup(popupEdit);
  openPopup.open();
});
form.addEventListener('submit', submitAddElemnts);
formAddPopup.addEventListener('submit', handleSubmit);
//imageCloseButton.addEventListener('click', () => closePopup(popupImage));





