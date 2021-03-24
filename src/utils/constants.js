// переменные - кнопки
export const openButton = document.querySelector('.profile__edit-button'),
      addButton = document.querySelector('.profile__add-button'),
      profileButton = document.querySelector('.profile__avatar-edit'),
      popupSubmitEdit = document.querySelector('.popup__submit_form-edit'),
      popupSubmitAdd = document.querySelector('.popup__submit_form-add'),
      popupSubmitUpd = document.querySelector('.popup__submit_update'),

// попапы
      popupAdd = document.querySelector('.popup__overlay_add-popup'),
      popupEdit = document.querySelector('.popup__overlay_edit-popup'),
      popupImage = document.querySelector('.popup__overlay_image-popup'),

// формы
      formAddPopup = document.querySelector('.popup__form_add'),
      formEditPopup = document.querySelector('.popup__form_edit'),
      formUpdatePopup = document.querySelector('.popup__form_update'),

// инпуты
      inputName = document.querySelector('.popup__input_form_name'),
      inputSub = document.querySelector('.popup__input_form_subscription'),

//списки
      list = document.querySelector('.elements__items'),

// профиль
      profileName = document.querySelector('.profile__name'),
      profileAvatar = document.querySelector('.profile__avatar'),
      profileSub = document.querySelector('.profile__subscription');

//объект с селекторами валидации
export const validationObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputElement: 'popup__input_active',
    errorClass: 'popup__input-error_active'
};

// запрос на начальные карточки
export const initialCards = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-21/cards',
  headers: {
    'Content-Type' : 'application/json',
    authorization: 'dadbc927-3d26-4ae7-ad00-1ca5a4a7f849',

  },
};

// запрос на данные пользователя
export const profileData = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-21/users/me ',
  headers: {
    'Content-Type' : 'application/json',
    authorization: 'dadbc927-3d26-4ae7-ad00-1ca5a4a7f849',
  },
};

export const changeAvatar = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-21/users/me/avatar ',
  headers: {
    'Content-Type' : 'application/json',
    authorization: 'dadbc927-3d26-4ae7-ad00-1ca5a4a7f849',
  },
}

export const apiLikes = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-21/cards/likes/ ',
  headers: {
    'Content-Type' : 'application/json',
    authorization: 'dadbc927-3d26-4ae7-ad00-1ca5a4a7f849',
  },
}
