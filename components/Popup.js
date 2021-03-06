// класс, отвечающий за открытие и закрытие попапа
export class Popup {
  constructor(popupSelector){
    this._popupSelector = popupSelector;
  }

// открытие попапа
  open(){
    this._popupSelector.classList.add('popup__overlay_active');
    document.addEventListener('keydown', this._handleEscClose.bind(this))
  }

// закрытие попапа
  close(){
    this._popupSelector.classList.remove('popup__overlay_active');
    document.removeEventListener('keydown', this._handleEscClose.bind(this))
  }

// добавление слушателя на эскейп
  _handleEscClose(event){
    if(event.key === 'Escape'){
      this.close();
  }
}

//добавление слушаетля иконке закрытия попапа
  setEventListeners() {
    this._popupSelector.querySelector('.popup__button-close').addEventListener('click', () =>{
      this.close();
    })
  }

}
