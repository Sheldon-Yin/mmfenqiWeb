/**
 * Created by ChinaHp on 2016/6/22.
 */
app.factory( 'myData', function() {
    var data = [];

    // push some dummy data
    for(var i = 0; i < 30; i++) {
        data.push( { name: "item"+i } );
    }

    return {
        get: function(offset, limit) {
            return data.slice( offset, offset+limit );
        },
        count: function() {
            return data.length;
        }
    };
});
app.controller('CustomerListPaginationCtrl', ['$scope', '$log','myData', function($scope, $log,myData) {



}]);