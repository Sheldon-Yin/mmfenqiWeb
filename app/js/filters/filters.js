/* Filters */
define(function (require, exports, module) {
  "use strict";
    //console.log('filter');
  module.exports = function(app){
      app.filter('checkmark', function() {
        return function (input) {
          return input ? '\u2713' : '\u2718';
        }
      });
      app.filter('percent',function() {
          return function (input) {
              return input*10 + '%';
          }
      });
      app.filter('orderStatus', function () {
          return function (input) {
              var res;
              switch (input){
                  case "1":
                      res = '待支付';
                      break;
                  case "2":
                      res = '待完成';
                      break;
                  case "3":
                      res = '已完成';
                      break;
                  case "4":
                      res = '已取消';
                      break;
                  case "5":
                      res = '退款审核中';
                      break;
                  case "6":
                      res = '退款成功 ';
                      break;
              }
              console.log(res);
              return res;
          }
      })
  }
});
