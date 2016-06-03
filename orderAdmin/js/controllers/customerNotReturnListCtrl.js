/**
 * Created by sheldon on 2016/5/4.
 */

app.controller('CustomerNotReturnListCtrl', ['$scope','$state', function ($scope,$state) {
    $.get('/html/mmfq/api/customers/get_customers_of_no_return_visit',{
        until_date: (Date.parse(new Date())/1000 + 43200)
    }).then(function (res) {
        $scope.$apply(function () {
            console.log(res);
            $scope.customerListData = res.data;
        });
        
        $scope.customerStar = function (x) {
            x.waitingForStar = true;
            console.log(x.id);
            $.post('/html/mmfq/api/customers/toggle_star',{
                customer_id: x.id
            }).then(function (res) {
                if (res.code == 0){
                    $scope.$apply(function () {
                        console.log(res);
                        x.waitingForStar = false;
                        x.star = (x.star=='1') ? '0' : '1';
                    })
                } else {
                    console.log(res.message);
                }
            }, function (error) {
                console.log(error)
            })
        };
        
        $scope.jumpToAdd = function () {
            $state.go('app.customer.add')
        };

        $scope.jumpToDetail = function (x) {
            $state.go('app.customer.detail',{id: x.id})
        }

    });

    $.get('/html/mmfq/api/users/get_users').then(function (res) {
        $scope.$apply(function () {
            console.log(res);
            $scope.options = res.data;
        })
    }, function (error) {
        console.log(error)
    });

}]);