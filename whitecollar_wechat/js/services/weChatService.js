/**
 * Created by sheldon on 2016/5/24.
 */
define(function (require, exports, module) {
    'use strict';
    console.log('service');
    module.exports = function (app) {
        app.register.factory('WeChat', ['$resource',
            function ($resource) {
                return $resource('/weixin/getJsSDKConfig', {}, {
                    query: {
                        method: 'GET', params: {}
                    }
                });
            }]);
        app.register.factory('WeChatTitle',
            function () {
                return function (title) {
                    var body = document.getElementsByTagName('body')[0];
                    document.title = title;
                    var iframe = document.createElement("iframe");
                    iframe.style.display = 'none';
                    iframe.setAttribute("src", "img/empty.png");

                    iframe.addEventListener('load', function () {
                        setTimeout(function () {
                            iframe.removeEventListener('load', function () {
                                console.log('removed')
                            });
                            document.body.removeChild(iframe);
                        }, 0);
                    });
                    document.body.appendChild(iframe);
                }
            });
    }
});