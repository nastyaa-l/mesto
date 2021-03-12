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
import {openButton, addButton, formAddPopup, formEditPopup, inputName, inputSub,inputElementLink, inputElementName,
  profileName, profileSub, overlayList, list, validationObject} from "../utils/constants.js";


// картинки для вебпака
const logo = new URL('../image/logo.svg', import.meta.url);
const avatar = new URL('../image/Avatar.png', import.meta.url);

export const images = [
  {name: 'logo', image: logo },
  {name: 'avatar', image: avatar},
];

// передача значений в форму
const userInfo = new UserInfo('.profile__name', '.profile__subscription');
inputName.value = userInfo.getUserInfo().profileName;
inputSub.value = userInfo.getUserInfo().profileSub;

// форма редактирования профиля
const formEdit = new PopupWithForm ('.popup__overlay_edit-popup', {
  handleFormSubmit: (formData) => userInfo.setUserInfo(formData)});
formEdit.setEventListeners();

// форма добавления картинки
const formAdd = new PopupWithForm ('.popup__overlay_add-popup', {
  handleFormSubmit: (formData) => {
      const data = {
        name: formData['element-name'],
        link: formData['element-link']
      };
      const card = createCard(data);
      cardList.prependItem(card);
  }
})
formAdd.setEventListeners();

// попап с изображением
const popupWithImage = new PopupWithImage('.popup__overlay_image-popup');
popupWithImage.setEventListeners();

// создание карточки с изображением
function createCard(item){
  const card = new Card(item, '#element-template', (link, name) =>
  popupWithImage.open(link, name));
  return card.generateCard();
};

// закрытие изображения
const closeImagePopup = new PopupWithImage('.popup__overlay_image-popup');
closeImagePopup.setEventListeners();

//добавление карточки на страницу
const cardList = new Section({
  data: initialCards,
  renderer : (item) => {
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

// обработчики
addButton.addEventListener('click', () => {
  openValidatorForm.disableButton();
  formAdd.open();
});

openButton.addEventListener('click', () => {
  formEdit.setFormData(userInfo.getUserInfo());
  formEdit.open();
});






