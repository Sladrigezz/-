// модуль, который создаёт данные;
'use strict';


(function () {

    window.photosArray = []

    window.backend.loadData(
        function(response){
            window.photosArray = response;
            window.renderPicture();
        },
        function(error){
            console.error(error)
        },
    )


    //-->! До работы с бэкендом этот модуль использовался для генерации рандомных данных !<--//




    // window.photosArray = [] // Массив объектов

    // var commentsVariants = [
    //     'Всё отлично!',
    //     'В целом всё неплохо. Но не всё.',
    //     'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    //     'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    //     'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    //     'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    // ] //Варианты комментов

    // var descriptionVariants = [
    //     'Тестим новую камеру!',
    //     'Затусили с друзьями на море',
    //     'Как же круто тут кормят',
    //     'Отдыхаем...',
    //     'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    //     'Вот это тачка!'
    // ] //Варианты описания

    // function getComments() {
    //     var comments = [];
    //     comments.length = window.getRandomArbitrary(1, 2);
    //     for (let i = 0; i < comments.length; i++) {
    //         comments[i] = commentsVariants[window.getRandomArbitrary(0, 5)];
    //     }
    //     return comments
    // } //Функция получения массива комментариев (одного или двух рандомных)

    // for (let i = 0; i < 25; i++) {
    //     var obj = {
    //         url: 'photos/' + (i + 1) + '.jpg',
    //         likes: window.getRandomArbitrary(15, 200),
    //         comments: getComments(),
    //         description: descriptionVariants[window.getRandomArbitrary(0, 5)],
    //     }
    //     window.photosArray.push(obj)
    // } //Цикл для массива photosArray. Помещает в массив объекты 25 раз.
}) ();