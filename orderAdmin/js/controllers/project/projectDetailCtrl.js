/**
 * Created by sheldon on 2016/5/9.
 */
/**
 * Created by sheldon on 2016/5/5.
 */
app.controller('ProjectDetailCtrl', ['$scope', '$stateParams', '$state', '$modal', 'toaster', function ($scope, $stateParams, $state, $modal, toaster) {
    $scope.customerId = $stateParams.id;
    $scope.$parent.isCreate = true;
    $.get('/mmfq/api/customers/get_customer', {
        customer_id: $scope.customerId
    }).then(function (res) {
        if (res.code == 0) {
            $scope.$apply(function () {
                console.log(res.data);
                $scope.$parent.customer = {
                    name: res.data.name,
                    age: Number(res.data.age),
                    telephone: Number(res.data.telephone),
                    school: res.data.school,
                    push: res.data.push,
                    sign_date: res.data.sign_date
                };
            })
        } else {
            toaster.pop('error', '获取信息失败', res.message);
        }
    }, function (error) {
        toaster.pop('error', '获取信息失败', error);
    });

    $scope.$parent.updateCustomer = function () {
        $.post('/mmfq/api/customers/update_customer_info', {
            customer_id: $scope.customerId,
            name: $scope.$parent.customer.name,
            telephone: $scope.$parent.customer.telephone,
            school: $scope.$parent.customer.school,
            age: $scope.$parent.customer.age,
            push: $scope.$parent.customer.push,
            sign_date: (Date.parse($scope.$parent.customer.sign_date) / 1000)
        }).then(function (res) {
            if (res.code == 0) {
                $scope.$apply(function () {
                    toaster.pop('success', '修改成功', '');
                });
                console.log(res);
            } else {
                $scope.$apply(function () {
                    toaster.pop('error', '操作失败', res.message);
                });
            }
        }, function (error) {
            toaster.pop('error', '操作失败', error);
        })
    };

    $scope.$parent.openDelete = function () {

        $scope.$root.okDelete = function () {
            $scope.modalInstance.close();
            $.post('/mmfq/api/customers/delete_customer', {
                customer_id: $scope.customerId
            }).then(function (res) {
                if (res.code == 0) {
                    console.log(res.data);
                    $state.go('app.customer.list');
                } else {
                    $scope.$apply(function () {
                        toaster.pop('error', '操作失败', res.message);
                    });
                }
            }, function (error) {
                $scope.$apply(function () {
                    toaster.pop('error', '操作失败', error);
                });
            })
        };

        $scope.$root.cancelDelete = function () {
            $scope.modalInstance.dismiss('cancel');

        };

        $scope.modalInstance = $modal.open({
            templateUrl: 'myModalContent.html'
        });

        $scope.modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

}]);