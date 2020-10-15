// модуль для отрисовки миниатюры (маленьких картинок вокруг центрального лого);
'use strict';

(function () {
    var template = document.querySelector('#picture');

    window.renderPicture = function (array) {
        for (let i = 0; i < array.length; i++) {
            var element = template.content.cloneNode(true);
            var image = element.querySelector('.picture__img')
            image.src = array[i].url

            var likesElement = element.querySelector('.picture__stat--likes');
            likesElement.textContent = array[i].likes

            var commentsElement = element.querySelector('.picture__stat--comments');
            commentsElement.textContent = array[i].comments.length

            var picturesWrapper = document.querySelector('.pictures');
            picturesWrapper.appendChild(element);

            image.addEventListener('click', function () {
                window.openBigPicture(array[i])
            })
        }
    }
    window.renderPicture(window.photosArray)


    // Показ верхнего меню
    var imgFilters = document.querySelector('.img-filters')
    imgFilters.classList.remove('img-filters--inactive')


    var filterPopoular = document.getElementById('filter-popular')
    var filterNew = document.getElementById('filter-new')
    var filterDicussed = document.getElementById('filter-discussed')


    // Функция удаления активного элемента в верхнем меню
    var removeImgFilterActive = function () {
        filterPopoular.classList.remove('img-filters__button--active')
        filterNew.classList.remove('img-filters__button--active')
        filterDicussed.classList.remove('img-filters__button--active')
    }

    // Удаление фотографий
    var removeWrapperChild = function () {
        var picturesWrapper = document.querySelector('.pictures');
        var picturesWrapperLink = document.querySelectorAll("a.picture__link");
        for (let index = 0; index < picturesWrapperLink.length; index++) {
            picturesWrapper.removeChild(picturesWrapperLink[index]);
        }
    }


    // Нажатие на "Популярное"
    filterPopoular.addEventListener('click', function (evt) {
        evt.preventDefault()
        removeWrapperChild()
        removeImgFilterActive()
        filterPopoular.classList.add('img-filters__button--active')
        var photosArrayPopoular = window.photosArray.slice() 
        window.renderPicture(photosArrayPopoular)
    })

    // Нажатие на "Новые"
    filterNew.addEventListener('click', function (evt) {
        evt.preventDefault()
        removeWrapperChild()
        removeImgFilterActive()
        filterNew.classList.add('img-filters__button--active')
        var photosArrayNewRandom = window.photosArray.slice() 
        photosArrayNewRandom.sort(function () {
            return Math.random() - 0.5
        })
        var photosArrayNew = photosArrayNewRandom.slice(0, 10)
        window.renderPicture(photosArrayNew)
    })

    // Нажатие на "Обсуждаемые"
    filterDicussed.addEventListener('click', function (evt) {
        evt.preventDefault()
        removeWrapperChild()
        removeImgFilterActive()
        filterDicussed.classList.add('img-filters__button--active')
        var photosArrayDicussed = window.photosArray.slice() 
        photosArrayDicussed.sort(function (a, b) {
            return b.comments.length - a.comments.length
        })
        window.renderPicture(photosArrayDicussed)
    })



})()
