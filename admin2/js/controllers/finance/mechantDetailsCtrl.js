/**
 * Created by ChinaHp on 2016/7/15.
 */
app.controller('mechantDetailsCtrl', ['$scope', '$state', 'httpService' ,'commonService','$location', '$stateParams','$modal','$log',
    function ($scope, $state, httpService,commonService, $location, $stateParams,$modal,$log) {

        // $scope.changeInfo=function () {
        //     layer.open({
        //         title: '提示',
        //         type: 1,
        //         shade: 0.3,
        //         closeBtn: 1, //不显示关闭按钮
        //         btn: ['取消', '确定'],
        //         area: ['400px', '400px'],
        //         content: $("#hidd").html(),
        //         btn1: function (index, layero) {
        //             layer.closeAll();
        //         },
        //         btn2: function () {
        //             cb();
        //             layer.closeAll();
        //         }
        //     })
        // };
        //
        // $scope.abc=123;

        if($stateParams.id==1231){
            $scope._tab.active1=true;
        }



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
