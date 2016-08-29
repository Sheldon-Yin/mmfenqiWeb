/**
 * Created by sheldon on 2016/8/18.
 */
'use strict';

define(function (require, exports, module) {
    'use strict';
    console.log('service');
    module.exports = function (app) {
        app.register.factory('Collection', ['$resource',
            function ($resource) {
                return {
                    add: function () {
                        return $resource('/appinterface/products_collection', {}, {
                            save: {method: 'POST',params:{}}
                        })
                    },
                    cancel: function () {
                        return $resource('/appinterface/cancel_collection', {}, {
                            save: {method: 'POST',params:{}}
                        })
                    },
                    list: function () {
                        return $resource('/appinterface/my_goods_collection', {}, {
                            query: {method: 'GET',params:{}}
                        })
                    }
                }
            }
        ])
    }
});
