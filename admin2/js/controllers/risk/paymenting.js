/**
 * Created by ChinaHp on 2016/7/5.
 */
app.controller('PaymentingCtrl', ['$scope', 'riskService', '$state', 'httpService', '$location', '$stateParams',
    function ($scope, riskService, $state, httpService, $location, $stateParams) {



            $scope.currentPage=1;
            $scope.currentPage2=1;
            $scope.currentPage3=1;
            $scope.maxSize = 4;

            Date.prototype.Format = function (fmt) { //author: meizz
                var o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "h+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds(), //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            };


            $scope.getDefaultTime = function (intNumber) {
                var date = new Date(), start, end;
                end = date.Format("yyyy-MM-dd");
                date.setMonth(date.getMonth() - intNumber);
                start = date.Format("yyyy-MM-dd");
                return {
                    start: start,
                    end: end
                }
            };

            $scope.datetime = {
                start_time: $scope.getDefaultTime(1).start,
                start_end: $scope.getDefaultTime(1).end
            };


            $scope.datetime2 = {
                time_start: $scope.getDefaultTime(6).start,
                time_end: $scope.getDefaultTime(6).end
            };

            $scope.datetime3 = {
                time_start: $scope.getDefaultTime(6).start,
                time_end: $scope.getDefaultTime(6).end
            };

            $scope.moneyType={
                selected:{
                    name:'未还款',
                    monthRepaymentSituation:'1'
            }
            };
            $scope.moneyTypeData=[
                {name:'已还款',monthRepaymentSituation:'2'},
                {name:'未还款',monthRepaymentSituation:'1'}

            ];
            $scope.roleType={};
            $scope.roleType2={};
            $scope.roleType3={};

            $scope.roleData=[
                {name:'全部',userType:''},
                {name:'学生',userType:'0'},
                {name:'白领',userType:'6'}
            ];

           // $scope.$select.selected.name='未还款';

            $scope.isContactType={};
            $scope.isContactData=[
                {name:'全部',isContact:''},
                {name:'未联系',isContact:'0'},
                {name:'已联系',isContact:'1'}
            ];

            $scope.user={};
            $scope.roleList=function (start_time,start_end,page) {
                var request=riskService.queryRepaymentBillByPage().query({
                    userName:$scope.user.userName?$scope.user.userName:'',
                    telephone:$scope.user.telephone?$scope.user.telephone:'',
                    orderSn:$scope.user.orderSn?$scope.user.orderSn:'',
                    orderName:$scope.user.orderName?$scope.user.orderName:'',
                    startDate:start_time,
                    endDate:start_end,
                    userType:$scope.roleType.selected?$scope.roleType.selected.userType:'',
                    monthRepaymentSituation:$scope.moneyType.selected?$scope.moneyType.selected.monthRepaymentSituation:'1',
                    currentPage:page

                });

                httpService(request,function (res) {
                    console.log(res);
                    console.log(res.data);
                    $scope.userBillListData = res.data.userBillList;
                    $scope.page = res.data.page;
                })
            };


            //逾期账单查询
            $scope.OverDueBillUser={};
            $scope.queryOverDueBillByList=function (time_start,time_end,page) {
                var request=riskService.queryOverDueBillByPage().query({
                    userName:$scope.OverDueBillUser.userName,
                    telephone:$scope.OverDueBillUser.telephone,
                    orderSn:$scope.OverDueBillUser.orderSn,
                    orderName:$scope.OverDueBillUser.orderName,
                    startDate:time_start,
                    endDate:time_end,
                    userType:$scope.roleType2.selected?$scope.roleType2.selected.userType:'',
                    isContact:$scope.isContactType.selected?$scope.isContactType.selected.isContact:'',
                    currentPage:page
                });
                httpService(request,function (res) {
                    console.log(res.data);

                    $scope.OverDueBillListData=res.data.overBillList;
                    // var userBillList2Data=res.data.overBillList;

                    //alert(userBillList2Data);
                    $scope.page2 = res.data.page;

                })
            };


            //已完成账单查询
            $scope.userFinishBill={};
            $scope.queryFinishBillByList=function (time_start,time_end,page) {
                var request=riskService.queryFinishBillByPage().query({
                    userName:$scope.userFinishBill.userName,
                    telephone:$scope.userFinishBill.telephone,
                    orderSn:$scope.userFinishBill.orderSn,
                    orderName:$scope.userFinishBill.orderName,
                    startDate:time_start,
                    endDate:time_end,
                    userType:$scope.roleType3.selected?$scope.roleType3.selected.userType:'',
                    currentPage:page
                });
                httpService(request,function (res) {
                    console.log(res.data);
                    $scope.finishedBillList=res.data.finishedBillList;
                    $scope.page3 = res.data.page;

                })
            };
    


    //    $scope.init();

        $scope.selectPage3=function (page) {
            $scope.currentPage=page;
            if (!!$scope.datetime.start_time.Format){
                var a = $scope.datetime.start_time.Format("yyyy-MM-dd");
            }
            if (!!$scope.datetime.start_end.Format){
                var b = $scope.datetime.start_end.Format("yyyy-MM-dd");
            }
            $scope.roleList(a,b,$scope.currentPage);
        };


        $scope.selectPage2=function (page) {
            $scope.currentPage=page;
            if (!!$scope.datetime2.time_start.FormData){
                var a = $scope.datetime2.time_start.Format("yyyy-MM-dd");
            }
            if(!!$scope.datetime2.time_end.Format){
                var b = $scope.datetime2.time_end.Format("yyyy-MM-dd");
            }
            $scope.queryOverDueBillByList(a,b,$scope.currentPage2);
        };

        $scope.selectPage=function (page) {
            $scope.currentPage=page;
            if (!!$scope.datetime3.time_start.Format){
                var a = $scope.datetime3.time_start.Format("yyyy-MM-dd");
            }
            if (!!$scope.datetime3.time_end.Format){
                var b = $scope.datetime3.time_end.Format("yyyy-MM-dd");
            }
            $scope.queryFinishBillByList(a,b,$scope.currentPage2);
        };



        $scope.$watch('currentPage', function (newVal, oldVal) {

            if($scope.datetime.start_time.Format&&$scope.datetime.start_end.Format){
                var a = $scope.datetime.start_time.Format("yyyy-MM-dd");
                var b = $scope.datetime.start_end.Format("yyyy-MM-dd");
                $scope.roleList(a,b,newVal);
            }else{
                $scope.roleList($scope.datetime.start_time,$scope.datetime.start_end,$scope.currentPage);
            }
        });

        $scope.$watch('currentPage2', function (newVal, oldVal) {
            console.log('watch');
            if ($scope.datetime2.time_start.Format&&$scope.datetime2.time_end.Format){
                var a = $scope.datetime2.time_start.Format("yyyy-MM-dd");
                var b = $scope.datetime2.time_end.Format("yyyy-MM-dd");
                $scope.queryOverDueBillByList(a,b,newVal);
            }else{
                $scope.queryOverDueBillByList($scope.datetime2.time_start,$scope.datetime2.time_end,$scope.currentPage2);
            }

        });
        $scope.$watch('currentPage3', function (newVal, oldVal) {
            console.log('watch');
            if ($scope.datetime3.time_start.Format&&$scope.datetime3.time_end.Format){
                var a = $scope.datetime3.time_start.Format("yyyy-MM-dd");
                var b = $scope.datetime3.time_end.Format("yyyy-MM-dd");
                $scope.queryFinishBillByList($scope.datetime3.time_start,$scope.datetime3.time_end,$scope.currentPage3);
            }else{
                $scope.queryFinishBillByList($scope.datetime3.time_start,$scope.datetime3.time_end,$scope.currentPage3);
            }
        });



        $scope.search = function () {
            var abc = $scope.datetime.start_time.Format("yyyy-MM-dd");
            var cdf = $scope.datetime.start_end.Format("yyyy-MM-dd");
            $scope.roleList(abc, cdf,$scope.currentPage);
        };


        $scope.search2 = function () {
            var abc = $scope.datetime2.time_start.Format("yyyy-MM-dd");
            var cdf = $scope.datetime2.time_end.Format("yyyy-MM-dd");
            $scope.queryOverDueBillByList(abc, cdf,$scope.currentPage2);
        };


        $scope.search3 = function () {
            var abc = $scope.datetime3.time_start.Format("yyyy-MM-dd");
            var cdf = $scope.datetime3.time_end.Format("yyyy-MM-dd");
            $scope.queryFinishBillByList(abc, cdf,$scope.currentPage3);
        };



        $scope.exportOrderInfo=function () {
            var export_starttime = $scope.datetime.start_time.Format("yyyy-MM-dd");
            var export_endtime = $scope.datetime.start_end.Format("yyyy-MM-dd");


            var userName=$scope.user.userName?$scope.user.userName:'';
            var telephone=$scope.user.telephone?$scope.user.telephone:'';
            var orderSn=$scope.user.orderSn?$scope.user.orderSn:'';
            var orderName=$scope.user.orderName?$scope.user.orderName:'';
            var userType=$scope.roleType.selected?$scope.roleType.selected.userType:'';


            var monthRepaymentSituation=$scope.moneyType.selected?$scope.moneyType.selected.monthRepaymentSituation:'1';


            window.open('/system/userBillInterface/exportRepaymentBill?userName='+userName+'&telephone='+telephone+'&orderSn='+orderSn+'&orderName='+orderName+'&userType='+userType+'&monthRepaymentSituation='+monthRepaymentSituation+'&startDate='+export_starttime+'&endDate='+export_endtime+'')

        };


        $scope.exportOverBill=function () {
            var exportOverBillTime_start=$scope.datetime2.time_start.Format("yyyy-MM-dd");

        var exportOverBillTime_end=$scope.datetime2.time_end.Format("yyyy-MM-dd");

        var userName=$scope.OverDueBillUser.userName?$scope.OverDueBillUser.userName:'';
        var telephone=$scope.OverDueBillUser.telephone?$scope.OverDueBillUser.telephone:'';
        var orderSn=$scope.OverDueBillUser.orderSn?$scope.OverDueBillUser.orderSn:'';
        var orderName=$scope.OverDueBillUser.orderName?$scope.OverDueBillUser.orderName:'';
        var userType=$scope.roleType2.selected?$scope.roleType2.selected.userType:'';

            var isContact=$scope.isContactType.selected?$scope.isContactType.selected.isContact:'';
            window.open('/system/userBillInterface/exportOverBill?userName='+userName+'&telephone='+telephone+'&orderSn='+orderSn+'&orderName='+orderName+'&startDate='+exportOverBillTime_start+'endDate&'+exportOverBillTime_end+'&userType='+userType+'&isContact='+isContact+'')
        };


        $scope.exportFinishBill=function () {
            var exportFinishBillTime_start=$scope.datetime3.time_start.Format("yyyy-MM-dd");

            var exportFinishBillTime_end=$scope.datetime3.time_end.Format("yyyy-MM-dd");

            var userName=$scope.userFinishBill.userName?$scope.userFinishBill.userName:'';
            var telephone=$scope.userFinishBill.telephone?$scope.userFinishBill.telephone:'';
            var orderSn=$scope.userFinishBill.orderSn?$scope.userFinishBill.orderSn:'';
            var orderName=$scope.userFinishBill.orderName?$scope.userFinishBill.orderName:'';

            var userType=$scope.roleType3.selected?$scope.roleType3.selected.userType:'';

            window.open('/system/userBillInterface/exportFinishedBill?userName='+userName+'&telephone='+telephone+'&orderSn='+orderSn+'&orderName='+orderName+'&startDate='+exportFinishBillTime_start+'&endDate='+exportFinishBillTime_end+'&userType='+userType+'');



        };










        //详情
        $scope.jumpToDetail = function (x) {
            console.log(x);
            var url = 'app.verifier.detail',
                url = $state.href(url, {userBillId: x});
            console.log(url);
            window.open(url);
        }
    }]);

