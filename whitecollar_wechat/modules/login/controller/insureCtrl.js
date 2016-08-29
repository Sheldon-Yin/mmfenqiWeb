/**
 * Created by ChinaHp on 2016/8/8.
 */
'use strict';
define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/loginService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('InsureCtrl', ['$scope', 'Login', '$location', 'WeChatTitle', 'Bridge',
            function ($scope, Login, $location, WeChatTitle, Bridge) {
        }
    ])
}
});
