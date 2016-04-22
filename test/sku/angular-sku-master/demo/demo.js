var myapp = angular.module('skuApp', ['ui.angularSku']);

myapp.controller('skuController', function ($scope) {
  'use strict';
  $scope.type = 'parent';

  setTimeout(function () {
    console.log(1);
    $scope.ok = 1;
  },1000);



});
