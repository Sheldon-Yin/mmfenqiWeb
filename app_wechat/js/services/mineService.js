/**
 * Created by sheldon on 2016/6/29.
 */
define(function (require, exports, module) {
    'use strict';
    console.log('service');
    module.exports = function (app) {
        app.register.factory(
            'Mine', ['$resource', function ($resource) {
                return {
                    queryUserCenter: function () {
                        return $resource('/appinterface/user_centre',{},{
                            query:{
                                method:'GET',params:{
                                }
                            }
                        })
                    }
                }
            }]
        )
    }
});