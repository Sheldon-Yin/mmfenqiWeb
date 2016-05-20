/**
 * Created by sheldon on 2016/5/9.
 */
app.controller('SettingUserListCtrl', ['$scope', 'QueryTenant', 'DeleteTenant', 'ResetPassword','toaster',
    function ($scope, QueryTenant, DeleteTenant, ResetPassword,toaster) {
        console.log('SettingAddUserCtrl');

        $scope.initUserList = function () {
            $scope.queryUserList = QueryTenant.save({
                channel: 1
            });

            $scope.queryUserList.$promise.then(function (res) {
                if (res.result == 0) {
                    $scope.data = res.data.tenantResponse;
                    console.log(res)
                } else {
                    console.log(res)
                }

            }).catch(function (error) {
                console.log(error)
            });
        };

        $scope.initUserList();


        $scope.resetPassword = function (x) {

            $scope.resetPasswordReq = ResetPassword.save({
                userId: x.id,
                channel:1
            });
            $scope.resetPasswordReq.$promise.then(function (res) {
                if (res.result == 0){
                    console.log(res);
                    toaster.pop('success','修改成功',res.msg)
                }else {
                    toaster.pop('error','修改失败',res.msg);
                    console.log(res.message)
                }
            }).catch(function (error) {
                toaster.pop('error','修改失败',error);
                console.log(error)
            })
        };

        $scope.deleteUser = function (x) {
            $scope.deleteReq = DeleteTenant.save({
                userId: x.id,
                channel: 1
            });
            $scope.deleteReq.$promise.then(function (res) {
                if (res.result == 0) {
                    toaster.pop('success','删除',res.msg);
                    console.log(res);
                    $scope.initUserList();
                } else {
                    console.log(res.message);
                    toaster.pop('error','删除失败',res.msg);
                }
            }).catch(function (error) {
                console.log(error);
                toaster.pop('error','删除失败',error);
            })
        };

    }]);