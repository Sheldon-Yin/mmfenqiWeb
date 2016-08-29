/**
 * Created by ChinaHp on 2016/6/27.
 */
app.controller('UserAttListCtrl', ['$scope', 'verificationService', '$state', 'myData', 'httpService', '$location', '$stateParams',
    function ($scope, verificationService, $state, myData, httpService, $location, $stateParams) {


            $scope.currentPage = 1;

            $scope.maxSize=4;

            $scope.disabled=true;

            $scope.userType={};

            var queryUser=function (page) {
                var request = verificationService.queryRealNameAuthentication().query({
                    realName: $scope.realName,
                    telphone: $scope.telphone,
                    currentPage: page

                });
                httpService(request,function (res) {
                    console.log(res.data);
                    $scope.page=res.data.page;
                    $scope.userCreditList=res.data.userCreditList;

                    var list=res.data.userCreditList;

                    for(var i=0;i<list.length;i++){
                        list[i].userTypess = list[i].userType;
                    }
                });

            };

            var selectUserType=function () {
                var requestSelect=verificationService.selectUserType().query({

                });
                httpService(requestSelect,function (res) {
                    console.log(res.data);
                    $scope.userTypeList=res.data.userTypeList;
                })
            };

            selectUserType();




        $scope.$watch('currentPage',function (newVal, oldVal) {
            queryUser(newVal);
        });

        $scope.search=function () {
            queryUser($scope.currentPage);
        };


        /**
         * 修改角色
         * @param xx
         */

        $scope.change_type=function (id,userType) {
            var msg='确定更改角色';

            layerMsg(msg,function () {
                var requestRoles=verificationService.change_user_roles().save({
                    userId:id,
                    userType:userType
                });

                httpService(requestRoles,function (res) {
                    console.log(res.data);

                    window.location.reload();

                });
            })



        };

        $scope.selectPage=function (page) {
            $scope.currentPage=page;
            queryUser($scope.currentPage);

        };
        function layerMsg(msg,cb) {
            layer.open({
                title: '提示',
                type: 1,
                shade: 0.3,
                skin: 'sure', //样式类名
                closeBtn: 1, //不显示关闭按钮
                btn: ['确定'],
                area: ['350px', '200px'],
                content: msg,
                btn1:function (index,layero) {
                    cb();
                    layer.closeAll();


                }

            });
        }



    }]);
