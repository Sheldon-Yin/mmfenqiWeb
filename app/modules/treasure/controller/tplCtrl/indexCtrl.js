/**
 * Created by sheldon on 2016/5/27.
 */
define(function (require, exports, module) {
    module.exports = function (app) {
        app.register.controller('TreasureIndexCtrl', ['$scope', '$location','Treasure','Bridge',
            function ($scope, $location,Treasure,Bridge) {

                $scope.baseUrl = $location.absUrl().split('#')[0];

                console.log('index');
                $scope.treasureStatus = 1;

                $scope.initTreasureList = function () {
                    $scope.treasureList = Treasure.treasureList().query({
                        queryType: $scope.treasureStatus
                    });
                    $scope.treasureList.$promise.then(function (res) {
                        console.log(res);
                        $scope.goods = res.data.luckysweepstakes;
                        $scope.banner = res.data.sysAdvertisingLinks;
                        console.log($scope.banner);
                    }).catch(function (error) {
                        console.log(error)
                    })
                };

                $scope.initTreasureList();

                $scope.backTop = function () {
                    var timer = setInterval(function () {

                        window.scrollBy(0, -100);

                        if (document.documentElement.scrollTop < 1 && document.body.scrollTop < 1)

                            clearInterval(timer);

                    }, 10);
                };

                $scope.changeTreasureStatus = function (x) {
                    $scope.treasureStatus = x;
                    $scope.initTreasureList();
                };

                $scope.goToDetail = function (x) {
                    Bridge.jumpTo($scope.baseUrl+'#/treasure/detail?id='+ x.id,'宝贝详情')
                };

                $scope.jumpTo = function(x,title){
                    Bridge.jumpTo(x,title)
                };

                $scope.jumpToInvite = function () {
                    Bridge.jumpTo($scope.baseUrl+'#/treasure/invite','邀请好友')
                };

                $scope.jumpToShare = function () {
                    Bridge.jumpTo($scope.baseUrl + '#/treasure/share/list','晒单')
                };

                $scope.goToLinks = function (x) {
                    Bridge.jumpTo( x,'一元夺宝')
                };

            }])
    }
});
