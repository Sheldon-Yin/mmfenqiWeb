/**
 * Created by sheldon on 2016/5/5.
 */
app.controller('CustomerDetailCtrl', ['$scope', 'customerListService', '$stateParams', '$state', '$modal', 'toaster', 'httpService',
    function ($scope, customerListService, $stateParams, $state, $modal, toaster, httpService) {
        $scope.orderId = $stateParams.id;

        $scope.$parent.isCreate = true;

        $scope.isOpen = false;





        (function () {
            var swiper;
        }());


        window.deg = {
            $deg: 0,
            $sc: 1
        };


        $scope.transformd = function () {





            deg.$sc = deg.$sc / 0.7;


            document.getElementById("swimg_" + $index.layer_index).style.transform = "scale("+deg.$sc+")";



        };
        $scope.transformx = function () {


            deg.$sc = deg.$sc * 0.7;


            document.getElementById("swimg_" + $index.layer_index).style.transform = "scale("+deg.$sc+")";
        };



        $scope.transforml = function () {


            deg.$deg += 90;
            console.log($index.layer_index);
            document.getElementById("swimg_" + $index.layer_index).style.transform = "rotate(" + deg.$deg + "deg)";
        };
        $scope.transformr = function () {

            deg.$deg -= 90;
            document.getElementById("swimg_" + $index.layer_index).style.transform = "rotate(" + deg.$deg + "deg)";
        };


        $scope.protImg = function () {

            $scope.isOpen = true;

        };

        $scope.closeAll = function () {
            $scope.isOpen = false;
        };


        $scope._next = function () {
            if (!!swiper.slideNext) {
                swiper.slideNext();
                // alert(''+$index.layer_index)

                deg.$deg = 0;
                deg.$sc = 1;
                document.getElementById("swimg_" + $index.layer_index).style.transform = "rotate(" + deg.$deg + "deg)";
                $("#swimg_" + $index.layer_index).css({
                    WebkitTransform: 'scale( ' + deg.$sc + ')'
                })


            }


        };

        $scope._prev = function () {
            if (!!swiper.slidePrev) {
                swiper.slidePrev();
                deg.$deg = 0;
                deg.$sc = 1;
                document.getElementById("swimg_" + $index.layer_index).style.transform = "rotate(" + deg.$deg + "deg)";
                $("#swimg_" + $index.layer_index).css({
                    WebkitTransform: 'scale( ' + deg.$sc + ')'
                })
            }
        };


        window.$index = {
            layer_index: ''
        };



        $scope.getGoodsInfo=function (cb) {
            var request=customerListService.queryGoodsInfo().query({
                orderId:$scope.orderId
            });

            httpService(request,function (res) {
                console.log(res.data);

                $scope.x = res.data.resultMap;
                $scope._goodsCombination = JSON.parse(res.data.resultMap.goodsCombination);
                console.log(JSON.parse(res.data.resultMap.goodsCombination));
                $scope.someThing = [];

                for (item in $scope._goodsCombination) {

                    for (_item in $scope._goodsCombination[item]) {
                        var some = {};
                        some.key = _item;
                        some.value = $scope._goodsCombination[item][_item];
                        $scope.someThing.push(some);
                    }

                }
                console.log($scope.someThing);
                return cb()
            });

        };
        (function () {
            $scope.getGoodsInfo(function () {
                setTimeout(function () {



                 var swiper = new Swiper('.swiper-container', {
                        pagination: '#swiper-pagination',
                        paginationType: 'fraction',
                        width:400,
                        onInit: function (swiper) {
                            $index.layer_index = swiper.activeIndex;//0

                            $(".swiper-slide").css({
                                'margin':'0 auto'
                            });

                            // alert('+++'+swiper.activeIndex)
                        },
                        onSlideChangeEnd: function (swiper) {
                            $index.layer_index = swiper.activeIndex;//1
                        }
                    });

                }, 10);
            });
        }());




        customerListService.queryUserInfo().query({
            orderId: $scope.orderId
        }).$promise.then(function (res) {
            // console.log(res)
            console.log(res.data);
            console.log(res.data.userList);
            $scope.userInfoList = res.data.userList;
        });
        customerListService.queryInsuranceInfo().query({
            orderId: $scope.orderId
        }).$promise.then(function (res) {
            console.log(res);
            if (!res.result === '0') {
                alert(res.result.msg);
                return;
            }
            // console.log(res)
            console.log(res.data);

            // console.log(res.data.userInfoList);
            $scope.hashMapListData = res.data.hashMapList;

            console.log(res.data.hashMapList);
        });


        //操作信息

        $scope.init=function () {
            var request = customerListService.queryLogList().query({
                primaryKey:$scope.orderId,
                businessType:'ORDER_MANAGEMENT'
            });
            httpService(request, function (res) {
                console.log(res);
                console.log(res.data);
                $scope.queryLogListData = res.data.logList;

                console.log($scope.queryLogListData);
                // $scope.page2 = res.data.page
            });
        };


        $scope.init();






        // $scope.remarkInfo={};
        //提交备注
        $scope.commitInfo = function () {

            layer.open({
                title: '提示',
                type: 1,
                shade: 0.3,
                skin: 'sure', //样式类名
                closeBtn: 1, //不显示关闭按钮
                btn: ['确定'],
                area: ['350px', '200px'],
                content: '确定要修改备注',
                btn1:function (index,layero) {
                    var request = customerListService.addRemark().save({
                        orderId: $scope.orderId,
                        remark: $("#remark").val()
                    });
                    httpService(request, function (res) {

                        console.log(res);
                        layer.closeAll();

                    })
                }

            });

        };

        //审核

        $scope.projectReviewStatusAudit=function () {


            if($scope.projectReviewStatusRadio==undefined){
                return;
            }
            layer.open({
                title: '提示',
                type: 1,
                shade: 0.3,
                skin: 'sure', //样式类名
                closeBtn: 1, //不显示关闭按钮
                btn: ['确定'],
                area: ['350px', '200px'],
                content: '确定该审核操作',
                btn1:function (index,layero) {
                    var request=customerListService.projectReviewStatusAudit().save({
                        orderId:$scope.orderId,
                        projecteReviewStatus:$scope.projectReviewStatusRadio

                    });
                    httpService(request,function (res) {
                        console.log(res);
                        layer.closeAll();
                        window.location.reload();

                    })

                }

            });


        };

        $scope.isupdate = true;


        //确定修改合同编号
        $scope.updatecontractNo = function () {
            $scope.isupdate =true;
            layer.open({
                title: '提示',
                type: 1,
                shade: 0.3,
                skin: 'sure', //样式类名
                closeBtn: 1, //不显示关闭按钮
                btn: ['确定'],
                area: ['350px', '200px'],
                content: '确定修改合同编号',
                btn1:function (index,layero) {

                    var request = customerListService.editContractNo().save({
                        orderId: $scope.orderId,
                        contractNo: $("#contractNo").val()
                    });
                    httpService(request, function (res) {
                        console.log(res);
                        layer.closeAll();

                    })
                }

            });


        };
        //修改
        $scope._updatecontractNo = function () {
            $scope.isupdate = false;
        };

    }]);
