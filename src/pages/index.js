//импорты
import './index.css';
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {initialCards} from "../scripts/config.js";
import {Section} from "../components/Section.js";
import {Popup} from "../components/Popup.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {UserInfo} from "../components/UserInfo.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {openButton, addButton, popupAdd, popupEdit, popupImage, formAddPopup, formEditPopup, inputName, inputSub,
inputElementLink, inputElementName, profileName, profileSub, overlayList, list, validationObject} from "../utils/constants.js";


// картинки для вебпака
const logo = new URL('../image/logo.svg', import.meta.url);
const avatar = new URL('../image/Avatar.png', import.meta.url);

export const images = [
  {name: 'logo', image: logo },
  {name: 'avatar', image: avatar},
];

// передача значений в форму
const userInfo = new UserInfo(profileName, profileSub);
inputName.value = userInfo.getUserInfo().profileName;
inputSub.value = userInfo.getUserInfo().profileSub;

// форма редактирования профиля
const formEdit = new PopupWithForm (popupEdit, {
  handleFormSubmit: (formData) => userInfo.setUserInfo(formData)});
formEdit.setEventListeners();

// форма добавления картинки
const formAdd = new PopupWithForm (popupAdd, {
  handleFormSubmit: (formData) => {
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
    openValidatorForm.disableButton();
  }
})
formAdd.setEventListeners();

// создание карточки с изображением
function createCard(item){
  const card = new Card(item, '#element-template', popupImage);
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
  formAdd.open();
});

openButton.addEventListener('click', () => {
  formEdit.open(userInfo.getUserInfo());
});






