/**
 * Created by sheldon on 2016/5/4.
 */
app.controller('StatisticIntentionKindsCtrl', ['$scope', '$state', function ($scope, $state) {


    $.get('/html/mmfq/api/intention_kinds/get_intention_kinds').then(function (res) {
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
        $.post('/html/mmfq/api/intention_kinds/add_intention_kind', {
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
        $.post('/html/mmfq/api/intention_kinds/delete_intention_kind', {
            intention_kind_id: x.id
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