/**
 * Created by sheldon on 2016/5/4.
 */
app.controller('StatisticSchoolKindsCtrl', ['$scope', '$state', function ($scope, $state) {

    $.get('/html/mmfq/api/schools/get_schools').then(function (res) {
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
        $.post('/html/mmfq/api/schools/add_school', {
            school_name: $scope.tipsForAdd
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

    $scope.deleteTips = function (x) {
        $.post('/html/mmfq/api/schools/delete_school', {
            school_id: x.id
        }).then(function (res) {
            if (res.code == 0) {
                console.log(res);
                $state.reload();
            } else {
                console.log(res)
            }
        }, function (error) {
            console.log(error)
        })
    };

}]);