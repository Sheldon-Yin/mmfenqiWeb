/**
 * Created by sheldon on 2016/5/11.
 */
angular.module('app')
    .factory('Login', ['$resource',
        function ($resource) {
            return $resource('/tenant/login', {}, {
                save: {
                    method: 'POST'
                }
            });
        }])
    .factory('IsLogin', ['$resource',
        function ($resource) {
            return $resource('/tenant/check_is_Login', {}, {
                query: {method: 'GET'}
            })
        }])
    .factory('LogOut', ['$resource',
        function ($resource) {
            return $resource('/tenant/loginout', {}, {
                query: {method: 'GET'}
            })
        }])
    .factory('ResetPassword', ['$resource',
        function ($resource) {
            return $resource('/tenant/resetPwd', {}, {
                save: {method: 'POST'}
            })
        }])
    .factory('ChangePassword', ['$resource',
        function ($resource) {
            return $resource('/tenant/changePwd', {}, {
                save: {method: 'POST'}
            })
        }])
    .factory('QueryTenant', ['$resource',
        function ($resource) {
            return $resource('/tenant/queryTenant', {}, {
                save: {method: 'POST'}
            })
        }])
    .factory('AddTenant', ['$resource',
        function ($resource) {
            return $resource('/tenant/addTenant', {}, {
                save: {method: 'POST'}
            })
        }])
    .factory('DeleteTenant', ['$resource',
        function ($resource) {
            return $resource('/tenant/deleteTenant', {}, {
                save: {method: 'POST'}
            })
        }])
    .factory('QueryDiyProject', ['$resource',
        function ($resource) {
            return $resource('/tenant/query_custom_project', {}, {
                query: {method: 'GET'}
            })
        }])
    .factory('AddDiyProject', ['$resource',
        function ($resource) {
            return $resource('/tenant/upload_custom_project', {}, {
                query: {method: 'GET'}
            })
        }])
    .factory('DeleteDiyProject', ['$resource',
        function ($resource) {
            return $resource('/tenant/del_custom_project', {}, {
                query: {method: 'GET'}
            })
        }])
    .factory('QueryOrderList', ['$resource',
        function ($resource) {
            return $resource('/tenant/query_order_list', {}, {
                query: {method: 'GET'}
            })
        }])
    .factory('QueryOrderDetail', ['$resource',
        function ($resource) {
            return $resource('/tenant/query_order_detail', {}, {
                query: {method: 'GET'}
            })
        }])
    .factory('VerifyOrder', ['$resource',
        function ($resource) {
            return $resource('/tenant/order_validate', {}, {
                query: {method: 'GET'}
            })
        }])
    .factory('ConsultantInfo', ['$resource',
        function ($resource) {
            return $resource('/tenant/consultant_index', {}, {
                query: {method: 'GET'}
            })
        }])
    .factory('FinanceInfo', ['$resource',
        function ($resource) {
            return $resource('/tenant/query_finance_index', {}, {
                query: {method: 'GET'}
            })
        }])
    .factory('ReceiptPic', ['$resource',
        function ($resource) {
            return $resource('/tenant/upload_receipt_pic', {}, {
                save: {method: 'POST'}
            })
        }])
    .factory('GetCash', ['$resource',
        function ($resource) {
            return $resource('/tenant/finance_withdraw', {}, {
                save: {method: 'POST'}
            })
        }])
    .factory('Categories', ['$resource',
        function ($resource) {
            return $resource('/tenant/query_category', {cityId: '@cityId'}, {
                query: {method: 'GET', params: {cityId: '0'}}
            });
        }])
    .factory('Reports', ['$resource',
        function ($resource) {
            return $resource('/tenant/query_order_report', {}, {
                query: {method: 'GET', params: {}}
            });
        }])
    .factory('ReportDetail', ['$resource',
        function ($resource) {
            return $resource('/tenant/query_order_report_detail', {}, {
                query: {method: 'GET', params: {}}
            });
        }])
    .factory('ReportNoRepeat', ['$resource',
        function ($resource) {
            return $resource('/tenant/order_report_status_operate', {}, {
                query: {method: 'GET', params: {}}
            });
        }])
    .factory('ReportRepeat', ['$resource',
        function ($resource) {
            return $resource('/tenant/upload_voucher_pic', {}, {
                query: {method: 'GET', params: {cityId: '0'}}
            });
        }])
    .factory('ReportResume', ['$resource',
        function ($resource) {
            return $resource('/tenant/consume_status_operate', {}, {
                save: {method: 'POST', params: {}}
            });
        }])
    .factory('ReportMessage', ['$resource',
        function ($resource) {
            return $resource('/tenant/upload_order_report_message', {}, {
                save: {method: 'POST', params: {}}
            });
        }])


;


