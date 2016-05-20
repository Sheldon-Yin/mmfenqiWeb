/**
 * Created by sheldon on 2016/5/9.
 */
app.controller('BillListCtrl', ['$scope','$state','FinanceInfo','QueryOrderList','GetCash','toaster',function($scope,$state,FinanceInfo,QueryOrderList,GetCash,toaster) {

    $scope.start_time = new Date();
    $scope.start_time.setMonth((new Date()).getMonth()-1);
    $scope.end_time = new Date();
    $scope.end_time.setHours(23);
    $scope.end_time.setMinutes(59);
    $scope.end_time.setSeconds(59);
    $scope.start_time.setHours(0);
    $scope.start_time.setSeconds(0);
    $scope.start_time.setMinutes(0);

    $scope.initBillList = function () {
        $scope.financeInfoReq = FinanceInfo.query({
            channel:1
        });
        $scope.financeInfoReq.$promise.then(function (res) {
            if (res.result == 0){
                $scope.financeInfo = res.data.financeResponse;
            }else {
                console.log(res)
            }
        }).catch(function (error) {
            console.log(error)
        });

        $scope.queryOrderList = QueryOrderList.query({
            channel:1,
            startTime:$scope.start_time ? Date.parse($scope.start_time) : null,
            endTime: $scope.end_time ? Date.parse($scope.end_time) : null
        });
        $scope.queryOrderList.$promise.then(function (res) {
            if (res.result == 0){
                console.log(res);
                $scope.data = res.data.orderList;
            }else {
                console.log(res)
            }
        }).catch(function (error) {
            console.log(error)
        })
    };

    $scope.initBillList();

    $scope.updateDate = function () {
        $scope.start_time.setHours(0);
        $scope.start_time.setSeconds(0);
        $scope.start_time.setMinutes(0);
        $scope.end_time.setHours(23);
        $scope.end_time.setMinutes(59);
        $scope.end_time.setSeconds(59);
        console.log($scope.start_time);
        console.log($scope.end_time);
        $scope.initBillList();
    };

    $scope.goToBillDetail = function (x) {
        $state.go('app.bill.detail',{id: x.orderId,orderSn: x.orderSn})
    };
    
    $scope.getCash = function () {
        $scope.getCashReq = GetCash.save({
            channel:1
        });
        $scope.getCashReq.$promise.then(function (res) {
            if (res.result == 0){
                toaster.pop('success','提现成功',res.msg);
            }else {
                toaster.pop('error','提现失败',res.msg);
                console.log(res)
            }
        }).catch(function (error) {
            toaster.pop('error','提现失败',error);
            console.log(error)
        });
        $scope.initBillList()
    }
}]);