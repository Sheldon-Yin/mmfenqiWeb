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
    })

;