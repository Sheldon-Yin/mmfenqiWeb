/**
 * Created by sheldon on 2016/4/22.
 */
"use strict";
/**
 * 11 12 13 14 15
 * 21 22 23 24 25
 * 31 32 33 34 56
 * 41 42 43 44 45
 * 51 52 53 54 55
 */
//var maps = [];
var log = console && console.log;

var util = {
    hasOwn: {}.hasOwnProperty,
    each: function(){
    },

    getPrime: function (num){
        var i, k, line;
        var arr = [];

        for(i = 2; i <= num; i++){
            arr.push(i);
        }

        for(i = 0; i < arr.length; i++){
            for(k = i + 1; k < arr.length; k++){
                if(arr[k]%arr[i] === 0){
                    arr.splice(k, 1);
                }
            }
        }

        return arr;
    },
    /**
     * @param {array} arrCd [4, 4, 5, 6, 3]
     * @param {array} opt_prime array
     * @return {array} array of condition
     */
    getMaps: function(arrCd, opt_primes){
        var i, j = 0, ret = [];
        opt_primes = opt_primes || this.getPrime(300);

        for (i = 0; i < arrCd.length; i++) {
            var n = 0;
            ret.push([]);
            while(n < arrCd[i]){
                ret[i].push(opt_primes[j]);
                j++;
                n++;
            }
        }

        return ret;
    },
    /**
     * support two level array clone
     */
    cloneTwo: function(o){
        var ret = [];
        for (var j = 0; j < o.length; j++) {
            var i = o[j];
            ret.push(i.slice ? i.slice() : i);
        }
        return ret;
    },

    /**
     * sort the array given, and push soem zore in is, that means you may do not
     * choose any item of an array. the number of zero rest with the max len and
     * the length of array. At the end, the return array's length equal to the
     * numble max
     * @param {array} arr  the arry to sort randum
     */
    sortRand: function(arr, max){
        var arrTmp = this.cloneTwo(arr);

        var i = max - arrTmp.length;
        while(i){
            arrTmp.push(0);
            i--;
        }

        function rsort(){
            return Math.random() - 0.5;
        }

        arrTmp.sort(rsort);
        //delete one item
        arrTmp.splice(Math.floor(max / 2), 1);
        arrTmp.push(0);
        arrTmp.sort(rsort);

        return arrTmp;
    }
};

/**
 * get the way can path throught
 * @param {array} points the points can select
 * @return {array} a list of opened way
 */
function openWay(points){
    var ret = [], i, col, line;
    var max = 7;

    for (var j = 0; j < 5; j++) {
        for (i = 0; i < points.length; i++) {
            col = points[i];
            line = util.sortRand(col, 7);
            for (var k = 0; k < max; k++) {
                var n = k + j * max;
                ret[n] = ret[n] || [];
                if (line[k]) ret[n].push(line[k]);
            }
        }
    }

    var r = [];
    for (i = 0; i < ret.length; i++) {
        line = ret[i];
        if (line.length > 2) r.push(line.slice());
    }

    return r;
}

function PathFinder(maps, openway){
    this.openway = openway || [];
    //map of primes
    this.maps = maps || [];

    this._way = {};
    //light of array, 0 mean not availabe, 1 mean availabe, map to the this.maps
    this.light = [];
    this.selected = [];
    //计数器
    this.count = 0;

    this.init();
}


