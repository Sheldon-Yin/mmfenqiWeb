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
      })
  }
});
