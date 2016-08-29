/**
 * Created by sheldon on 2016/5/9.
 */
app.controller('ReportRepeatCtrl', ['$scope', '$state', '$stateParams','QueryOrderDetail', 'ReceiptPic','ReportDetail', 'toaster',
    function ($scope, $state, $stateParams,QueryOrderDetail, ReceiptPic,ReportDetail, toaster) {

        console.log($stateParams.id);

        $scope.initOrderDetails = function () {

            $scope.reportDetail = ReportDetail.query({
                channel: 1,
                id: $stateParams.id
            });

            $scope.reportDetail.$promise.then(function (res) {
                console.log(res);
                if (res.result == 0) {
                    $scope.reportDetailInfo = res.data.userOrderReportRecord;
                    $scope.messages = res.data.userOrderReportMessageList;
                } else {
                    toaster.pop('info', '获取失败', res.msg)
                }
            }).catch(function (error) {
                toaster.pop('error', '获取失败', error)
            })

        };

        $scope.initOrderDetails();

        $scope.uploadInform = function (files) {
            $scope.uploadImgForInform = files[0];
            $scope.$apply(function () {
                toaster.pop('info', '开始上传', files[0].name)
            });

            var formData = new FormData();

            formData.append('channel', 1);
            formData.append('id', $stateParams.id);
            formData.append('voucherPic', $scope.uploadImgForInform);
            $.ajax(
                {
                    url: '/tenant/upload_voucher_pic',
                    type: 'POST',
                    data: formData,
                    contentType: false, //必须
                    processData: false, //必须
                    success: function (res) {
                        if (res.result == 0) {
                            $scope.$apply(function () {
                                toaster.pop('success', '上传成功', res.msg);
                                window.history.back();
                            })
                        } else {
                            $scope.$apply(function () {
                                toaster.pop('info', '上传失败', res.msg)
                            })
                        }
                        console.log(res)
                    },
                    fail: function (error) {
                        $scope.$apply(function () {
                            toaster.pop('error', '上传失败', error)
                        })
                    }
                }
            )
        };

    }]);