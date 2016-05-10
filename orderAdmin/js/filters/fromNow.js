'use strict';

/* Filters */
// need load the moment.js to use this filter. 
angular.module('app')
  .filter('fromNow', function() {
    return function(date) {
      return moment(date).fromNow();
    }
  })
    .filter('visitReturn', function () {
        return function (x) {
            if (x == 1){
                return '已回访'
            } else {
                return '未回访'
            }
        }
    })
;