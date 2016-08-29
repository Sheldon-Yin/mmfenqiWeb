/**
 * Created by ChinaHp on 2016/7/15.
 */
app.controller('ReimbursementCtrl', ['$scope', '$state', 'httpService','finaService', 'commonService','$location', '$stateParams',
    function ($scope, $state, httpService, finaService,commonService,$location, $stateParams) {

                $scope.time_start=commonService.init().time_start;
                $scope.time_end=commonService.init().time_end;
                var request=finaService.query_hospital().query({

                });
                httpService(request,function (res) {
                    console.log(res.data)
                });
        
        
                $scope.sure_refund=function () {
                    var msg= '<div><img src="img/a2.jpg">确定</div>'
                    commonService.layer_refund(msg,function () {
                        
                    })
                };

        //详情
        $scope.go = function (x) {
            console.log(x);
            var url = 'app.finance.merchantDetail',
                url = $state.href(url, {id: x});
            console.log(url);

            window.open(url);
        };



        $scope.open = function (id) {

            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    id: function () {
                        return id;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
                console.log('Modal dismissed at: ' + new Date());
            });
        };


        /**
         * 添加保单号
         */
        $scope.addPolicy=function () {
            commonService.layer_policyNo(function () {
                alert($("#No").val())
            })
        }

    }]);



app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'id', function($scope, $modalInstance, id) {
    $scope.id = id;

    $scope.modal={};
    // $scope.selected = {
    //     item: $scope.items[0]
    // };

    $scope.ok = function () {

        alert($scope.modal.ljb);
        $modalInstance.close();
    };

    $scope.cancel = function () {
        alert('退出');
        $modalInstance.dismiss('cancel');
    };
}]);



