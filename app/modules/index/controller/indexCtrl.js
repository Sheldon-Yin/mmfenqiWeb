/**
 * Created by sheldon on 2016/4/13.
 */


define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/indexService.js')(app);
        app.register.controller('IndexCtrl', ['$scope', 'Index', '$location',
            function ($scope, Index, $location) {
                $scope.cityName = '杭州';
                $scope.cityId = 2;
                $scope.cityName = !!$location.search().cityName ? $location.search().cityName : $scope.cityName;
                $scope.index = Index.get({cityId: $scope.cityId, index: 1, cityName: $scope.cityName});

                $scope.index.$promise.then(function (res) {
                    if (res.result != 0) {
                        Toast(res.msg, 3000);
                        $scope.loadError = true;
                    }else {
                        if (res.data.isCityOpen == false){
                            document.getElementById('notOpenTips').style.display = 'block';
                        }else if(res.data.isCityOpoen == true) {
                            document.getElementById('notOpenTips').style.display = 'none';
                        }
                    }
                }).catch(function (error) {
                    $scope.loadError = true;
                    Toast('服务器返回失败');
                });

                var swiper;
                $scope.initBannerSwiper = function () {
                    //下面是在table render完成后执行的js
                    swiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        //loop: true,
                        autoplay: 5000
                    });
                    //初始化banner图的swiper
                };
                $scope.initBannerSwiper();


                $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
                    swiper.update();
                });

                if (myBridge) {
                    myBridge.callHandler('sendMessageToApp', {type: 6, data: {}}, function (response) {
                        $scope.$apply(function () {
                            if (response == "") {
                                window.localStorage.cityName = '';
                                $scope.index = Index.get({cityId: window.localStorage.cityName, index: 1});
                                $scope.index.$promise.then(function (res) {
                                    if (res.result != 0) {
                                        Toast(res.msg, 3000);
                                        $scope.loadError = true;
                                    }else {
                                        if (res.data.isCityOpen == false){
                                            document.getElementById('notOpenTips').style.display = 'block';
                                        }else if(res.data.isCityOpoen == true) {
                                            document.getElementById('notOpenTips').style.display = 'none';
                                        }
                                    }
                                }).catch(function (error) {
                                    $scope.loadError = true;
                                    Toast('服务器返回失败');
                                });
                            } else {
                                window.localStorage.cityName = response;
                                $scope.index = Index.get({cityName: window.localStorage.cityName, index: 1});
                                $scope.index.$promise.then(function (res) {
                                    if (res.result != 0) {
                                        Toast(res.msg, 3000);
                                        $scope.loadError = true;
                                    }else {
                                        if (res.data.isCityOpen == false){
                                            document.getElementById('notOpenTips').style.display = 'block';
                                        }else if(res.data.isCityOpoen == true) {
                                            document.getElementById('notOpenTips').style.display = 'none';
                                        }
                                    }
                                }).catch(function (error) {
                                    $scope.loadError = true;
                                    Toast('服务器返回失败');
                                });
                            }
                        });
                    });
                }

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

                $scope.jumpToRecommend = function () {
                    if (myBridge) {
                        var jumpUrl = encodeURI($location.absUrl().split('#')[0] + '#/recommend' + '?cityName=' + $scope.cityName);
                        myBridge.callHandler('sendMessageToApp', {
                            type: 2, data: {
                                url: jumpUrl,
                                title: '精品推荐',
                                leftNavItems: [1]
                            }
                        }, function (response) {
                            //todo custom
                        });
                    }
                };

                $scope.jumpToList = function (x) {
                    if (myBridge) {
                        var jumpUrl = encodeURI($location.absUrl().split('#')[0] + '#/list?parentId=' + x.categoryHerf + '&parentName=' + x.categoryName + '&cityName=' + $scope.cityName);
                        myBridge.callHandler('sendMessageToApp', {
                            type: 2, data: {
                                url: jumpUrl,
                                hasSearchView: true,
                                leftNavItems: [1]
                            }
                        }, function (response) {
                            //todo custom
                        });
                    }
                };

                $scope.jumpToActivity = function (x) {
                    if (myBridge) {
                        myBridge.callHandler('sendMessageToApp', {
                            type: 2, data: {
                                url: x,
                                title: '精品活动',
                                leftNavItems: [1]
                            }
                        }, function (response) {
                            //todo custom
                        });
                    }
                };

                if (myBridge) {
                    myBridge.registerHandler('sendMessageToHTML', function (message, callback) {
                        if (message.type == 10001) {
                            var jumpUrl = encodeURI($location.absUrl().split('#')[0] + '#/list?keyword=' + message.data + '&cityName=' + $scope.cityName);
                            myBridge.callHandler('sendMessageToApp', {
                                type: 2, data: {
                                    url: jumpUrl,
                                    hasSearchView: true,
                                    leftNavItems: [1],
                                    searchViewPlaceholder: message.data
                                }
                            }, function (response) {
                                //todo custom
                            });
                        } else if (message == 7) {
                            myBridge.callHandler('sendMessageToApp', {type: 7, data: {}}, function (response) {
                                if (response == "") {
                                    window.localStorage.cityName = response;
                                    $scope.index = Index.get({cityId: window.localStorage.cityName, index: 1});
                                    $scope.index.$promise.then(function (res) {
                                        if (res.result != 0) {
                                            Toast(res.msg, 3000);
                                            $scope.loadError = true;
                                        }else {
                                            if (res.data.isCityOpen == false){
                                                document.getElementById('notOpenTips').style.display = 'block';
                                            }else if(res.data.isCityOpoen == true) {
                                                document.getElementById('notOpenTips').style.display = 'none';
                                            }
                                        }
                                    }).catch(function (error) {
                                        $scope.loadError = true;
                                        Toast('服务器返回失败');
                                    });
                                } else {
                                    window.localStorage.cityName = response;
                                    $scope.index = Index.get({cityName: window.localStorage.cityName, index: 1});
                                    $scope.index.$promise.then(function (res) {
                                        if (res.result != 0) {
                                            Toast(res.msg, 3000);
                                            $scope.loadError = true;
                                        } else {
                                            if (res.data.isCityOpen == false){
                                                document.getElementById('notOpenTips').style.display = 'block';
                                            }else if(res.data.isCityOpoen == true) {
                                                document.getElementById('notOpenTips').style.display = 'none';
                                            }
                                        }
                                    }).catch(function (error) {
                                        $scope.loadError = true;
                                        Toast('服务器返回失败');
                                    });
                                }
                            });
                        } else if (message == 5) {
                            myBridge.callHandler('sendMessageToApp', {type: 5, data: {}}, function (response) {
                                //document.getElementById('ok').src = 'data:image/png;base64,'+response;
                                var url = response;
                                var parameters = url.split('?')[1];
                                var parametersArray = parameters.split('&');
                                var jsonArray = [];
                                angular.forEach(parametersArray, function (each) {
                                    var key = each.split('=')[0];
                                    var value = each.split('=')[1];
                                    jsonArray.push('"' + key + '":' + value);
                                });
                                var string = '{' + jsonArray.join(',') + '}';
                                var jsonParameters = JSON.parse(string);
                                if (jsonParameters.type == 1) {//type=1代表为自定义商品详情
                                    myBridge.callHandler('sendMessageToApp', {
                                        type: 2, data: {
                                            url: url,
                                            title: '产品详情',
                                            leftNavItems: [1],
                                            rightNavItems: [0]
                                        }
                                    }, function (response) {
                                        //todo custom
                                    });
                                }
                            })
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