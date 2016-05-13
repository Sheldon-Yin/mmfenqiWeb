/**
 * Created by sheldon on 2016/5/9.
 */
app.controller('OrderListCtrl',['$scope','ConsultantInfo','QueryOrderList', function ($scope,ConsultantInfo,QueryOrderList) {

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
            channel:1
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

}]);