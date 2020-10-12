// модуль для отрисовки миниатюры (маленьких картинок вокруг центрального лого);
'use strict';

(function () {
    var template = document.querySelector('#picture');

    for (let i = 0; i < 25; i++) {
        var element = template.content.cloneNode(true);
        var image = element.querySelector('.picture__img')
        image.src = window.photosArray[i].url

        var likesElement = element.querySelector('.picture__stat--likes');
        likesElement.textContent = window.photosArray[i].likes

        var commentsElement = element.querySelector('.picture__stat--comments');
        commentsElement.textContent = window.photosArray[i].comments.length

        var picturesWrapper = document.querySelector('.pictures');
        picturesWrapper.appendChild(element);

        image.addEventListener('click', function () {
            window.openBigPicture(window.photosArray[i])
        })
    }
}) ()
