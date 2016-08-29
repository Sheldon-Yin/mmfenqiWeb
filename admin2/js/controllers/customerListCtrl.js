/**
 * Created by sheldon on 2016/5/4.
 */
app.controller('CustomerListCtrl', ['$scope', 'customerListService', '$state', 'toaster', 'myData', 'httpService', '$location', '$stateParams',
    function ($scope, customerListService, $state, toaster, myData, httpService, $location, $stateParams) {



        $scope.currentPage2=1;//退款

        $scope.currentPage = 1;//全部

        $scope.currentPage3=1; //待审核

        $scope.currentPage1=1; //未上传
        
        $scope.maxSize = 4;

        var watchPage;

        var isSelect=$stateParams.isSelect;

        $scope.goodsType = {};//商品类型查询

        $scope.orderStatus = {};//订单状态orderStatus

        $scope.hospitalId = {

        };//查询条件---医院hospitalId

        $scope.queryType = {
            selected:{
                message:'姓名',
                code:'1'
            }
        };//查询条件---姓名、手机号….下拉框queryType

        $scope.projectReviewStatus = {};

        $scope.queryTypeValue = {};
        $scope.contractNo = {};

        $scope._projectReviewStatus = $stateParams.projectReviewStatus;


        $scope.init = function () {
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
            
        };
        $scope.init();

        var  orderStatus_1=1;
        var  projectReviewStatus_1=1;


        var  projectReviewStatus0=0;
        var   orderStatus_11='';


        var orderStatus_10=10;
        var  projectReviewStatus_0='';

        var flag=false;


        var orderStatus=$scope.orderStatus.selected ? $scope.orderStatus.selected.code : '';
        var projectReviewStatus=$scope.projectReviewStatus.selected ? $scope.projectReviewStatus.selected.code : '';





        var num=$stateParams.projectReviewStatus;
        console.log( num);

        if(num==1){

            $scope.isSelect1=true;
            $scope.isSelect100=false;
            flag=true;

            $scope.currentPage=1;

            $scope.customerListData2='';

            $scope.page2='';

            var request = customerListService.queryOrderInfo().query({
                queryType: $scope.queryType.selected ? $scope.queryType.selected.code :'',
                queryTypeValue: $scope.queryTypeValue.no ? $scope.queryTypeValue.no : '',
                goodsType: $scope.goodsType.selected ? $scope.goodsType.selected.code : '',
                orderStatus: '1',
                projectReviewStatus: num,
                orderStartTime: '',
                orderEndTime: '',
                hospitalId: $scope.hospitalId.selected ? $scope.hospitalId.selected.hosId : '',
                contractNo: $scope.contractNo.no ? $scope.contractNo.no : '',
                currentPage: $scope.currentPage
            });
            httpService(request, function (res) {
                console.log(res);
                console.log(res.data);
                $scope.customerListData2 = res.data.orderGoodsList;
                $scope.page2 = res.data.page;
            });

        }else{

            $scope.isSelect100=true;
            $scope.isSelect1=false;

        }







        $scope.isSelect0=false;
        $scope.isSelect10=false;


        $scope.selectTab = function (_tab) {
            if (_tab == 1) {

                $scope.inputPage='';

                $scope.isSelect1=true;
                $scope.isSelect100=false;
                $scope.isSelect0=false;
                $scope.isSelect10=false;

                watchPage=1;

                $scope.currentPage=1;


                $scope.page2=0;

                $scope.customerList('','','','','','',orderStatus_1,projectReviewStatus_1,$scope.currentPage);
            }else if(_tab== 10){

                $scope.isSelect1=false;
                $scope.isSelect100=false;
                $scope.isSelect0=false;
                $scope.isSelect10=true;

                $scope.inputPage='';

                watchPage=10;
                $scope.currentPage=1;

                $scope.page2=0;

                $scope.customerList('','','','','','',orderStatus_10,projectReviewStatus_0,$scope.currentPage);
            }else if(_tab==0){

                $scope.isSelect1=false;
                $scope.isSelect100=false;
                $scope.isSelect0=true;
                $scope.isSelect10=false;

                $scope.inputPage='';
                watchPage=0;

                $scope.currentPage=1;

                $scope.page2=0;


                $scope.customerList('','','','','','',orderStatus_11,projectReviewStatus0,$scope.currentPage);
            }else if(_tab==100){

                $scope.isSelect1=false;
                $scope.isSelect100=true;
                $scope.isSelect0=false;
                $scope.isSelect10=false;

                $scope.inputPage='';
                watchPage=100;
                $scope.currentPage=1;

                $scope.page2=0;

                var ab = $scope.datetime.start_time.Format("yyyy-MM-dd");
                var bb = $scope.datetime.start_end.Format("yyyy-MM-dd");
                var orderStatus=$scope.orderStatus.selected ? $scope.orderStatus.selected.code : '';
                var projectReviewStatus=$scope.projectReviewStatus.selected ? $scope.projectReviewStatus.selected.code : '';
                $scope.customerList($scope.queryTypeValue.no ? $scope.queryTypeValue.no : '', $scope.goodsType.selected ? $scope.goodsType.selected.code : '',$scope.hospitalId.selected ? $scope.hospitalId.selected.hosId : '',$scope.contractNo.no ? $scope.contractNo.no : '',ab, bb,orderStatus,projectReviewStatus,$scope.currentPage);
            }
        };



        $scope.customerList = function (queryTypeValue,goodsType,hospitalId,contractNo,abc, cdf,orderStatus,projectReviewStatus, _page) {
            var request = customerListService.queryOrderInfo().query({
                queryType: $scope.queryType.selected ? $scope.queryType.selected.code :'1',
                queryTypeValue: queryTypeValue,
                goodsType: goodsType,
                orderStatus: orderStatus,
                projectReviewStatus: projectReviewStatus,
                orderStartTime: abc,
                orderEndTime: cdf,
                hospitalId: hospitalId,
                contractNo: contractNo,
                currentPage: _page
            });
            httpService(request, function (res) {
                console.log(res);
                console.log(res.data);
                $scope.customerListData2 = res.data.orderGoodsList;
                $scope.page2 = res.data.page;
                $scope.waitAuditOrderNum=res.data.waitAuditOrderNum;
                $scope.refundAuditOrderNum=res.data.refundAuditOrderNum;

            });

        };


        console.log('---------------');

        var ac = $scope.datetime.start_time;
        var bc = $scope.datetime.start_end;
       if(!flag){
           $scope.customerList($scope.queryTypeValue.no ? $scope.queryTypeValue.no : '', $scope.goodsType.selected ? $scope.goodsType.selected.code : '',$scope.hospitalId.selected ? $scope.hospitalId.selected.hosId : '',$scope.contractNo.no ? $scope.contractNo.no : '',ac, bc,$scope.orderStatus.selected ? $scope.orderStatus.selected.code : '',$scope.projectReviewStatus.selected ? $scope.projectReviewStatus.selected.code : '', $scope.currentPage);

           watchPage=100;

       }

        $scope.$watch('currentPage', function (newVal, oldVal) {


            if(watchPage==100){
                var a = $scope.datetime.start_time.Format("yyyy-MM-dd");
                var b = $scope.datetime.start_end.Format("yyyy-MM-dd");
                $scope.customerList($scope.queryTypeValue.no ? $scope.queryTypeValue.no : '', $scope.goodsType.selected ? $scope.goodsType.selected.code : '',$scope.hospitalId.selected ? $scope.hospitalId.selected.hosId : '',$scope.contractNo.no ? $scope.contractNo.no : '',a, b,$scope.orderStatus.selected ? $scope.orderStatus.selected.code : '',$scope.projectReviewStatus.selected ? $scope.projectReviewStatus.selected.code : '',newVal);
            }else if(watchPage==1||num==1){
                $scope.customerList('','','','','','',orderStatus_1,projectReviewStatus_1,newVal);
            }else if(watchPage==0){
                $scope.customerList('','','','','','',orderStatus_11,projectReviewStatus0,newVal);
            }else if(watchPage==10){
                $scope.customerList('','','','','','',orderStatus_10,projectReviewStatus_0,newVal);
            }


        });

        $scope.selectPage3=function (page) {
            $scope.currentPage=page;
            if(watchPage==100){
                var a = $scope.datetime.start_time.Format("yyyy-MM-dd");
                var b = $scope.datetime.start_end.Format("yyyy-MM-dd");
                $scope.customerList($scope.queryTypeValue.no ? $scope.queryTypeValue.no : '', $scope.goodsType.selected ? $scope.goodsType.selected.code : '',$scope.hospitalId.selected ? $scope.hospitalId.selected.hosId : '',$scope.contractNo.no ? $scope.contractNo.no : '',a,b,$scope.orderStatus.selected ? $scope.orderStatus.selected.code : '',$scope.projectReviewStatus.selected ? $scope.projectReviewStatus.selected.code : '',$scope.currentPage);
            }else if(watchPage==1){
                $scope.customerList('','',orderStatus_1,projectReviewStatus_1,$scope.currentPage);
            }else if(watchPage==0){
                $scope.customerList('','',orderStatus_11,projectReviewStatus0,$scope.currentPage);
            }else if(watchPage==10){
                $scope.customerList('','',orderStatus_10,projectReviewStatus_0,$scope.currentPage);
            }
        };




        //查询条件---商品类型goodsType
        $scope.queryGoodsType = function () {
            var request = customerListService.queryGoodsType().query({});
            httpService(request, function (res) {
                console.log(res.data);
                $scope.newGoodsTypeEnumListData = res.data.newGoodsTypeEnumList

            })
        };


        /**
         * 查询条件---订单状态orderStatus
         */
        $scope.query_order_status = function () {
            customerListService.query_order_status().query({}).$promise.then(function (res) {
                console.log(res.data);
                console.log(res.data.orderstatEnumList);
                console.log(res.data.orderstatEnumList);
                $scope.orderstatEnumListData = res.data.orderstatEnumList
            })
        };

        /**
         * 查询条件---姓名、手机号….下拉框queryType
         */
        $scope.query_select_type = function () {
            customerListService.query_select_type().query({}).$promise.then(function (res) {
                console.log(res.data);

                $scope.newSelectTypeEnumListData = res.data.newSelectTypeEnumList;

            })
        };


        //查询条件---医院hospitalId
        $scope.query_hospital = function () {
            customerListService.query_hospital().query({}).$promise.then(function (res) {
                console.log(res.data);
                $scope.hospitalListData = res.data.hospitalList;

                // $scope.hospitalId.selected={
                //     hosName:'全部',
                //     code:''
                // }
            })
        };

        //查询条件---项目审核状态projectReviewStatus
        $scope.projectReviewStatus = function () {
            customerListService.projectReviewStatus().query({}).$promise.then(function (res) {
                console.log(res.data);
                $scope.projectReviewStatusData = res.data.projectAuditStatusEnumList;

            })
        };


        //导出
        $scope.exportOrderInfo = function () {

            var export_starttime = $scope.datetime.start_time.Format("yyyy-MM-dd");
            var export_endtime = $scope.datetime.start_end.Format("yyyy-MM-dd");


            var queryType=$scope.queryType.selected ? $scope.queryType.selected.code : '';
            var queryTypeValue=$scope.queryTypeValue.no ? $scope.queryTypeValue.no : '';

            var goodsType= $scope.goodsType.selected ? $scope.goodsType.selected.code : '';
            var orderStatus=$scope.orderStatus.selected ? $scope.orderStatus.selected.code : '';
            var projectReviewStatus=$scope.projectReviewStatus.selected ? $scope.projectReviewStatus.selected.code : '';


            
            var hospitalId=$scope.hospitalId.selected ? $scope.hospitalId.selected.hosId : '';

            var contractNo=$scope.contractNo.no ? $scope.contractNo.no : '';


                window.open('/system/exportOrderInfo?queryType='+queryType+'&queryTypeValue='+queryTypeValue+'&goodsType='+goodsType+'&orderStatus='+orderStatus+'&projectReviewStatus='+projectReviewStatus+'' +
                    '&orderStartTime='+export_starttime+'&orderEndTime='+export_endtime+'&hospitalId='+hospitalId+'&contractNo='+contractNo+'');












            // httpService(request, function (res) {
            //     console.log(res)
            // })
        };

        $scope.query_select_type();
        $scope.projectReviewStatus();
        $scope.query_hospital();
        $scope.query_order_status();
        $scope.queryGoodsType();
        /**
         * 查询
         */
        $scope.search = function () {

            $scope.currentPage=1;
            var orderStatus_=$scope.orderStatus.selected ? $scope.orderStatus.selected.code : '';
            var projectReviewStatus_=$scope.projectReviewStatus.selected ? $scope.projectReviewStatus.selected.code : '';
            var abc = $scope.datetime.start_time.Format("yyyy-MM-dd");
            var cdf = $scope.datetime.start_end.Format("yyyy-MM-dd");
            $scope.customerList($scope.queryTypeValue.no ? $scope.queryTypeValue.no : '', $scope.goodsType.selected ? $scope.goodsType.selected.code : '',$scope.hospitalId.selected ? $scope.hospitalId.selected.hosId : '',$scope.contractNo.no ? $scope.contractNo.no : '',abc, cdf,orderStatus_,projectReviewStatus_,$scope.currentPage);
        };

        //详情
        $scope.jumpToDetail = function (x) {
            console.log(x);
            var url = 'app.customer.detail',
                url = $state.href(url, {id: x});
            console.log(url);

            window.open(url);
        };


        $scope.cancel_order = function (id) {


            layer.open({
                title: '请填写取消订单原因',
                type: 1,
                shade: 0.3,
                closeBtn: 1, //不显示关闭按钮
                btn: ['不取消', '确认取消'],
                area: ['350px', '200px'],
                content: '<textarea name="text"  cols="37" rows="3" placeholder="输入原因" id="textarea" ></textarea>',
                btn1: function (index, layero) {
                    layer.closeAll();
                },
                btn2: function () {

                    if ($("#textarea").val() == '') {
                        return;
                    }
                    var request = customerListService.cancelOrder().query({
                        orderId: id,
                        cancelReason: $("#text").val()
                    });
                    httpService(request, function (res) {
                        layer.open({
                            title: '提示',
                            type: 1,
                            shade: 0.3,
                            skin: 'sure', //样式类名
                            closeBtn: 1, //不显示关闭按钮
                            btn: ['确定'],
                            area: ['350px', '200px'],
                            content: '提交成功',
                            btn1: function (index, layero) {
                                //$location.path('/app/customer/list')
                                // window.location.reload()
                                var starttimecb = $scope.datetime.start_time.Format("yyyy-MM-dd");
                                var endtimecb = $scope.datetime.start_end.Format("yyyy-MM-dd");
                                $scope.customerList($scope.queryTypeValue.no ? $scope.queryTypeValue.no : '', $scope.goodsType.selected ? $scope.goodsType.selected.code : '',$scope.hospitalId.selected ? $scope.hospitalId.selected.hosId : '',$scope.contractNo.no ? $scope.contractNo.no : '',starttimecb, endtimecb,$scope.orderStatus.selected ? $scope.orderStatus.selected.code : '',$scope.projectReviewStatus.selected ? $scope.projectReviewStatus.selected.code : '',$scope.currentPage);
                                //$scope.customerList(starttimecb, endtimecb, $scope.currentPage);
                                layer.closeAll();
                            }

                        });

                    });


                }


            });
        };


    }]);
