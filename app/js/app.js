'use strict';

/* App Module */
//console.log('初始化前');
define(function (require, exports, module) {
  //console.log('初始化');
  //console.log('init app...' + (new Date().getTime()));

  //Step3: add 'angular-lazyload' to your main module's list of dependencies
  var app = angular.module('app', ['angular-lazyload', 'ngRoute','ngResource','ui.angularSku']);
  require('./route.js')(app);
  require('./filters/filters.js')(app);
  require('./directives/directives.js')(app);
  //require('./animations/animations.js')(app);
  //require('./common/core.js')(app);
  //配置期

  //运行期
  app.run(['$lazyload', function($lazyload){
    //Step5: init lazyload & hold refs
    $lazyload.init(app);
    //console.log('运行期1');
    app.register = $lazyload.register;
    //console.log('运行期2');
  }]);

  //console.log('运行期3');
  module.exports = app;
  //console.log('运行期4');
});
