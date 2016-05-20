'use strict';

/* Filters */
// need load the moment.js to use this filter. 
angular.module('app')
    .filter('fromNow', function () {
        return function (date) {
            return moment(date).fromNow();
        }
    })
    .filter('adminType', function () {
        return function (type) {
            if (type == 0) {
                return '管理员'
            } else if (type == 1) {
                return '咨询师'
            } else if (type == 2) {
                return '财务'
            }
        }
    })
    .filter('billStatus', function () {
        return function (bill) {
            if (bill.orderstat == 7 || bill.orderstat == 9 || bill.orderstat == 10) {
                return '已取消'
            } else {
                switch (bill.receiptAudit) {
                    case 0:
                        if (bill.verificationStatus == 1) {
                            return '未上传'
                        } else if (bill.verificationStatus == 0 || bill.verificationStatus == 2) {
                            return '待结算'
                        } else {
                            return '未知的审核状态'
                        }
                        break;
                    case 1:
                        return '审核中';
                        break;
                    case 2:
                        return '审核成功';
                        break;
                    case 3:
                        return '审核失败';
                        break;
                    case 4:
                        return '提现中';
                        break;
                    case 5:
                        return '提现成功';
                        break;
                    default:
                        return '未知的审核状态'
                }
            }
        }
    })
    .filter('orderStatus', function () {
        return function (order) {
            if (order.receiptAudit == 5) {
                return '已完成';
            } else {
                if (order.orderstat == 1) {
                    if (order.projectReviewStatus == 2) {
                        switch (order.verificationStatus) {
                            case 0:
                                return '待验证';
                                break;
                            case 1:
                                return '验证成功';
                                break;
                            case 2:
                                return '验证失败';
                                break;
                            default:
                                return '未知的订单状态'
                        }
                    } else if (order.projectReviewStatus == 0 || order.projectReviewStatus == 1 || order.projectReviewStatus == 3) {
                        return '已支付';
                    } else {
                        return '未知的订单状态'
                    }
                } else if (order.orderstat == 7 || order.orderstat == 9 || order.orderstat == 10) {
                    return '已取消';
                } else if (order.orderstat == 4) {
                    if (order.receiptAudit == 0 || order.receiptAudit == 1 || order.receiptAudit == 2 || order.receiptAudit == 3 || order.receiptAudit == 4) {
                        return '验证成功';
                    } else {
                        return '未知的订单状态'
                    }
                }
                else {
                    return '未知的订单状态'
                }
            }
        }
    })
;