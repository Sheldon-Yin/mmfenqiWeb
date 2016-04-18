/**
 * Created by sheldon on 2016/3/25.
 */

'use strict'
define(function (require, exports, module) {
    module.exports = function (app) {
        app.register.controller('ListCtrl', ['$scope',
            function ($scope) {
                
                $scope.goBack = function () {
                    window.history.go(-1);
                };
                $scope.$root.title = '美眉分期';
                $scope.baseUrl = 'modules/groupbuy/';
                $scope.orderProp = 'age';
                $scope.selectState = 0;
                $scope.citys =
                    [
                        {x: 1},
                        {x: 2},
                        {x: 3},
                        {x: 1},
                        {x: 2},
                        {x: 3}
                    ];
                $scope.setItems = function (items) {
                    $scope.items = items;
                };

                $scope.projects = [
                    {
                        project : "面部轮廓",
                        items : [
                            "瘦脸针",
                            "半永久妆",
                            "祛痘"
                        ]
                    },
                    {
                        project : "眼部",
                        items : [
                            "单眼皮",
                            "双眼皮",
                            "三眼神童"
                        ]
                    },
                    {
                        project : "鼻部",
                        items : [
                            "隆鼻",
                            "牙齿矫正",
                        ]
                    },
                    {
                        project : "面部轮廓",
                        items : [
                            "瘦脸针",
                            "半永久妆",
                            "祛痘"
                        ]
                    },
                    {
                        project : "面部轮廓",
                        items : [
                            "瘦脸针",
                            "半永久妆",
                            "祛痘"
                        ]
                    },
                    {
                        project : "面部轮廓",
                        items : [
                            "瘦脸针",
                            "半永久妆",
                            "祛痘"
                        ]
                    },
                    {
                        project : "面部轮廓",
                        items : [
                            "瘦脸针",
                            "半永久妆",
                            "祛痘"
                        ]
                    },
                    {
                        project : "面部轮廓",
                        items : [
                            "瘦脸针",
                            "半永久妆",
                            "祛痘"
                        ]
                    }
                ];
            }]);
    }
});