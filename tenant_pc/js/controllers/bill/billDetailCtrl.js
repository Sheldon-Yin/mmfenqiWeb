/**
 * Created by sheldon on 2016/5/9.
 */
app.controller('BillDetailCtrl', ['$scope', '$state', '$stateParams','QueryOrderDetail', 'ReceiptPic', 'toaster',
    function ($scope, $state, $stateParams,QueryOrderDetail, ReceiptPic, toaster) {

        console.log($stateParams.id);

        $scope.initOrderDetails = function () {
            $scope.orderDetail = QueryOrderDetail.query({
                channel: 1,
                orderSn: $stateParams.orderSn
            });

            $scope.orderDetail.$promise.then(function (res) {
                if (res.result == 0) {
                        $scope.orderDetailInfo = res.data.orderResponse;
                    $scope.downloadImgUrl = res.data.orderResponse.receiptPicUrl;
                } else {
                        toaster.pop('info', '获取失败', res.msg)
                }
                console.log(res)
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
            formData.append('orderId', $stateParams.id);
            formData.append('receiptPic', $scope.uploadImgForInform);
            $.ajax(
                {
                    url: '/tenant/upload_receipt_pic',
                    type: 'POST',
                    data: formData,
                    contentType: false, //必须
                    processData: false, //必须
                    success: function (res) {
                        if (res.result == 0) {
                            $scope.$apply(function () {
                                toaster.pop('success', '上传成功', res.msg);
                                $scope.downloadImgUrl = res.data.receiptPicUrl;
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