// модуль для отрисовки увеличенного изображения;
'use strict';

(function () {
    var elementBigPicture = document.querySelector('.big-picture');
    var bigPictureClose = document.querySelector('.big-picture__cancel')


    // Функция открытия увеличенного изображения
    window.openBigPicture = function (photo) {
        elementBigPicture.classList.remove('hidden');

        elementBigPicture.querySelector('img').src = photo.url;

        var likesElements = elementBigPicture.querySelector('.likes-count');
        likesElements.textContent = photo.likes.length; // Количество лайков

        var commentsElements = elementBigPicture.querySelector('.comments-count');
        commentsElements.textContent = photo.comments.length; // Количество комментариев

        var descriptionElements = elementBigPicture.querySelector('.social__caption');
        descriptionElements.textContent = photo.description; // Описание фотографии

        var commentsList = document.querySelector('.social__comments');
        commentsList.innerHTML = ''

        // Список комментариев под фотографией, которые вставляются в блок .social__comments
        for (let index = 0; index < photo.comments.length; index++) {

            var socialCommentslist = document.createElement('li');
            socialCommentslist.classList.add('social__comment')
            socialCommentslist.classList.add('social__comment--text')
            socialCommentslist.innerHTML = '<img class="social__picture" src="'
                + photo.comments[index].avatar +
                '" alt="Аватар комментатора фотографии" width="35" height="35"> <p class="social__text">'
                + photo.comments[index].message + '</p>';
            commentsList.appendChild(socialCommentslist)
        }
    }

    bigPictureClose.addEventListener('click', function () {
        elementBigPicture.classList.add('hidden');
    })


    var hideComment = elementBigPicture.querySelector('.social__comment-count')
    hideComment.classList.add('visually-hidden')
    var hideLoadmore = elementBigPicture.querySelector('.social__comment-count')
    hideLoadmore.classList.add('visually-hidden')


    var imgUploadOverlay = document.querySelector('.img-upload__overlay')
    var uploadFile = document.getElementById('upload-file');
    var buttonClose = document.querySelector('.img-upload__cancel')

    
    uploadFile.addEventListener('change', function () {
        imgUploadOverlay.classList.remove('hidden');
    });

    buttonClose.addEventListener('click', function () {
        imgUploadOverlay.classList.add('hidden');
    });
})()

