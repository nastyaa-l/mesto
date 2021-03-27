//импорты
import './index.css';
import {Api} from "../components/Api.js";
import {Card} from "../components/Card.js";
import {Popup} from "../components/Popup.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {UserInfo} from "../components/UserInfo.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupForSubmit} from "../components/PopupForSubmit.js";
import {openButton, addButton, formAddPopup, formEditPopup, inputName, profileAvatar, profileName, profileSub, popupSubmitAdd, popupSubmitEdit,
popupSubmitUpd, inputSub, apiData, list, validationObject, formUpdatePopup, profileButton} from "../utils/constants.js";


// картинки для вебпака
const logo = new URL('../image/logo.svg', import.meta.url);
const avatar = new URL('../image/Avatar.png', import.meta.url);

export const images = [
  {name: 'logo', image: logo },
  {name: 'avatar', image: avatar},
];

// передача значений в форму
const userInfo = new UserInfo('.profile__name', '.profile__subscription');


//функция включения загрузки на кнопкахсохранения
function loading (isLoading, button, originalText) {
	if(isLoading) {
		button.textContent = "Сохранение...";
	} else {
		button.textContent = originalText;
	}
}

// форма редактирования профиля
const formEdit = new PopupWithForm ('.popup__overlay_edit-popup', {
  handleFormSubmit: (formData) => {
    loading(true, popupSubmitEdit, 'Сохранить')
    userInfo.setUserInfo(formData)
    api.patchDatas(formData)
    .then(()=> loading(false, popupSubmitEdit, 'Сохранить'))
  }});
formEdit.setEventListeners();


// форма добавления картинки
const formAdd = new PopupWithForm ('.popup__overlay_add-popup', {
  handleFormSubmit: (formData) => {
      const data = {
        name: formData['element-name'],
        link: formData['element-link'],
        likes: [],
      };
    loading(true, popupSubmitAdd, 'Создать');
    api.postCards(data)
    .then((res) => {
      loading(false, popupSubmitAdd, 'Создать')
      const card = createCard(res, true);
      cardList.prependItem(card);
  })
  }
})
formAdd.setEventListeners();

// форма редактирования аватара
const formUpdate = new PopupWithForm ('.popup__overlay_update', {
  handleFormSubmit: (formData) => {
    loading(true, popupSubmitUpd, 'Да')
    profileAvatar.src = formData.profileUrl;
    api.patchAvatar(profileAvatar.src)
    .then(() => loading(false, popupSubmitUpd, 'Да'))
  }
})
formUpdate.setEventListeners();

// попап с изображением
const popupWithImage = new PopupWithImage('.popup__overlay_image-popup');
popupWithImage.setEventListeners();

// создание карточки с изображением
function createCard(item, isBin){
  const card = new Card(item, '#element-template', isBin, api,  (link, name) =>
  {
    popupWithImage.open(link, name);
  },
  popupConfirm,
  )
  return card.generateCard();
};

// закрытие изображения
const closeImagePopup = new PopupWithImage('.popup__overlay_image-popup');
closeImagePopup.setEventListeners();

//добавление карточки на страницу
const cardList = new Section({
  renderer : (item) => {
    cardList.setItem(createCard(item, false));
  }
}, list);

//валидация формы попапа добавления карточки
const openValidatorForm = new FormValidator(validationObject, formAddPopup);
openValidatorForm.enableValidation();

//валидация формы попапа редактирования профиля
const editValidatorForm = new FormValidator(validationObject, formEditPopup);
editValidatorForm.enableValidation();

//валидация формы обновления изображения
const updateValidationForm = new FormValidator(validationObject, formUpdatePopup);
updateValidationForm.enableValidation();

//экземпляр Апи для установки данных профиля
export const api = new Api(apiData);
api.getDatas()
  .then(data => {
    profileSub.textContent = data.about;
    profileName.textContent = data.name;
    profileAvatar.src = data.avatar;
    profileAvatar.alt = data.name;
  })

//экземпляр апи для обработки карточек
api.getCards()
  .then(data => {
      cardList.renderItems(data);
    })

// подтверждение удаления карточки изображения
const popupConfirm = new PopupWithForm('.popup__overlay_confirm', () =>{});
//const popupConfirm = new PopupForSubmit('.popup__overlay_confirm')

// обработчики
addButton.addEventListener('click', () => {
  openValidatorForm.disableButton();
  formAdd.open();
});

openButton.addEventListener('click', () => {
  formEdit.setFormData(userInfo.getUserInfo());
  formEdit.open();
});

profileButton.addEventListener('click', () => {
  formUpdate.open();
})




