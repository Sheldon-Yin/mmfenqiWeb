/**
 * Created by sheldon on 2016/5/27.
 */
define(function (require, exports, module) {
    module.exports = function (app) {
        app.register.controller('TreasureIndexCtrl', ['$scope', '$location','Treasure',
            function ($scope, $location,Treasure) {

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

                        if (document.documentElement.scrollTop == 0 && document.body.scrollTop == 0)

                            clearInterval(timer);

                    }, 10);
                };

                $scope.backTop();

                $scope.changeTreasureStatus = function (x) {
                    $scope.treasureStatus = x;
                    $scope.initTreasureList();
                };

                $scope.goToDetail = function (x) {
                    $location.url('/treasure/detail?id='+ x.id);
                    window.onscroll = function () {
                    };
                };

                $scope.goToLinks = function (x) {
                    window.location.href = x;
                }

            }])
    }
});
