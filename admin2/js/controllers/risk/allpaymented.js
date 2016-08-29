
app.controller('overdueCtrl', ['$scope', 'riskService', '$state', 'toaster', 'httpService', '$location', '$stateParams',
    function ($scope, riskService, $state, toaster, httpService, $location, $stateParams) {

            $scope.moneyType=[
                {name:'已还款',userType:'2'},
                {name:'未还款',userType:'1'}

            ];

            $scope.init=function () {
                var request=riskService.queryRepaymentBillByPage().query({
                    userName:$scope.userName,
                    telephone:$scope.telephone,
                    orderSn:$scope.orderSn,
                    orderName:$scope.orderName,
                    startDate:$scope.startDate,
                    endDate:$scope.endDate,
                    userType:$scope.userType,
                    monthRepaymentSituation:$scope.monthRepaymentSituation,
                    currentPage:$scope.currentPage

                })
            }
    }]);
