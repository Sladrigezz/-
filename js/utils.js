// Утилиты
'use strict';


(function () {
    window.getRandomArbitrary = function (min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
})();  //Функция генерации рандомного числа})
