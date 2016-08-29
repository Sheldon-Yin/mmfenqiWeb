/**
 * Created by ChinaHp on 2016/7/15.
 */
app.controller('MerchantCtrl', ['$scope', '$state', 'httpService' ,'commonService','$location', '$stateParams',
    function ($scope, $state, httpService,commonService, $location, $stateParams) {

        $scope.datetime={};

        // $scope.datetime.time_start=commonService.init().time_start;
        // $scope.datetime.time_end=commonService.init().time_end;
        $scope.datetime.time_start1=commonService.init().time_start;
        $scope.datetime.time_end1=commonService.init().time_end;


        $scope.queryTypeValue={};
        $scope.queryType={};

        $scope.orderStatus={}



        //详情
        $scope.go = function (x) {
            console.log(x);
            var url = 'app.finance.merchantDetail',
                url = $state.href(url, {id: x});
            console.log(url);

            window.open(url);
        };

        if($stateParams.id==1231){
            $scope._tab={
                active1:true
            }
        }



        $scope.search=function () {
            alert($scope.queryTypeValue.no);
            alert($scope.datetime.time_start1)


        }
    }]);
