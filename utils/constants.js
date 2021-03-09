// переменные - кнопки
export const openButton = document.querySelector('.profile__edit-button'),
      addButton = document.querySelector('.profile__add-button'),

// попапы
      popupAdd = document.querySelector('.popup__overlay_add-popup'),
      popupEdit = document.querySelector('.popup__overlay_edit-popup'),
      popupImage = document.querySelector('.popup__overlay_image-popup'),

// формы
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

//списки
      overlayList = Array.from(document.querySelectorAll('.popup__overlay')),
      list = document.querySelector('.elements__items');

//объект с селекторами валидации
export const validationObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputElement: 'popup__input_active',
    errorClass: 'popup__input-error_active'
}
