/**
 * Created by sheldon on 2016/5/9.
 */
app.controller('ReportListCtrl', ['$scope', '$state', 'FinanceInfo', 'Reports','ReportResume', 'GetCash', 'toaster', '$log', '$modal',
    function ($scope, $state, FinanceInfo, Reports,ReportResume, GetCash, toaster, $log, $modal) {

        //Modal部分

        $scope.items = ['item1', 'item2', 'item3'];
        $scope.open = function (size,cb) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(cb, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        //Modal结束

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
            console.log(pageNo)
        };

        $scope.pageChanged = function () {
            console.log($scope.currentPage);
            $scope.initReportList($scope.currentPage)
        };

        $scope.maxSize = 15;
        $scope.bigCurrentPage = 1;
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

        $scope.initReportList = function (index) {
            $scope.queryReportList = Reports.query({
                channel: 1,
                startTime: $scope.start_time ? Date.parse($scope.start_time) : null,
                endTime: $scope.end_time ? Date.parse($scope.end_time) : null,
                userName: !!$scope.username ? $scope.username : '',
                userTelephone: !!$scope.telephone ? $scope.telephone : '',
                currentPage: !!index ? $scope.currentPage : 1,
                orderReportStatus: $scope.orderReportStatus,
                consumeStatus: $scope.consumeStatus
            });
            $scope.queryReportList.$promise.then(function (res) {
                if (res.result == 0) {
                    console.log(res);
                    $scope.data = res.data.userOrderReportRecordList;
                    $scope.bigTotalItems = res.data.page.totalPage * 10;
                } else {
                    console.log(res)
                }
            }).catch(function (error) {
                console.log(error)
            })
        };

        $scope.initReportList();

        $scope.updateDate = function () {
            $scope.start_time.setHours(0);
            $scope.start_time.setSeconds(0);
            $scope.start_time.setMinutes(0);
            $scope.end_time.setHours(23);
            $scope.end_time.setMinutes(59);
            $scope.end_time.setSeconds(59);
            console.log($scope.start_time);
            console.log($scope.end_time);
            $scope.initReportList();
        };

        $scope.goToReportDetail = function (x) {
            var urlHref = $state.href('app.report.detail', {id: x.id});
            window.open(urlHref);
        };

        $scope.goToReportRepeat = function (x) {
            var urlHref = $state.go('app.report.repeat', {id: x.id});
        };

        $scope.goToConsume = function (x) {
            ReportResume.save({
                id: x.id
            }).$promise.then(function (res) {
                if(res.result == 0){
                    toaster.pop('info', '确认消费成功', res.msg);
                    $scope.initReportList();
                }else {
                    toaster.pop('error', '确认消费失败', res.msg)
                }
            })
        };

        $scope.goToConsumeOpen = function (x) {
            $scope.$root.tips = '确认进行用户已消费';
            $scope.open('', function () {
                $scope.goToConsume(x)
            });
        }

    }]);