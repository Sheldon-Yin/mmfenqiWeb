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
    .filter('receiptAudit', function () {
        return function (receiptAudit) {
            switch (receiptAudit) {
                case 0:
                    return '未审核';
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
                default:
                    return '未知的审核状态';
            }
        }
    })
    .filter('orderStatus', function () {
        return function (receiptAudit) {
            switch (receiptAudit) {
                case 0:
                    return '待支付';
                    break;
                case 1:
                    return '待完成';
                    break;
                case 4:
                    return '已完成';
                    break;
                case 7:
                    return '已取消';
                    break;
                default:
                    return '未知的审核状态';
            }
        }
    })
;