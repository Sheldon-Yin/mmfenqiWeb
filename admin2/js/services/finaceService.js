/**
 * Created by ChinaHp on 2016/7/15.
 */
angular.module('app')
    .factory('finaService', ['$resource',
        function ($resource) {
            return {
                //医院
                query_hospital: function () {
                    return $resource('/system/query_hospital', {}, {
                        query: {
                            method: 'GET', params: {}
                        }
                    })
                },
                //查询条件---订单状态orderStatus
                queryOrderStatus: function () {
                    return $resource('/system/query_order_status', {}, {
                        query: {
                            method: 'GET', params: {}
                        }
                    })
                },
                //查询条件---姓名、手机号….下拉框queryType
                querySelectType: function () {
                    return $resource('/system/query_select_type', {}, {
                        query: {
                            method: 'GET', params: {}
                        }
                    })
                }

            }
        }]);
