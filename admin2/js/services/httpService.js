/**
 * Created by ChinaHp on 2016/6/29.
 */
angular.module('app')
    .service('httpService', ['$resource','$state', function ($resource,$state) {
        return function (request, success , error) {
            request.$promise.then(function (res) {
                console.log(res);
                if (res.result == 0) {
                    return success(res)
                } else if (res.result == 1013) {
                    console.log('qu deng lu');

                    //去登录 - - - - - - -

                     $state.go('access.signin');
                } else if(res.result==1){
                   console.log('后台返回1，接口问题')
                } else {
                    console.log(res);
                    if (!!error){
                        return error(res)
                    }
                }
            }).catch(function (err) {
                console.log('服务器返回失败');
                console.log(err)
            })
        }
    }]);