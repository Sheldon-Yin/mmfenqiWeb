/**
 * Created by ChinaHp on 2016/7/18.
 */
app.controller('CommonCtrl', ['$scope', '$state', 'httpService','commonService', '$location', '$stateParams','finaService','$log',
    function ($scope, $state, httpService, commonService,$location, $stateParams,finaService,$log) {





        httpService(finaService.query_hospital().query({}),function (res) {
            $log.info(res.data);


            $scope.hospitalListData=res.data.hospitalList;
        });


        httpService(finaService.queryOrderStatus().query({}),function (res) {
            $log.info(res.data);

            $scope.orderstatEnumListData=res.data.orderstatEnumList;
        });

        httpService(finaService.querySelectType().query({}),function (res) {
            $log.info(res.data);
            $scope.newSelectTypeEnumListData=res.data.newSelectTypeEnumList;
        });

        // httpService(finaService.query_select_type().query({}),function (res) {
        //
        //    // $scope.newSelectTypeEnumListData=res.data.newSelectTypeEnumList;
        //
        //
        //     $log.info(res.data)
        // })
    }]);
