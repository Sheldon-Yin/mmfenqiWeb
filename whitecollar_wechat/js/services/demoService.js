/* Services */
define(function (require, exports, module) {
    'use strict';
    console.log('service');
    module.exports = function (app) {
        app.register.factory('Phone', ['$resource',
            function ($resource) {
                return $resource('modules/demo/phones/:phoneId.json', {}, {
                    query: {method: 'GET', params: {phoneId: 'phones'}, isArray: true}
                });
            }]);
    }
});