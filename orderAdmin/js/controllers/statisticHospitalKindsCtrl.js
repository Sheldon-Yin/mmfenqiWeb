/**
 * Created by sheldon on 2016/5/4.
 */
app.controller('StatisticHospitalKindsCtrl', ['$scope', '$state', function ($scope, $state) {

    $.get('/html/mmfq/api/hospitals/get_hospitals').then(function (res) {
        if (res.code == 0) {
            console.log(res);
            $scope.$apply(function () {
                $scope.tips = res.data;
            });
        } else {
            console.log(res.message)
        }
    }, function (error) {
        console.log(error)
    });

    $scope.addTips = function () {
        $.post('/html/mmfq/api/hospitals/add_hospital', {
            hospital_name: $scope.tipsForAdd
        }).then(function (res) {
            if (res.code == 0) {
                console.log(res);
                $state.reload();
            } else {
                alert(res.message)
            }
        }, function (error) {
            console.log(error)
        })
    };

    $scope.deleteTips = function (x) {
        $.post('/html/mmfq/api/hospitals/delete_hospital', {
            hospital_id: x.id
        }).then(function (res) {
            if (res.code == 0) {
                console.log(res);
                $state.reload();
            } else {
                console.log(res.message)
            }
        }, function (error) {
            console.log(error)
        })
    };

}]);