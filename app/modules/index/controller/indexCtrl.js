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
                $scope.index = Index.get({cityId: $scope.cityId, index: 1});

                $scope.index.$promise.then(function (res) {
                    if (res.result != 0){
                        Toast(response.msg,3000);
                        $scope.loadError = true;
                    }
                }).catch(function (error) {
                    $scope.loadError = true;
                });

                //if (myBridge) {
                //    alert(myBridge);
                //}

                ////ddd
                ////第一步：下拉过程
                //function slideDownStep1(dist) {  // dist 下滑的距离，用以拉长背景模拟拉伸效果
                //    console.log(1);
                //    console.log(dist+'dist');
                //    var slideDown = document.getElementById("slideDown");
                //    slideDown.style.display = "block";
                //    slideDown.style.height = (-dist) + "px";
                //}
                //
                ////第二步：下拉，然后松开，
                //function slideDownStep2() {
                //    console.log(2);
                //    var slideDown = document.getElementById("slideDown");
                //    slideDown.style.height = "4rem";
                //    slideDown.innerHTML = '<i class="fa fa-refresh fa-spin fa-lg" style="margin-right: 1rem"></i><span>刷新中</span>';
                //
                //    window.location.reload();
                //    setTimeout(function(){slideDownStep3()},300);
                //
                //    //location.reload();
                //}
                //
                ////第三步：刷新完成，回归之前状态
                //function slideDownStep3() {
                //    console.log(3);
                //    var slideDown = document.getElementById("slideDown");
                //    slideDown.innerHTML = '<i class="fa fa-check fa-lg" style="margin-right: 1rem"></i><span>刷新成功</span>';
                //    setTimeout(slideDownStep4(),500);
                //}
                //
                ////有时候直接弹回
                //function slideDownStep4() {
                //    var slideDown = document.getElementById('slideDown');
                //    slideDown.style.display = 'none';
                //}
                //
                ////下滑刷新调用
                //k_touch("content", "y");
                ////contentId表示对其进行事件绑定，way==>x表示水平方向的操作，y表示竖直方向的操作
                //function k_touch(contentId, way) {
                //    console.log('aaa');
                //    var _start = 0,
                //        _end = 0,
                //        _content = document.getElementById(contentId);
                //    _content.addEventListener("touchstart", touchStart, false);
                //    _content.addEventListener("touchmove", touchMove, false);
                //    _content.addEventListener("touchend", touchEnd, false);
                //    function touchStart(event) {
                //        //var touch = event.touches[0]; //这种获取也可以，但已不推荐使用
                //
                //        var touch = event.targetTouches[0];
                //        if (way == "x") {
                //            _start = touch.pageX;
                //        } else {
                //            _start = touch.pageY;
                //        }
                //    }
                //
                //    function touchMove(event) {
                //        var touch = event.targetTouches[0];
                //        if (way == "x") {
                //            _end = (_start - touch.pageX);
                //        } else {
                //            _end = (_start - touch.pageY);
                //            //下滑才执行操作
                //            console.log(document.body.scrollTop + '位置');
                //            if (_end < -10 && document.body.scrollTop < 5) {
                //                console.log(_end + '结尾');
                //                slideDownStep1(_end);
                //            }
                //        }
                //
                //    }
                //
                //    function touchEnd(event) {
                //        if (document.body.scrollTop < 5 && _end < -50) {
                //            console.log("左滑或上滑touchend " + _end);
                //            console.log(document.body.scrollTop + '位置touchend');
                //            slideDownStep2();
                //            //刷新成功则
                //            //模拟刷新成功进入第三步
                //        } else if (document.body.scrollTop < 5 && _end > -50) {
                //            console.log("左滑或上滑touchend " + _end);
                //            console.log(document.body.scrollTop + '位置touchend');
                //            slideDownStep4();
                //        } else {
                //            setTimeout(slideDownStep3(), 500);
                //        }
                //    }
                //}
                //
                ////ddd


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
                //$scope.$on('ngRepeatFinishedCopy', function (ngRepeatFinishedCopyEvent) {
                //    console.log(2);
                //    //$scope.initPullToRefreshSwiper();
                //});

                //APP事件处理
                //$scope.changeCity = function () {
                //    if (myBridge) {
                //        myBridge.callHandler('sendMessage', {type: 7, data: {}}, function (response) {
                //            $scope.$apply(function () {
                //                $scope.cityName = response;
                //            });
                //        })
                //    }
                //};

                if (myBridge) {
                    myBridge.callHandler('sendMessageToApp', {type: 6, data: {}}, function (response) {
                        $scope.$apply(function () {
                            if (response == "") {
                                $scope.cityId = 2;
                                $scope.index = Index.get({cityId: $scope.cityId, index: 1});
                            } else {
                                $scope.cityName = response;
                                $scope.index = Index.get({cityName: $scope.cityName, index: 1});
                            }
                        });
                    });
                }

                //$scope.qrcode = function () {
                //    if (myBridge) {
                //        myBridge.callHandler('sendMessage', {type: 5, data: {}}, function (response) {
                //            alert(response);
                //        })
                //    }
                //};
                //$scope.search = function (e) {
                //    var keycode = window.event ? e.keyCode : e.which;
                //    if (keycode == 13) {
                //        if (!!$scope.searchContent) {
                //            document.getElementById('search').blur();
                //        }
                //    }
                //};

                $scope.jumpToGoods = function (x) {
                    if (myBridge) {
                        var jumpUrl = encodeURI($location.absUrl().split('#')[0] + x);
                        myBridge.callHandler('sendMessageToApp', {
                            type: 2, data: {
                                url: jumpUrl,
                                title: '商品详情',
                                leftNavItems: [1],
                                rightNavItems: [0]
                            }
                        }, function (response) {
                            //todo custom
                        });
                    }
                };

                $scope.jumpToRecommend = function () {
                    //window.location.href = encodeURI($location.absUrl().split('#')[0] + '#/recommend'+'?cityName='+$scope.cityName);
                    if (myBridge) {
                        var jumpUrl = encodeURI($location.absUrl().split('#')[0] + '#/recommend'+'?cityName='+$scope.cityName);

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
                        var jumpUrl = encodeURI($location.absUrl().split('#')[0] + '#/list?subId=' + x.categoryHerf + '&subName=' + x.categoryName + '&cityName=' + $scope.cityName);
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
                                    $scope.cityId = 2;
                                    $scope.index = Index.get({cityId: $scope.cityId, index: 1});
                                } else {
                                    $scope.cityName = response;
                                    $scope.index = Index.get({cityName: $scope.cityName, index: 1});
                                }
                            });
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