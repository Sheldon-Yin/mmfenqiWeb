/**
 * Created by sheldon on 2016/8/18.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/weChatService.js')(app);
        require('services/collectionService.js')(app);
        app.register.controller('CollectionCtrl', ['$scope',  '$location', 'Bridge','Collection',
            function ($scope, $location, Bridge,Collection) {

                $scope.showMore=false;

                $scope.currentPage = 0;

                $scope.goods = [];

                Bridge.appToken(function (response) {

                    $scope.appToken = response;

                    $scope.getSome = function () {
                        $scope.collections = Collection.list().query({
                            appToken: $scope.appToken,
                            collectionType: 1,
                            currentPage: $scope.currentPage + 1
                        });

                        $scope.collections.$promise.then(function (res) {
                            if (res.result == 0) {
                                console.log(res.data);

                                $scope.goods = $scope.goods.concat(res.data.goodsItemList);

                                $scope.totalPage=res.data.page.totalPage;
                                $scope.currentPage = $scope.currentPage + 1;

                                if($scope.totalPage>$scope.currentPage){
                                    $scope.showMore=true;
                                }else{
                                    $scope.showMore=false;
                                }
                            } else {
                                Toast(res.msg, 3000);
                                $scope.loadError = true;
                            }
                        }).catch(function (error) {
                            Toast(error, 2000);
                            $scope.loadError = true;
                        });
                    }
                    $scope.getSome();
                });






                $scope.goToGoodsDetails = function (x) {
                    Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/goods?goodsId=' + x.goodsItem.goodsHerf + '&collectionId=' + x.collectionId), '收藏产品')
                };

                $scope.getMore = function () {


                    if ($scope.totalPage > $scope.currentPage){
                        $scope.getSome()
                    } else {
                        Toast('没有更多数据')
                    }


                }

            }])
    }
});
