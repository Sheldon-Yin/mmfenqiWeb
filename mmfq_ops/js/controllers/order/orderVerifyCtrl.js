/**
 * Created by sheldon on 2016/5/9.
 */
app.controller('OrderVerifyCtrl', ['$scope','QueryOrderDetail','VerifyOrder','toaster','$state',
    function ($scope,QueryOrderDetail,VerifyOrder,toaster,$state) {

        $scope.verifyOrder = function () {
            $scope.verifyOrderReq = VerifyOrder.query({
                channel:1,
                orderSn: $scope.data.orderSn
            });
            $scope.verifyOrderReq.$promise.then(function (res) {
                if (res.result==0){
                    console.log(res);
                    toaster.pop('success','验证成功',res.msg);
                    $state.reload();
                }else {
                    console.log(res);
                    toaster.pop('error','验证失败',res.msg);
                }
            }).catch(function (error) {
                console.log(error);
                toaster.pop('error','验证失败',error);
            })
        };

        $scope.getOrderDetail = function () {
            $scope.queryOrderDetial = QueryOrderDetail.query({
                channel:1,
                orderSn: $scope.orderSn
            });
            $scope.queryOrderDetial.$promise.then(function (res) {
                if (res.result==0){
                    console.log(res);
                    $scope.data = res.data.orderResponse;
                }else {
                    console.log(res);
                    $scope.data = {};
                }
            }).catch(function (error) {
                console.log(error);
                $scope.data={};
            })
        }

    }]);