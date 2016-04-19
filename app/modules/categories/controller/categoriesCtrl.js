/**
 * Created by sheldon on 2016/4/19.
 */

'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        app.register.controller('CategoriesCtrl', ['$scope',
            function ($scope) {
                $scope.goBack = function () {
                    window.history.back(-1);
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

                $scope.nowProject = '全部类目';

                $scope.setItems = function (project) {
                    $scope.nowProject = project;
                    $scope.selectState = 0;
                }
            }])
    }
});