/**
 * Created by sheldon on 2016/8/3.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/verifyService.js')(app);
        require('services/weChatService.js')(app);
        require('../../../modules/verify/controller/verifyCollarFirstCtrl.js')(app);
        require('../../../modules/verify/controller/verifyCollarSecondCtrl.js')(app);
        require('../../../modules/verify/controller/verifyCollarThirdCtrl.js')(app);
        require('../../../modules/verify/controller/verifyStudentFirstCtrl.js')(app);
        require('../../../modules/verify/controller/verifyStudentSecondCtrl.js')(app);
        require('../../../modules/verify/controller/verifyStudentThirdCtrl.js')(app);
        require('../../../modules/verify/controller/verifyBankForthCtrl.js')(app);
        require('../../../modules/verify/controller/verifyZmFifthCtrl.js')(app);
        require('../../../modules/verify/controller/verifyTaobaoSixthCtrl.js')(app);
        require('../../../modules/verify/controller/verifyCompleteCtrl.js')(app);
        app.register.controller('VerifyDispatcherCtrl', ['$scope', 'Verify', 'WeChat','$location','WeChatTitle','Bridge',
            function ($scope, Verify, WeChat,$location,WeChatTitle,Bridge) {

                $scope.nowPage = '';
                $scope.nextPage = '';
                $scope.userType = '';
                Bridge.appToken(function (res) {
                    $scope.appToken = res;
                });

                $scope.getPageInfo = function (nowPage) {
                    Verify.verifyGetPages().query({
                        indxStep: nowPage,
                        appToken: $scope.appToken
                    }).$promise.then(function (res) {
                        if (res.result == 0){
                            $scope.nowPage = res.data.currentStep;
                            $scope.userType = res.data.userType;
                            $scope.nextPage = res.data.nextStep;
                        }else if (res.result == 1019){
                            Bridge.realName();
                        }
                        console.log(res);
                    }).catch(function (err) {
                        console.log(err)
                    })
                };

                $scope.getPageInfo();

                $scope.jumpToNext = function () {

                    $scope.getPageInfo($scope.nextPage)
                }

            }])
    }
});
