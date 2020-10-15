// модуль для отрисовки увеличенного изображения;
'use strict';

(function () {
    var elementBigPicture = document.querySelector('.big-picture');
    var bigPictureClose = document.querySelector('.big-picture__cancel')
    var socialLoadmore = document.querySelector('.social__loadmore')


    // Функция открытия увеличенного изображения
    window.openBigPicture = function (photo) {
        elementBigPicture.classList.remove('hidden');
        socialLoadmore.classList.remove('hidden')

        elementBigPicture.querySelector('img').src = photo.url;

        var likesElements = elementBigPicture.querySelector('.likes-count');
        likesElements.textContent = photo.likes; // Количество лайков

        var commentsElements = elementBigPicture.querySelector('.comments-count');
        commentsElements.textContent = photo.comments.length; // Количество комментариев
        if (photo.comments.length <= 5){
            socialLoadmore.classList.add('hidden')
        }

        var descriptionElements = elementBigPicture.querySelector('.social__caption');
        descriptionElements.textContent = photo.description; // Описание фотографии

        var commentsList = document.querySelector('.social__comments');
        var commentsCopy = photo.comments.slice() 
        var commentsCopy = photo.comments.slice(0, 5) //Показывать сначала 5 комментариев

        // Список комментариев под фотографией, которые вставляются в блок .social__comments
        var commentsLoad = function(){
            commentsList.innerHTML = ''
            for (let index = 0; index < commentsCopy.length; index++) {

                var socialCommentslist = document.createElement('li');
                socialCommentslist.classList.add('social__comment')
                socialCommentslist.classList.add('social__comment--text')
                socialCommentslist.innerHTML = '<img class="social__picture" src="'
                    + commentsCopy[index].avatar +
                    '" alt="Аватар комментатора фотографии" width="35" height="35"> <p class="social__text">'
                    + commentsCopy[index].message + '</p>';
                commentsList.appendChild(socialCommentslist)
            }
        }
        commentsLoad()
        
        // Открытие остальных комментариев
        socialLoadmore.addEventListener('click', function (evt) {
            evt.preventDefault()
            var additionalComments = photo.comments.slice(commentsCopy.length, commentsCopy.length + 5)
            commentsCopy = commentsCopy.concat(additionalComments)
            commentsLoad()
            if (commentsCopy.length === photo.comments.length){
                socialLoadmore.classList.add('hidden')
            } else {
                socialLoadmore.classList.remove('hidden')
            }
        })
    }


    bigPictureClose.addEventListener('click', function () {
        elementBigPicture.classList.add('hidden');
    })


    var hideComment = elementBigPicture.querySelector('.social__comment-count')
    hideComment.classList.add('visually-hidden')
    var hideLoadmore = elementBigPicture.querySelector('.social__comment-count')
    hideLoadmore.classList.add('visually-hidden')
})()

