/**
 * Created by sheldon on 2016/5/9.
 */
app.controller('BillListCtrl', ['$scope', '$state', 'FinanceInfo', 'QueryOrderList', 'GetCash', 'toaster', '$log', function ($scope, $state, FinanceInfo, QueryOrderList, GetCash, toaster, $log) {

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
        console.log(pageNo)
    };

    $scope.pageChanged = function () {
        console.log($scope.currentPage);
        $scope.initBillList($scope.currentPage)
    };

    $scope.maxSize = 15;
    $scope.currentPage = 1;
    //分页相关

    $scope.start_time = new Date();
    $scope.start_time.setMonth((new Date()).getMonth() - 1);
    $scope.end_time = new Date();
    $scope.end_time.setHours(23);
    $scope.end_time.setMinutes(59);
    $scope.end_time.setSeconds(59);
    $scope.start_time.setHours(0);
    $scope.start_time.setSeconds(0);
    $scope.start_time.setMinutes(0);

    $scope.initBillList = function (index) {
        $scope.financeInfoReq = FinanceInfo.query({
            channel: 1
        });
        $scope.financeInfoReq.$promise.then(function (res) {
            if (res.result == 0) {
                $scope.financeInfo = res.data.financeResponse;
            } else {
                console.log(res)
            }
        }).catch(function (error) {
            console.log(error)
        });

        $scope.queryOrderList = QueryOrderList.query({
            channel: 1,
            startTime: $scope.start_time ? Date.parse($scope.start_time) : null,
            endTime: $scope.end_time ? Date.parse($scope.end_time) : null,
            username: !!$scope.username ? $scope.username : '',
            telephone: !!$scope.telephone ? $scope.telephone : '',
            projectReviewStatus: $scope.projectReviewStatus,
            orderstat: $scope.orderstat,
            receiptAudit: $scope.receiptAudit,
            currentPage: !!index ? $scope.currentPage : 1
        });
        $scope.queryOrderList.$promise.then(function (res) {
            if (res.result == 0) {
                console.log(res);
                $scope.data = res.data.orderList;
                $scope.bigTotalItems = res.data.totalPage * 10;
            } else {
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
        var urlHref = $state.href('app.bill.detail', {id: x.orderId, orderSn: x.orderSn});
        window.open(urlHref);
    };

    $scope.getCash = function () {
        $scope.getCashReq = GetCash.save({
            channel: 1
        });
        $scope.getCashReq.$promise.then(function (res) {
            if (res.result == 0) {
                toaster.pop('success', '提现成功', res.msg);
            } else {
                toaster.pop('error', '提现失败', res.msg);
                console.log(res)
            }
        }).catch(function (error) {
            toaster.pop('error', '提现失败', error);
            console.log(error)
        });
        $scope.initBillList()
    };

    $scope.goToOutput = function () {
        window.open('/tenant/exportTenantOrderListExcel?channel=1&' + 'startTime=' + ($scope.start_time ? Date.parse($scope.start_time) : null) +
            '&endTime=' + ($scope.end_time ? Date.parse($scope.end_time) : null) +
            '&username=' + (!!$scope.username ? $scope.username : '') +
            '&telephone=' + (!!$scope.telephone ? $scope.telephone : '') +
            '&receiptAudit=' + ($scope.receiptAudit));
    }

}]);