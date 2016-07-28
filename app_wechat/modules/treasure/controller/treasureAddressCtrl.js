/**
 * Created by sheldon on 2016/6/6.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/treasureService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('TreasureAddressCtrl', ['$scope', 'Treasure', 'Bridge',
            function ($scope, Treasure, Bridge) {

                Bridge.appToken(function (res) {
                    $scope.appToken = res;

                    $scope.initLocation = Treasure.getLocation().query({
                        appToken: $scope.appToken
                    });
                    $scope.initLocation.$promise.then(function (res) {
                        if (res.result == 0) {
                            $scope.location = res.data;

                            $scope.saveLocation = function () {
                                $scope.saveLocationReq = Treasure.saveLocation().save({
                                    appToken: $scope.appToken,
                                    address: $scope.location.address
                                });
                                $scope.saveLocationReq.$promise.then(function (res) {
                                    if (res.result == 0) {
                                        Toast('修改成功')
                                    } else {
                                        Toast(res.msg)
                                    }
                                }).catch(function (error) {
                                    Toast(error)
                                })
                            }

                        } else {
                            Toast(res.msg)
                        }
                    }).catch(function (error) {
                        Toast(error)
                    });

                })

            }])
    }
});