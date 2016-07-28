/**
 * Created by sheldon on 2016/7/4.
 */
angular.module('starter.filters', [])
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
  .filter('receiptStatus', function () {
    return function (receipt) {
      switch (receipt.receiptAudit) {
        case 0:
          return '未上传';
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
          return '未知的收据状态'
      }
    }
  })
  .filter('projectStatus', function () {
    return function (project) {
      switch (project.projectReviewStatus) {
        case 0:
          return '未上传';
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
          return '未知的同意书状态'
      }
    }
  })
  .filter('orderStatus', function () {
    return function (order) {
      switch (order.orderstat) {
        case 0:
          return '未支付';
          break;
        case 1:
          return '已支付';
          break;
        case 4:
          return '已完成';
          break;
        case 7:
          return '已取消';
          break;
        case 9:
          return '已取消';
          break;
        case 10:
          return '已取消';
          break;
        default:
          return '未知的订单状态'
      }
    }
  });
