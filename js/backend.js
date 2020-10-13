'use strict';
// Модуль получения и отправки данных


    (function () {
        var Url ={
            POST: 'https://javascript.pages.academy/kekstagram',
            GET: 'https://javascript.pages.academy/kekstagram/data'
        };
    
        var getRequest = function (successHandler, errorHandler) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
    
            xhr.addEventListener('load', function () {
                if (xhr.status === 200) {
                    successHandler(xhr.response);
                } else {
                    errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
                }
            });
            xhr.addEventListener('error', function () {
                errorHandler('Произошла ошибка соединения');
            });
            xhr.addEventListener('timeout', function () {
                errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
            });
    
            xhr.timeout = 10000; //10 секунд
            return xhr
        };
    
       
        // загрузка данных
        var loadData = function (successHandler, errorHandler) {
            var xhr = getRequest(successHandler, errorHandler);
            xhr.open('GET', Url.GET);
            xhr.send();
        }
        
        
        // отправка данных
        var sendData = function (data, successHandler, errorHandler) {
            var xhr = getRequest(successHandler, errorHandler);
            xhr.open('POST', Url.POST);
            xhr.send(data);
        }
    
        var errorHandler = function (text) {
            var node = document.createElement('div');
            node.classList.add('error-node');
            document.body.insertAdjacentElement('afterbegin', node);
            node.textContent = text;
            node.addEventListener('click', removeErrorMessageHandler);
            return node;
        };
    
        var removeErrorMessageHandler = function (evt) {
            document.body.removeChild(evt.target);
            evt.target.removeEventListener('click', removeErrorMessageHandler);
        };
    
        window.backend = {
            loadData: loadData,
            sendData: sendData,
            errorHandler: errorHandler
        };

    }) ();
