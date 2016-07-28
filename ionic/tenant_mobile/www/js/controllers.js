angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope) {
  })

  .controller('BillsCtrl', function ($scope, Bills, ionicDatePicker, $ionicModal, QueryOrderList, httpService,$ionicScrollDelegate) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.moredata = true;
    $scope.currentPage = 1;
    $scope.start_time = new Date();
    $scope.start_time.setMonth((new Date()).getMonth() - 1);
    $scope.end_time = new Date();
    $scope.end_time.setHours(23);
    $scope.end_time.setMinutes(59);
    $scope.end_time.setSeconds(59);
    $scope.start_time.setHours(0);
    $scope.start_time.setSeconds(0);
    $scope.start_time.setMinutes(0);

    $scope.initBillList = function (cb) {
      httpService(QueryOrderList.query({
        channel: 1,
        startTime: $scope.start_time ? Date.parse($scope.start_time) : null,
        endTime: $scope.end_time ? Date.parse($scope.end_time) : null,
        username: !!$scope.userName ? $scope.userName : '',
        telephone: !!$scope.telephone ? $scope.telephone : '',
        receiptAudit: $scope.receiptAudit ? $scope.receiptAudit : '',
        currentPage: $scope.currentPage
      }), cb)
    };
    $scope.initBillList(function (res) {
      if ($scope.currentPage = 1) {
        $scope.bills = res.data.orderList;
      } else {

      }
    });

    $scope.updateDate = function () {
      $scope.start_time.setHours(0);
      $scope.start_time.setSeconds(0);
      $scope.start_time.setMinutes(0);
      $scope.end_time.setHours(23);
      $scope.end_time.setMinutes(59);
      $scope.end_time.setSeconds(59);
      console.log($scope.start_time);
      console.log($scope.end_time);
      $scope.refresh();
    };

    $scope.updateStatus = function () {
      $scope.initBillList();
    };

    $scope.goToSearch = function (userInfo) {
      console.log(userInfo);
      $scope.userName = userInfo.userName;
      $scope.telephone = userInfo.telephone;
      $scope.refresh();
      $scope.modal.hide()
    };

    $ionicModal.fromTemplateUrl('templates/modal/searchBill.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
      console.log($scope.modal);
    });

    var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        $scope.start_time = new Date(val);
        $scope.updateDate()
      },
      from: new Date(2012, 1, 1), //Optional
      to: new Date(2016, 10, 30), //Optional
      inputDate: $scope.start_time,      //Optional
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };

    var ipObj2 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        $scope.end_time = new Date(val);
        $scope.updateDate()
      },
      from: new Date(2012, 1, 1), //Optional
      to: new Date(2016, 10, 30), //Optional
      inputDate: $scope.end_time,      //Optional
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };

    $scope.openStartPicker = function () {
      ionicDatePicker.openDatePicker(ipObj1);
    };

    $scope.openEndPicker = function () {
      ionicDatePicker.openDatePicker(ipObj2);
    };

    $scope.loadMore = function () {
      $scope.currentPage += 1;
      $scope.initBillList(function (res) {
        if (res.data.orderList.length == 0) {
          $scope.moredata = false;
          console.log('没有更多数据了');
        } else {
          $scope.bills = $scope.bills.concat(res.data.orderList);
          console.log($scope.bills);
          console.log('加载完了');
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    };

    $scope.refresh = function () {
      $scope.currentPage = 1;
      $scope.initBillList(function (res) {
        if (res.data.orderList.length == 0) {
          Toast('在该筛选条件下好像没有数据哦');
          $scope.bills = res.data.orderList;
          $scope.moredata = false;
          $scope.$broadcast('scroll.refreshComplete');
        } else {
          $scope.moredata = true;
          $scope.bills = res.data.orderList;
          console.log($scope.bills);
          Toast('刷新成功');
          $ionicScrollDelegate.scrollTop();
          setTimeout(function () {
            $scope.$broadcast('scroll.refreshComplete');
          }, 1000);

        }
      });
    }

  })

  .controller('BillDetailCtrl', function ($scope, $stateParams, Bills) {
    $scope.bill = Bills.get($stateParams.billId);
  })

  .controller('AccountCtrl', function ($scope, LogOut, httpService, $state, FinanceInfo) {
    $scope.logOut = function () {
      httpService(LogOut.query(), function (res) {
        if (res.result == 0) {
          $state.go('login')
        }
      })
    };
    httpService(FinanceInfo.query({
      channel: 1
    }), function (res) {
      $scope.moneyInfo = res.data.financeResponse;
    });
    $scope.userInfo = JSON.parse(window.localStorage.userInfo);
  })

  .controller('LoginCtrl', function ($scope, Login, MD5, $state) {
    $scope.login = function () {
      $scope.authError = null;
      // Try to login
      $scope.loginReq = Login.save({
        userName: $scope.user.username,
        password: MD5($scope.user.password),
        channel: 1
      });
      $scope.loginReq.$promise.then(function (res) {
        if (res.result == 0) {
          window.localStorage.userInfo = JSON.stringify({
            userName:res.data.tenantInfo.userName,
            adminType:res.data.tenantInfo.adminType,
            hospitalName:res.data.hospitalName
          });
          $state.go('tab.bills')
        } else if (res.result != 0) {
          Toast('登录失败,' + res.msg);
          console.log('登录失败');
        }
        console.log(res)
      }).catch(function (error) {
        Toast('登录失败', error)
      })
    };
  });
