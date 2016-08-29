/**
 * Created by ChinaHp on 2016/7/5.
 */
app.controller('paymentingDetailCtrl', ['$scope', 'riskService', '$stateParams', '$state', '$modal', 'toaster', 'httpService',
    function ($scope, riskService, $stateParams, $state, $modal, toaster, httpService) {

        var id=$stateParams.userBillId;

        $scope.init=function () {
            var request=riskService.findUserBillInfoByBillId().query({
                userBillId:id
            });
            httpService(request,function (res) {
                console.log(res.data);
                //用户
                $scope.user=res.data.userBillInfo.user;

                //回访记录

                $scope.returnVisitRecordListData=res.data.userBillInfo.returnVisitRecordList;
                //还款计划信息
                $scope.repaymentPlanaListData=res.data.userBillInfo.repaymentPlanaList;

                //项目信息

                $scope.order=res.data.userBillInfo.order;

                //联系人信息

                $scope.contactInfo=res.data.userBillInfo.contactInfo;


                //操作信息

                $scope.operationLogList=res.data.userBillInfo.operationLogList;



            });





        };

        $scope.init();

        function layerMsg(msg,cb) {
            layer.open({
                title: '提示',
                type: 1,
                shade: 0.3,
                skin: 'sure', //样式类名
                closeBtn: 1, //不显示关闭按钮
                btn: ['确定'],
                area: ['350px', '200px'],
                content: msg,
                btn1:function (index,layero) {
                    cb();
                    layer.closeAll();


                }

            });
        }

        $scope.addUserBillReturnVisitRecord=function () {

            var msg='确定要添加回访记录';
            if($scope.content==undefined){
                return;
            }
            layerMsg(msg,function () {
                var request=riskService.addUserBillReturnVisitRecord().save({
                    userBillId:id,
                    returnVisitRecord:$scope.content
                });
                httpService(request,function (res) {
                    console.log(res);

                    window.location.reload()



                })
            })
        }


    }]);
