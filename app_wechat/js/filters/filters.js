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
      });
      app.filter('billStatus', function () {
          return function (input) {
              var res;
              switch (input){
                  case "0":
                      res = '待还款';
                      break;
                  case "1":
                      res = '已还款';
                      break;
                  case "2":
                      res = '延期还款';
                      break;
                  case "3":
                      res = '逾期还款';
                      break;
              }
              console.log(res);
              return res;
          }
      });
      app.filter('groupStatus', function () {
          return function (input) {
              var res;
              switch (input){
                  case "0":
                      res = '全部';
                      break;
                  case "1":
                      res = '拼团中';
                      break;
                  case "2":
                      res = '拼团成功';
                      break;
                  case "3":
                      res = '退款中';
                      break;
                  case "4":
                      res = '已退款';
                      break;
              }
              console.log(res);
              return res;
          }
      });
      app.filter('groupJoinStatus', function () {
          return function (input) {
              var res;
              if(!input){
                  return
              }
              switch (input.toString()){
                  case "0":
                      res = '可开团';
                      break;
                  case "1":
                      res = '可参团';
                      break;
                  case "2":
                      res = '已参团';
                      break;
                  case "3":
                      res = '拼团成功';
                      break;
                  case "4":
                      res = '已结束';
                      break;
                  case "5":
                      res = '参团失败';
                      break;
                  case "6":
                      res = '此团已满';
                      break;
              }
              console.log(res);
              return res;
          }
      });
      app.filter('isRealName', function () {
          return function (input) {
              if (input == 1){
                  input = true;
              }else if(input == 0){
                  input = false;
              }
              var res;
              switch (input){
                  case true:
                      res = '已认证';
                      break;
                  case false:
                      res = '未认证';
                      break;
              }
              console.log(res);
              return res;
          }
      });
      app.filter('verifyStatus', function () {
          return function (input) {
              var res;
              switch (input){
                  case "0":
                      res = '立即提额';
                      break;
                  case "1":
                      res = '已通过';
                      break;
                  case "2":
                      res = '重新提额';
                      break;
                  case "3":
                      res = '审核中';
                      break;
                  default:
                      res = '立即提额';
              }
              return res;
          }
      })
  }
});
