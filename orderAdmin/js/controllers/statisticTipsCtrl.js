/**
 * Created by sheldon on 2016/5/4.
 */
app.controller('StatisticTipsCtrl', ['$scope', '$state', function ($scope, $state) {


    $.get('/mmfq/api/project_kinds/get_project_kinds').then(function (res) {
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
        $.post('/mmfq/api/project_kinds/add_project_kind', {
            label: $scope.tipsForAdd
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
        $.post('/mmfq/api/project_kinds/delete_project_kind', {
            project_kind_id: x.id
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