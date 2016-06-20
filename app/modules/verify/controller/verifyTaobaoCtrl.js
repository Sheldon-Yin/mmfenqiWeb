/**
 * Created by sheldon on 2016/5/23.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/verifyService.js')(app);
        require('services/bridgeService.js')(app);
        app.register.controller('VerifyTaobaoCtrl', ['$scope', 'Verify', '$location', 'Bridge',
            function ($scope, Verify, $location, Bridge) {

                $scope.type = 0;

                $scope.setType = function (x) {
                    $scope.type = x;
                };

                Bridge.appToken(function (response) {

                    $scope.appToken = response;
                    $scope.verifyTaobao = function () {
                        $scope.verifyTaobaoReq = Verify.verifyBusiness().save({
                            account: $scope.account,
                            password: $scope.password,
                            type: $scope.type,
                            appToken: $scope.appToken
                        });
                        $scope.$root.loading = true;
                        $scope.verifyTaobaoReq.$promise.then(function (res) {
                            $scope.$root.loading = false;
                            if (res.result == 0) {
                                Bridge.goBack();
                            } else if (res.result == 1013) {
                                Toast(res.msg)
                            } else {
                                Toast(res.msg)
                            }
                            console.log(res)
                        }).catch(function (error) {
                            $scope.$root.loading = false;
                            console.log(error)
                        });
                    }

                })

            }])
    }
});