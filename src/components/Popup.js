// класс, отвечающий за открытие и закрытие попапа
export class Popup {
  constructor(popupSelector){
    this._popupElement = document.querySelector(popupSelector);
    this._handleClose = this._handleEscClose.bind(this);
  }

// открытие попапа
  open(){
    this._popupElement.classList.add('popup__overlay_active');
    document.addEventListener('keydown',  this._handleClose)
}

// закрытие попапа
  close(){
    this._popupElement.classList.remove('popup__overlay_active');
    document.removeEventListener('keydown', this._handleClose)
  }

// добавление слушателя на эскейп
  _handleEscClose(event){
    if(event.key === 'Escape'){
      this.close();
  }
}

//добавление слушаетля иконке закрытия попапа
  setEventListeners() {
    this._popupElement.querySelector('.popup__button-close').addEventListener('click', () =>{
      this.close();
    })
  }

}