PathFinder.prototype = {

    constructor: PathFinder,

    init: function(){
        this.light = util.cloneTwo(this.maps);
        var light = this.light;

        for (var i = 0; i < light.length; i++) {
            var l = light[i];
            for (var j = 0; j < l.length; j++) {
                this._way[l[j]] = [i, j];
                l[j] = 1;
            }
        }

        for (i = 0; i < this.openway.length; i++) {
            this.openway[i] = eval(this.openway[i].join('*'));
        }

        this._check();
    },

    _check: function(isAdd){
        var light = this.light;
        var maps  = this.maps;
        this.count = 0;

        for (var i = 0; i < light.length; i++) {

            var li = light[i];
            var selected = this._getSelected(i);

            for (var j = 0; j < li.length; j++) {
                if (li[j] !== 2){
                    //如果是加一个条件，只在是light值为1的点进行选择
                    if (isAdd){
                        if (li[j]){
                            light[i][j] = this._checkItem(maps[i][j], selected);
                            this.count++;
                        }
                    } else {
                        light[i][j] = this._checkItem(maps[i][j], selected);
                        this.count++;
                    }
                }
            }

        }

        return this.light;
    },

    _checkItem: function(item, selected){
        var openway = this.openway;
        var val = item * selected;
        for (var i = 0; i < openway.length; i++) {
            this.count++;
            if (openway[i] % val === 0){
                return 1;
            }
        }

        return 0;
    },

    _getSelected: function(xpath){
        var selected = this.selected;
        var _way = this._way;
        var x = 0;
        var ret = 1;

        if (selected.length){
            for (var j = 0; j < selected.length; j++) {
                var s = selected[j];
                //xpath表示同一行，当已经被选择的和当前检测的项目再同一行的时候
                //需要忽略。
                //必须选择了 [1, 2],检测的项目是[1, 3]，不可能存在[1, 2]和[1, 3]
                //的组合，他们在同一行
                if (_way[s][0] !== xpath) ret = ret * s;
            }
        }

        return ret;
    },

    /**
     * @param {array} point [x, y]
     */
    add: function(point){
        var val = this.maps[point[0]][point[1]];

        if (!this.light[point[0]][point[1]]){
            throw new Error('this point [' + point +
                '] is no availabe, place choose an other');
        }

        if (val in this.selected) return;

        this._dealChange(point, val);
        this.selected.push(val);
        this.light[point[0]][point[1]] = 2;
        this._check(true);
    },

    _dealChange: function(point, val){
        var selected = this.selected;
        var maps = this.maps;
        for (var i = 0; i < selected.length; i++) {
            var line = this._way[selected[i]];
            if (line[0] === point[0]){
                this.light[line[0]][line[1]] = 1;
                selected.splice(i, 1);
                break;
            }
        }
    },

    remove: function(point){
        try{
            var val = this.maps[point[0]][point[1]];
        }catch(e){}

        if (val){
            for (var i = 0; i < this.selected.length; i++) {
                if (this.selected[i] == val){
                    var line = this._way[this.selected[i]];
                    this.light[line[0]][line[1]] = 1;
                    this.selected.splice(i, 1);
                }
            }

            this._check();
        }
    },

    getWay: function(){
        var light = this.light;
        var way = util.cloneTwo(light);
        for (var i = 0; i < light.length; i++) {
            var line = light[i];
            for (var j = 0; j < line.length; j++) {
                if (line[j]) way[i][j] = this.maps[i][j];
            }
        }

        return way;
    }
};
//var maps = util.getMaps([5, 5, 5, 5, 5]);
var maps = [
    [ 2, 3, 5, 7, 11 ],
    [ 13, 17, 19, 23, 29 ],
    [ 31, 37, 41, 43, 47 ],
    [ 53, 59, 61, 67, 71 ],
    [ 73, 79, 83, 89, 97 ]
];
/*
 var ways = [
 [ 2, 19, 31, 53, 79 ],
 [ 5, 17, 47, 59, 83 ],
 [ 3, 37, 61, 73 ],
 [ 2, 47, 79 ],
 [ 17, 43, 53, 83 ],
 [ 29, 37, 59, 73 ],
 [ 7, 13, 61 ],
 [ 3, 23, 31, 89 ],
 [ 3, 67, 83 ],
 [ 11, 13, 37, 61 ],
 [ 2, 23, 41 ],
 [ 5, 43, 59, 89 ],
 [ 29, 47, 97 ],
 [ 31, 53, 73 ],
 [ 37, 53, 73 ],
 [ 41, 61, 83 ],
 [ 13, 31, 59 ],
 [ 7, 23, 43, 67, 97 ],
 [ 3, 17, 47, 71 ],
 [ 2, 29, 79 ],
 [ 3, 13, 47, 53, 73 ],
 [ 17, 41, 71, 79 ],
 [ 19, 37, 67, 89 ],
 [ 7, 23, 31, 59 ]
 ];
 */
var ways = [
    [ 31, 53, 73 ],
    [ 2, 53, 73 ],
    [ 37, 53, 73 ]
];
var a = new PathFinder(maps, ways);
log(a.getWay());
log(a.count);
a.add([0, 0]);
log(a.getWay());
a.remove([0, 0]);
log(a.count);
log(a.getWay());
a.add([2, 0]);
log(a.count);
log(a.getWay());
a.add([2, 1]);
log(a.count);
log(a.light);