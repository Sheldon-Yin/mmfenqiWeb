/**
 * Created by sheldon on 2016/3/25.
 */

'use strict';
define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/goodsSearchService.js')(app);
        require('services/hospitalService.js')(app);
        require('services/categoriesService.js')(app);
        app.register.controller('ListCtrl', ['$scope', 'GoodsSearch', 'Hospital', 'Categories','$timeout','$location',
            function ($scope, GoodsSearch, Hospital, Categories,$timeout,$location) {

                var searchObject = $location.search();
                console.log(searchObject);

                $scope.parentCategoryId = $location.search().parentId ? $location.search().parentId : 0;
                $scope.subCategoryId = $location.search().subId ? $location.search().subId : 0;
                $scope.hospitalId = $location.search().hospitalId ? $location.search().hospitalId : 0;
                $scope.sortId = $location.search().sortId ? $location.search().sortId : 1;
                $scope.cityId = $location.search().cityId ? $location.search().cityId : 2;
                $scope.searchInfo = $location.search().keyword ? $location.search().keyword : '';
                $scope.cityName = $location.search().cityName ? $location.search().cityName : '';


                $scope.refreshData = function () {
                    $scope.goods = GoodsSearch.query(
                        {
                            sortId: $scope.sortId,
                            cityId: $scope.cityId,
                            hospitalId: $scope.hospitalId,
                            parentCategoryId: $scope.parentCategoryId,
                            categoryId: $scope.subCategoryId,
                            searchInfo: $scope.searchInfo,
                            cityName: $scope.cityName
                        }
                    )
                };

                $scope.hospital = Hospital.query();
                $scope.categories = Categories.query();
                $scope.refreshData();

                //$scope.goBack = function () {
                //    window.history.go(-1);
                //};

                $scope.jumpToGoods = function (x) {
                    if (myBridge) {
                        var jumpUrl = encodeURI($location.absUrl().split('#')[0] + x);
                        myBridge.callHandler('sendMessageToApp', {
                            type: 2, data: {
                                url: jumpUrl,
                                title: '产品详情',
                                leftNavItems: [1],
                                rightNavItems: [0]
                            }
                        }, function (response) {
                            //todo custom
                        });
                    }
                };

                //类目设置模块开始
                $scope.nowCategory = '全部类目';
                $scope.nowCategory = $location.search().parentName ? $location.search().parentName : $scope.nowCategory;
                $scope.nowCategory = $location.search().subName ? $location.search().subName : $scope.nowCategory;
                $scope.chosenParentCategory = '';
                $scope.setParentItems = function (parentCategory) {
                    $scope.chosenParentCategory = parentCategory.categoryName;
                    $scope.subCategories = parentCategory.categoryList;
                    $scope.parentCategoryId = parentCategory.categoryId;
                    $scope.subCategoryId = 0;
                };

                $scope.setAllParentCategories = function () {
                    $scope.chosenParentCategory = '';
                    $scope.subCategories = '';
                    $scope.nowCategory = '全部类目';
                    $scope.selectState = 0;
                    $scope.parentCategoryId = 0;
                    $scope.subCategoryId = 0;
                    $scope.refreshData();
                };

                $scope.setSubItems = function (subCategory) {
                    $scope.chosenSubCategory = subCategory.categoryName;
                    $scope.nowCategory = subCategory.categoryName;
                    $scope.selectState = 0;
                    $scope.subCategoryId = subCategory.categoryId;
                    $scope.refreshData();
                };

                $scope.setAllSubItems = function () {
                    $scope.chosenSubCategory = '';
                    $scope.nowCategory = $scope.chosenParentCategory;
                    $scope.selectState = 0;
                    $scope.subCategoryId = 0;
                    $scope.refreshData();
                };
                //类目设置模块结束

                //医院设置模块开始
                $scope.nowHospital = '全部医院';
                $scope.setHospital = function (hospital) {
                    $scope.selectState = 0;
                    $scope.nowHospital = hospital.hospitalName;
                    $scope.hospitalId = hospital.hospitalId;
                    $scope.refreshData();
                };

                $scope.setAllHospital = function () {
                    $scope.selectState = 0;
                    $scope.nowHospital = '全部医院';
                    $scope.hospitalId = 0;
                    $scope.refreshData();
                };
                //医院设置模块结束

                //排序方式开始
                $scope.nowSort = '销量最高';
                $scope.setSort = function (x) {
                    $scope.sortId = x;
                    switch (x) {
                        case 1:
                            $scope.nowSort = '销量最高';
                            break;
                        case 2:
                            $scope.nowSort = '价格最低';
                            break;
                        case 3:
                            $scope.nowSort = '最新上架';
                            break;
                        default:
                            break;
                    }
                    $scope.selectState = 0;
                    $scope.refreshData();
                };
                //排序方式结束

                var timeout;

                //监控数据加载情况
                $scope.loading = function () {
                    if($scope.goods.data==undefined){
                        console.log('数据刷新了');
                        timeout = $timeout(function() {
                            $scope.badConnection = 1;
                        }, 10000);
                    }
                };
                $scope.loading();

                //设置timeout监控是否加载到，长时加载不到显示服务器错误
                $scope.$watch('goods', function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                        $scope.badConnection = 0;
                        if (timeout) $timeout.cancel(timeout);
                        $scope.loading();
                    }
                }, true);


                if (myBridge) {
                    myBridge.registerHandler('sendMessageToHTML', function (message, callback) {
                        var jumpUrl;
                        if (message.type==10001) {
                            jumpUrl = encodeURI($location.absUrl().split('#')[0] + '#/list?keyword='+message.data+'&cityName='+$scope.cityName);
                            window.location.href= jumpUrl;
                        } else {
                            myBridge.callHandler('sendMessageToApp', {type: message, data: {}}, function (response) {
                                //todo custom
                            });
                        }

                    });
                }

            }]);
    }
});