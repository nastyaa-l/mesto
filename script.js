let openButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.overlay__button');
let overlay = document.querySelector('.overlay');
let form = overlay.querySelector('.overlay__form');
let buttonSubmit = overlay.querySelector('.overlay__submit');
let profileName = document.querySelector('.profile__name')
let newName = overlay.querySelector('.overlay__input_form_name');
let profileSub = document.querySelector('.profile__subscription');
let newSub = overlay.querySelector('.overlay__input_form_subscription');
const likes = document.querySelectorAll('.element__like'),
      addButton = document.querySelector('.profile__add-button'),
      popupEdit = document.querySelector('.overlay__popup_edit-form'),
      popupAdd = document.querySelector('.overlay__popup_add-form'),
      bin = document.querySelectorAll('.element__bin');



function openPopup(){
  overlay.classList.add('overlay_active');
  newName.value = profileName.textContent;
  newSub.value = profileSub.textContent;
}

function closePopup() {
  overlay.classList.remove('overlay_active');
}

function submit(event){
  event.preventDefault();
  profileName.textContent = newName.value;
  profileSub.textContent = newSub.value;
  closePopup();
}

openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', submit);

//Возможно, в будущем придется удалить
overlay.addEventListener('click', function(event){
  if (event.target === event.currentTarget){
    closePopup();
  }
  });

// лайки

likes.forEach(item => {
  item.addEventListener('click', function(){
    item.classList.toggle('element__like_black')
  })
})


//удаение элементов

bin.forEach(item => {
item.addEventListener('click', function(){
item.parentElement.remove();
})
})

/*let likes = document.querySelectorAll('.element__like');
for (let i=0; i<likes.length; i++){
  likes[i].addEventListener('click',function(){
    likes[i].classList.toggle('element__like_black');
  }
    )
};*/
