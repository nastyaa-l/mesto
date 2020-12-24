/*Поставим лайк на фотографию*/

let likes = document.querySelectorAll('.element__like');

for (let i=0; i<likes.length; i++){
  likes[i].addEventListener('click',function(){
    likes[i].classList.toggle('element__like_black');
  }
    )
};


