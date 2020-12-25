let likes = document.querySelectorAll('.element__like');
let openButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.overlay__button');
let overlay = document.querySelector('.overlay');
let form = overlay.querySelector('.overlay__form');
let buttonSubmit = overlay.querySelector('.overlay__submit');
let profileName = document.querySelector('.profile__name')
let newName = overlay.querySelector('.overlay__name');
let profileSub = document.querySelector('.profile__subscription');
let newSub = overlay.querySelector('.overlay__profile');

for (let i=0; i<likes.length; i++){
  likes[i].addEventListener('click',function(){
    likes[i].classList.toggle('element__like_black');
  }
    )
};

function togglePopup() {
  overlay.classList.toggle('overlay_active');
}

openButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
buttonSubmit.addEventListener('click',togglePopup);


overlay.addEventListener('click', function(event){
if (event.target === event.currentTarget){
  togglePopup();
}
})

buttonSubmit.addEventListener('click', ()=>{
profileName.textContent = newName.value;
profileSub.textContent = newSub.value;
})

form.addEventListener('submit', event => {
  event.preventDefault();
});



