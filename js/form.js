// Модуль, который работает с формой редактирования изображения.

// Можно загрузить любое изображение и редактировать его.

'use strict';

(function () {

    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png']

    // Открыть редактор фотографии и загрузить фото
    var imgUploadOverlay = document.querySelector('.img-upload__overlay')
    var uploadFile = document.querySelector('.img-upload__start input[type=file]');
    var buttonClose = document.querySelector('.img-upload__cancel')
    var imgUploadPreview = document.querySelector('.img-upload__preview img')

    uploadFile.addEventListener('change', function () {
        var file = uploadFile.files[0];
        var fileName = file.name.toLowerCase();

        var matches = FILE_TYPES.some(function (it) {
            return fileName.endsWith(it);
        });

        if (matches) {
            var reader = new FileReader();

            reader.addEventListener('load', function () {
                imgUploadPreview.src = reader.result;
            });

            reader.readAsDataURL(file);
        }
        imgUploadOverlay.classList.remove('hidden');
        imgUploadPreview.style.transform = 'scale(' + 1 + ')'
        document.querySelector('.img-upload__resize').style.zIndex = "1"
    });

    // Закрыть
    buttonClose.addEventListener('click', function () {
        imgUploadOverlay.classList.add('hidden');
    });


    var scaleLine = document.querySelector('.scale__line')
    var scalePinHendler = scaleLine.querySelector('.scale__pin')
    var scaleLevelHendler = scaleLine.querySelector('.scale__level')
    var effectChrome = document.querySelector('.effects__preview--chrome')
    var effectSepia = document.querySelector('.effects__preview--sepia')
    var effectMarvin = document.querySelector('.effects__preview--marvin')
    var effectPhobos = document.querySelector('.effects__preview--phobos')
    var effectHeat = document.querySelector('.effects__preview--heat')
    var effectNone = document.querySelector('.effects__preview--none')
    var ImgUploadScale = document.querySelector('.img-upload__scale')

    // Фильтры
    var filters = {
        grayscale: 'grayscale',
        sepia: 'sepia',
        invert: 'invert',
        blur: 'blur',
        brightness: 'brightness',
    }

    var currentFilter = null

    // Функция перемещения ползунка в начало и очистка фильтров
    function clearFilter() {
        scalePinHendler.style.left = 0;
        scaleLevelHendler.style.width = 0;
        imgUploadPreview.style.filter = 'none';
        ImgUploadScale.classList.remove('hidden');
    }

    // Функции, задающие currentFilter
    // Нажатине на "стандартний" фильтр
    effectNone.addEventListener('click', function () {
        currentFilter = null;
        clearFilter()
        ImgUploadScale.classList.add('hidden');
    })

    // Фильтр хром
    effectChrome.addEventListener('click', function () {
        currentFilter = filters.grayscale;
        clearFilter()
    })

    // Фильтр сепия
    effectSepia.addEventListener('click', function () {
        currentFilter = filters.sepia;
        clearFilter()
    })

    // Фильтр марвин
    effectMarvin.addEventListener('click', function () {
        currentFilter = filters.invert;
        clearFilter()
    })

    // Фильтр фобос
    effectPhobos.addEventListener('click', function () {
        currentFilter = filters.blur;
        clearFilter()
    })

    // Фильтр зной
    effectHeat.addEventListener('click', function () {
        currentFilter = filters.brightness;
        clearFilter()
    })

    // Изменение размера картинки
    var resizeMinus = document.querySelector('.resize__control--minus')
    var resizePlus = document.querySelector('.resize__control--plus')
    var resizeValue = document.querySelector('.resize__control--value')

    resizeMinus.addEventListener('click', function(evt){
        evt.preventDefault()
        resizeValue.value = Number(resizeValue.value.split('%')[0]) - 10 + '%'
        if (Number(resizeValue.value.split('%')[0]) < 50) {
            resizeValue.value = 50 + '%'
        }
        imgUploadPreview.style.transform = 'scale(' + Number(resizeValue.value.split('%')[0])/100 + ')'
    })

    resizePlus.addEventListener('click', function(evt){
        evt.preventDefault()
        resizeValue.value = Number(resizeValue.value.split('%')[0]) + 10 + '%'
        if (Number(resizeValue.value.split('%')[0]) > 100) {
            resizeValue.value = 100 + '%'
        }
        imgUploadPreview.style.transform = 'scale(' + Number(resizeValue.value.split('%')[0])/100 + ')'
    })

    // Перемещение ползунка фильтров
    scalePinHendler.onmousedown = function (evt) {
        evt.preventDefault(); // предотвратить запуск выделения (действие браузера)

        var shiftX = evt.clientX - scalePinHendler.getBoundingClientRect().left;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);



        function onMouseMove(evt) {
            var newLeft = evt.clientX - shiftX - scaleLine.getBoundingClientRect().left;
            // курсор вышел из слайдера => оставить бегунок в его границах.

            if (newLeft < 0) {
                newLeft = 0;
            }
            var rightEdge = scaleLine.offsetWidth;
            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }

            scalePinHendler.style.left = newLeft + 'px';
            scaleLevelHendler.style.width = scalePinHendler.style.left
            var percentValue = (newLeft / rightEdge) * 100

            // Ранее при клике на фильтр было передано определенное значение в currentFilter, которое и будет меняться
            if (currentFilter === null) {
                imgUploadPreview.style.filter = 'none'
            }

            if (currentFilter === 'grayscale') {
                imgUploadPreview.style.filter = 'grayscale(' + percentValue + '%)'
            }

            if (currentFilter === 'sepia') {
                imgUploadPreview.style.filter = 'sepia(' + percentValue + '%)'
            }

            if (currentFilter === 'invert') {
                imgUploadPreview.style.filter = 'invert(' + percentValue + '%)'
            }

            if (currentFilter === 'blur') {
                imgUploadPreview.style.filter = 'blur(' + percentValue * 0.1 + 'px)'
            }

            if (currentFilter === 'brightness') {
                imgUploadPreview.style.filter = 'brightness(' + percentValue * 2 + '%)'
            }
        }

        function onMouseUp() {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }
    };

    scalePinHendler.ondragstart = function () {
        return false;
    };


    // Отправка на сервер отредактированной фотографии и сброс 
    // всех эффектов и значений (для возможности повторно выбирать одно и то же изображение несколько раз)

    var form = document.querySelector('.img-upload__form')
    form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        window.backend.sendData(new FormData(form), function (response) {
            var effectNoneChecked = document.getElementById('effect-none')
            var textHastag = document.querySelector('.text__hashtags')
            var textComment = document.querySelector('.text__description')
            var input = document.querySelector('.img-upload__input')
            var formClose = document.querySelector('.img-upload__overlay')
            clearFilter()
            ImgUploadScale.classList.add('hidden');
            formClose.classList.add('hidden');
            effectNoneChecked.checked = true
            textHastag.value = ""
            textComment.value = ""
            input.value = ""
        });

    });
})();
