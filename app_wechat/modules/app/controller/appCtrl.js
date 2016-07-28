/**
 * Created by sheldon on 2016/6/23.
 */

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/weChatService.js')(app);
        require('../../../modules/index/controller/indexCtrl.js')(app);
        require('../../../modules/categories/controller/categoriesCtrl.js')(app);
        require('../../../modules/mine/controller/mineCtrl.js')(app);
        require('../../../modules/groupbuy/controller/groupBuyListCtrl.js')(app);
        app.register.controller('AppCtrl', ['$scope','WeChatTitle','$location','Bridge',
            function ($scope,WeChatTitle,$location,Bridge) {

                var storageStatus = window.localStorage.appStatus ? window.localStorage.appStatus : 1;

                $scope.pageStatus = $location.search().status ? $location.search().status : storageStatus;

                $scope.$watch('pageStatus', function(newValue, oldValue) {
                    if (newValue === oldValue){

                    } else if(newValue == 3){
                        Bridge.appToken(function (res) {
                            window.localStorage.appStatus = newValue;
                        })
                    }else {
                        $scope.pageStatus = newValue;
                        window.localStorage.appStatus = newValue;
                        switch (Number(newValue)){
                            case 1:
                                WeChatTitle('美眉分期');
                                break;
                            case 2:
                                WeChatTitle('分类');
                                break;
                            case 3:
                                WeChatTitle('我的');
                                break;
                            case 4:
                                WeChatTitle('拼团');
                                break;
                            default:
                                WeChatTitle('美眉分期');
                        }
                    }
                });

            }])
    }
});
