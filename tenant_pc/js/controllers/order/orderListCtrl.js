/**
 * Created by sheldon on 2016/5/9.
 */
app.controller('OrderListCtrl',['$scope','ConsultantInfo','QueryOrderList', function ($scope,ConsultantInfo,QueryOrderList) {

    $scope.start_time = new Date();
    $scope.start_time.setMonth((new Date()).getMonth()-1);
    $scope.end_time = new Date();
    $scope.end_time.setHours(23);
    $scope.end_time.setMinutes(59);
    $scope.end_time.setSeconds(59);
    $scope.start_time.setHours(0);
    $scope.start_time.setSeconds(0);
    $scope.start_time.setMinutes(0);


    $scope.initConsultantInfo = function () {
        $scope.consultantInfo = ConsultantInfo.query({
            channel:1
        });
        $scope.consultantInfo.$promise.then(function (res) {
            if (res.result == 0){
                console.log(res);
                $scope.consultantData = res.data.consultantResponse;
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

    $scope.initConsultantInfo();

    $scope.updateDate = function () {
        $scope.start_time.setHours(0);
        $scope.start_time.setSeconds(0);
        $scope.start_time.setMinutes(0);
        $scope.end_time.setHours(23);
        $scope.end_time.setMinutes(59);
        $scope.end_time.setSeconds(59);
        console.log($scope.start_time);
        console.log($scope.end_time);
        $scope.initConsultantInfo();
    }

}]);