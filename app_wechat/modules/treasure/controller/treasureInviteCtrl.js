/**
 * Created by sheldon on 2016/6/6.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/treasureService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('TreasureInviteCtrl', ['$scope', 'Bridge','Treasure',
            function ($scope, Bridge,Treasure) {

                $scope.showDialog = function () {
                    document.getElementById('introductionDialog').style.display = 'block';
                };

                $scope.closeDialog = function () {
                    document.getElementById('introductionDialog').style.display = 'none';
                };

                Bridge.appToken(function (response) {
                    $scope.appToken = response;
                    $scope.getInviteCode = Treasure.inviteCode().query({
                        appToken: $scope.appToken
                    });
                    $scope.getInviteCode.$promise.then(function (res) {
                        if(res.result == 0){
                            $scope.inviteCode = res.data.recommendedCode;
                        }
                    }).catch(function (error) {
                        Toast(error)
                    });
                    $scope.share = function () {
                        Bridge.share(
                            '可以获得最多30优呗哦，相当于30软妹币，我的邀请码是' +$scope.inviteCode+  '，我在美眉分期等你哦',
                            '快来美眉分期一起一元夺宝吧！',
                            'http://a.app.qq.com/o/simple.jsp?pkgname=com.mmfenqi.mmfq',
                            'http://www.mmfenqi.com/static/masserts/pc/img/login/logo.png',
                            function (res) {
                            }
                        );
                    }
                })

            }])
    }
});