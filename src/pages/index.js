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
import {openButton, addButton, formAddPopup, formEditPopup, inputName, profileAvatar, profileName, profileSub,
profileData, inputSub, list, validationObject, initialCards, formUpdatePopup, profileButton, changeAvatar, apiLikes} from "../utils/constants.js";


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
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData)
    api.patchDatas(formData);
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
      const card = createCard(data, true);
      cardList.prependItem(card);
      apiCards.postCards(data);
  }
})
formAdd.setEventListeners();

// форма редактирования аватара
const formUpdate = new PopupWithForm ('.popup__overlay_update', {
  handleFormSubmit: (formData) => {
    profileAvatar.src = formData.profileUrl;
    apiUpdate.patchAvatar(profileAvatar.src);
  }
})
formUpdate.setEventListeners();

// попап с изображением
const popupWithImage = new PopupWithImage('.popup__overlay_image-popup');
popupWithImage.setEventListeners();

// создание карточки с изображением
function createCard(item, isBin){
  const card = new Card(item, '#element-template', isBin, apiLiked, (link, name) =>
  {
    popupWithImage.open(link, name);
  });
  return card.generateCard();
};

// закрытие изображения
const closeImagePopup = new PopupWithImage('.popup__overlay_image-popup');
closeImagePopup.setEventListeners();

//добавление карточки на страницу
const cardList = new Section({
  data: initialCards,
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
const api = new Api(profileData);
api.getDatas()
  .then(data => {
    profileSub.textContent = data.about;
    profileName.textContent = data.name;
    profileAvatar.src = data.avatar;
    profileAvatar.alt = data.name;
  })

//экземпляр апи для обработки карточек
const apiCards = new Api(initialCards);
apiCards.getDatas()
  .then(data => {

    // добавление карточек на страницу
    const cardList = new Section({
        data: data,
        renderer : (item) => {
          cardList.setItem(createCard(item, false));
        }
      }, list);
      cardList.renderItems();
    });

// экземпляр апи для обновления изображения
const apiUpdate = new Api(changeAvatar);
const apiLiked = new Api(apiLikes);

// подтверждение удаления карточки изображения
export const deleteCard = new Popup('.popup__overlay_confirm');
deleteCard.setEventListeners();

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




