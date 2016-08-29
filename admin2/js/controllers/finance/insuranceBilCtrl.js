/**
 * Created by ChinaHp on 2016/7/15.
 */
app.controller('insuranceBilCtrl', ['$scope', '$state', 'httpService','commonService', '$location', '$stateParams','$modal','$log',
    function ($scope, $state, httpService,commonService, $location, $stateParams,$modal,$log) {
        $scope.time_start=commonService.init().time_start;
        $scope.time_end=commonService.init().time_end;


        //
        // $scope.tabs = [
        //     { title:'Dynamic Title 1', content:'Dynamic content 1' },
        //     { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
        // ];

        if($stateParams.id==1231){

            $scope._tab={
                active1:true,
                active2:true
            }
        }

        


    }]);


