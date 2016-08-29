'use strict';

/* Filters */
// need load the moment.js to use this filter. 
angular.module('app')
    .filter('fromNow', function () {
        return function (date) {
            return moment(date).fromNow();
        }
    })
    .filter('visitReturn', function () {
        return function (x) {
            if (x == 1) {
                return '已回访'
            } else {
                return '未回访'
            }
        }
    })
    .filter('abc',function () {
        return function (x) {
            switch (x) {
                case 'undefined':
                    return '';
                    break;

            }
        }
    })
    .filter('projectStatus', function () {
        return function (x) {
            switch (x) {
                case 'treat':
                    return '成单已治疗';
                    break;
                case 'not_treat':
                    return '成单未治疗';
                    break;
                case 'not_deal':
                    return '未成交';
                    break;
                case 'cancel':
                    return '取消';
                    break;
                default:
                    return '未知的项目状态';
            }
        }
    }).filter('_projectReviewStatus', function () {
        return function (x) {
            switch (x) {
                case 0:
                    return '未上传（知情书）';
                    break;
                case 1:
                    return '待审核（项目）';
                    break;
                case 2:
                    return '审核通过';
                    break;
                case 3:
                    return '审核不通过';
                    break;
                default:
                    return '';
            }
        }
    }).filter('_orderStatus', function () {
        return function (x) {
            switch (x) {
                case 0:
                    return '待支付';
                    break;
                case 1:
                    return '已支付';
                    break;
                case 4:
                    return '已消费';
                    break;
                case 7:
                    return '已取消';
                    break;
                case 10:
                    return '退款处理中';
                    break;
                case 9:
                    return '已退款 ';
                    break;
                default:
                    return '';
            }
        }
    })
    .filter('goodsType', function () {
        return function (x) {
            switch (x) {
                case 0:
                    return '普通商品';
                    break;
                case 1:
                    return '自定义商品';
                    break;
                default:
                    return '';
            }
        }
    })
    .filter('_insuranceStatus', function () {
        return function (x) {
            switch (x) {
                case 0:
                    return '待发送';
                    break;
                case 1:
                    return '发送成功';
                    break;
                case 2:
                    return '发送失败';
                    break;
                default:
                    return '';

            }
        }
    })
    .filter('_userType', function () {
        return function (x) {
            switch (x) {
                case 0:
                    return '进入正常用户';
                    break;
                case 1:
                    return '地推人员';
                    break;
                case 2:
                    return '医美人员';
                    break;
                case 4:
                    return '测试人员';
                    break;
                case 5:
                    return '小主';
                    break;
                case 6:
                    return '白领';
                    break;
                default:
                    return '';

            }
        }
    })
    //
    .filter('_newCreditStatus', function () {
        return function (x) {
            switch (x) {
                case '0':
                    return '未提交';
                    break;
                case '1':
                    return '审核成功';
                    break;
                case '2':
                    return '审核失败';
                    break;
                case '3':
                    return '待审核';
                    break;
                case '4':
                    return '部分审核通过';
                    break;
                default:
                    return '';

            }
        }
    })
//查询芝麻信用认证信息
    .filter('query_user_sesame_credit', function () {
        return function (x) {
            switch (x) {
                case '0':
                    return '未提交';
                    break;
                case '1':
                    return '审核成功';
                    break;
                case '2':
                    return '审核失败';
                    break;
                case '3':
                    return '待审核';
                    break;
                default:
                    return '';

            }
        }
    })




;
