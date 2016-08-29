/**
 * Created by ChinaHp on 2016/8/22.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/weChatService.js')(app);
        app.register.controller('SeckillingCtrl', ['$scope', '$http','Bridge','$location',
            function ($scope, $http,Bridge,$location) {

                $scope.goBack = function () {
                    window.history.go(-1);
                };
                $scope.todayed = true;
                $scope.tomorrowed = false;

                $scope.showMore=false;//查看更多

                $scope.today_index = 1;

                $scope.today_start='';
                $scope.today_end='';
                $scope.tomorrow_start='';
                $scope.tomorrow_end='';


                $scope.tomorrow_index=1;

                $scope.flashSaleGoodsItemList=[];

                $scope.timeStampString = function (time) {
                    var datetime = new Date();
                    datetime.setTime(time);
                    var year = datetime.getFullYear();
                    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
                    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
                    return year + "-" + month + "-" + date + " ";
                };

                $scope.time=Date.parse(new Date());

                /**
                 * 查询
                 * @param index
                 * @param startTime
                 * @param endTime
                 */
                $scope.query = function (index, startTime, endTime) {

                    this.index=index;
                    $http({
                        url: '/pc/computer/query_flashSaleGoodsList_pc?index=' + index + '&startTime=' + startTime + '&endTime=' + endTime + '',
                        method: 'GET'
                    }).success(function (data, header, config, status) {
                        if (data.result == '0') {
                            console.log(data);
                            $scope.flashSaleGoodsItemList = $scope.flashSaleGoodsItemList.concat(data.data.flashSaleGoodsItemList);


                            $scope.totalPage=data.data.paginator.totalPage;

                            $scope.currentPage=index;

                            if($scope.totalPage>$scope.currentPage){
                                $scope.showMore=true;
                            }else{
                                $scope.showMore=false;
                            }
                        }
                    }).error(function (data, header, config, status) {
                        console.log('error');
                    });
                };
                Date.prototype.Format = function (fmt) { //author: meizz
                    var o = {
                        "M+": this.getMonth() + 1, //月份
                        "d+": this.getDate(), //日
                        "h+": this.getHours(), //小时
                        "m+": this.getMinutes(), //分
                        "s+": this.getSeconds(), //秒
                        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                        "S": this.getMilliseconds() //毫秒
                    };
                    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                    for (var k in o)
                        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                    return fmt;
                };

                $scope.timeInit = function () {
                    var compareTime = new Date();
                    if (compareTime.getHours() >= 10) {
                        var time = compareTime.Format('yyyy-MM-dd 23:59:59');
                        return {
                            time: time,
                            text: '距离结束仅剩'
                        };
                    }
                    var time = compareTime.Format('yyyy-MM-dd 10:00:00');
                    return {
                        time: time,
                        text: '距离开始仅剩'
                    }
                };

                $scope.common=function () {
                    var startTime = new Date(), start, end,tm;
                    var compareTime = new Date();
                    tm = compareTime.setDate(compareTime.getDate() + 1);
                    start = startTime.Format('yyyy-MM-dd 00:00:00');
                    end = startTime.Format('yyyy-MM-dd 23:59:59');
                    $scope.tomorrow_start = this.timeStampString(tm);
                    $scope.tomorrow_start = $scope.tomorrow_start + "00:00:00";
                    $scope.tomorrow_end = this.timeStampString(tm);
                    $scope.tomorrow_end = $scope.tomorrow_end + "59:59:59";

                    return{
                        start:start,
                        end:end,
                        tomorrow_start:$scope.tomorrow_start,
                        tomorrow_end:$scope.tomorrow_end
                    }
                };


                var startTime = new Date(), start, end;
                start = startTime.Format('yyyy-MM-dd 00:00:00');
                end = startTime.Format('yyyy-MM-dd 23:59:59');
                $scope.query(1, start, end);


                $scope.text = $scope.timeInit().text;

                $scope.init = function (time) {
                    var setCountDown = {
                        timer: null,
                        init: function (opt) {
                            var _this = this;
                            this.setShowTime(opt.endtime, opt.done);
                            this.timer = setInterval(function () {
                                _this.setShowTime(opt.endtime, opt.done, opt.callback)
                            }, 1000);

                            console.log(this.timer)
                        },
                        getCountdown: function (time) {
                            var curShowTimeSecondsVal = this.getSecond(time) - this.getSecond();
                            if (curShowTimeSecondsVal < 0) return [0, '00', '00', '00'];
                            // console.log(curShowTimeSecondsVal)
                            // 剩余秒数
                            var curShowTimeSeconds = parseInt(curShowTimeSecondsVal % 60);
                            // 计算剩余天数
                            var curShowTimeDays = parseInt(curShowTimeSecondsVal / 3600 / 24);
                            // 计算剩余小时
                            var curShowTimeHours = parseInt((curShowTimeSecondsVal / 3600)) - curShowTimeDays * 24;
                            // 计算剩余分钟
                            var curShowTimeMinutes = parseInt((curShowTimeSecondsVal - parseInt((curShowTimeSecondsVal / 3600)) * 3600) / 60);
                            curShowTimeHours = curShowTimeHours > 9 ? curShowTimeHours : '0' + curShowTimeHours;
                            curShowTimeSeconds = curShowTimeSeconds > 9 ? curShowTimeSeconds : '0' + curShowTimeSeconds;
                            curShowTimeMinutes = curShowTimeMinutes > 9 ? curShowTimeMinutes : '0' + curShowTimeMinutes;
                            return [curShowTimeDays, curShowTimeHours, curShowTimeMinutes, curShowTimeSeconds];
                        },
                        getSecond: function (times) {
                            if (times) {
                                var year = parseInt(times.slice(0, 4)),
                                    month = parseInt(times.match(/-\d*/gi)[0].replace('-', '') - 1),
                                    day = parseInt(times.match(/-\d*/gi)[1].replace('-', '')),
                                    hour = parseInt(times.match(/\d*:/)[0].replace(':', '')),
                                    minute = parseInt(times.match(/:\d*/)[0].replace(':', ''));
                                return (new Date(year, month, day, hour, minute, 0)).getTime() / 1000;
                            }
                            return (new Date()).getTime() / 1000;
                        },
                        setShowTime: function (endtime, done, callback) {
                            var _this = this;
                            // var oSetTime = document.getElementById('time');
                            var day = this.getCountdown(endtime)[0],
                                hour = this.getCountdown(endtime)[1],
                                minute = this.getCountdown(endtime)[2],
                                second = this.getCountdown(endtime)[3];
                            done([day, hour, minute, second]);
                            // oSetTime.innerHTML = '剩余时间：'+day+'天'+hour+'小时'+minute+'分'+second+'秒';
                            if (day == 0 && hour == '00' && minute == '00' && second == '00') {
                                clearInterval(_this.timer);
                                _this.timer = null;
                                if (callback) callback();
                            }
                        }
                    };
                    setCountDown.init({
                        endtime: time,
                        done: function (data) {
                            // console.log(data)

                            setTimeout(function () {
                                $scope.$apply(function () {
                                    $scope.h = data[1];
                                    $scope.m = data[2];
                                    $scope.s = data[3];
                                })
                            }, 0)

                        },
                        callback: function () {

                        }
                    })
                };


                $scope.init($scope.timeInit().time);


                $scope.today = function () {

                    $scope.todayed = true;
                    $scope.tomorrowed = false;

                    var startTime = new Date();
                    $scope.today_start = startTime.Format('yyyy-MM-dd 00:00:00');
                    $scope.today_end = startTime.Format('yyyy-MM-dd 23:59:59');

                    $scope.query(1, $scope.today_start, $scope.today_end);
                };

                $scope.tomorrow = function () {

                    $scope.todayed = false;
                    $scope.tomorrowed = true;

                    var compareTime = new Date(), tm;
                    tm = compareTime.setDate(compareTime.getDate() + 1);
                    $scope.tomorrow_start = this.timeStampString(tm);
                    $scope.tomorrow_start = $scope.tomorrow_start + "00:00:00";
                    $scope.tomorrow_end = this.timeStampString(tm);
                    $scope.tomorrow_end = $scope.tomorrow_end + "59:59:59";
                    $scope.query(1, $scope.tomorrow_start, $scope.tomorrow_end)

                };
                
                $scope.getSome=function () {

                    if(!!$scope.todayed){

                        $scope.today_index=$scope.today_index+1;
                        var startTime = new Date();
                        $scope.today_start = startTime.Format('yyyy-MM-dd 00:00:00');
                        $scope.today_end = startTime.Format('yyyy-MM-dd 23:59:59');
                        $scope.query($scope.today_index,$scope.today_start,$scope.today_end)
                    }else if(!!$scope.tomorrowed){
                        $scope.tomorrow_index=$scope.tomorrow_index+1;
                        var compareTime = new Date(), tm;
                        tm = compareTime.setDate(compareTime.getDate() + 1);
                        $scope.tomorrow_start = this.timeStampString(tm);
                        $scope.tomorrow_start = $scope.tomorrow_start + "00:00:00";
                        $scope.tomorrow_end = this.timeStampString(tm);
                        $scope.tomorrow_end = $scope.tomorrow_end + "59:59:59";
                        $scope.query($scope.tomorrow_index,$scope.tomorrow_start,$scope.tomorrow_end)
                    }
                };


                $scope.goToGoodsDetails = function (x,begin,end) {
                    if($scope.time < begin &&  $scope.time >= end){
                        Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/goods?goodsId=' + x),'产品详情');
                    }else{
                        return;
                    }
                };



            }]);
    }
});
