/**
 * Created by sheldon on 2016/5/9.
 */
app.controller('OrderDiyCtrl', ['$scope', 'QueryDiyProject', 'DeleteDiyProject', 'AddDiyProject','toaster',
    function ($scope, QueryDiyProject, DeleteDiyProject, AddDiyProject,toaster) {

        $scope.initDiyGoods = function () {
            $scope.queryDiyProject = QueryDiyProject.query({
                channel: 1
            });
            $scope.queryDiyProject.$promise.then(function (res) {
                if (res.result == 0) {
                    console.log(res);
                    $scope.data = res.data.customProjectList;
                } else {
                    console.log(res)
                }
            }).catch(function (error) {
                console.log(error)
            });
        };

        $scope.initDiyGoods();

        $scope.addDiyGoods = function () {
            $scope.addDiyProject = AddDiyProject.query({
                projectType: $scope.projectType,
                goodsName: $scope.goodsName,
                price: $scope.price,
                channel: 1
            });
            $scope.addDiyProject.$promise.then(function (res) {
                if (res.result == 0) {
                    toaster.pop('success','添加成功');
                    $scope.initDiyGoods();
                } else {
                    toaster.pop('error','添加失败',res.msg);
                }
            }).catch(function (error) {
                toaster.pop('error','添加失败',error);
            });
        };

        $scope.deleteDiyGoods = function (x) {
            $scope.deleteDiyProject = DeleteDiyProject.query({
                channel: 1,
                customProjectId: x.id
            });
            $scope.deleteDiyProject.$promise.then(function (res) {
                if (res.result == 0) {
                    toaster.pop('success','删除成功');
                    $scope.initDiyGoods();
                } else {
                    toaster.pop('error','删除失败',res.msg);
                }
            }).catch(function (error) {
                toaster.pop('error','删除失败',error);
            });
        };
        
        $scope.showQrCodeImg = function (x) {
            $scope.qrCodeImg = x.projectQrUrl;
        }

    }]);