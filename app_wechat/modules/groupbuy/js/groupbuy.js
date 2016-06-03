/**
 * Created by sheldon on 2016/3/18.
 */

function ShowCountDown(year, month, day, divname) {
    var now = new Date();
    var endDate = new Date(year, month - 1, day);
    var leftTime = endDate.getTime() - now.getTime();
    var leftsecond = parseInt(leftTime / 1000);

    if (leftsecond < 0 ){
        document.getElementById(divname).innerHTML = "活动已结束";
        return;
    }

    var leftTimeCount = function(leftRealSecond){
        var hour = Math.floor((leftRealSecond) / 3600);
        var minute = Math.floor((leftRealSecond - hour * 3600) / 60);
        var second = Math.floor(leftRealSecond - hour * 3600 - minute * 60);
        var cc = document.getElementById(divname);
        cc.innerHTML = "剩余时间：" + hour + ":" + minute + ":" + second;
    };

    var timer = window.setInterval(function () {
        leftTimeCount(leftsecond);
        leftsecond--;
        if (leftsecond < 0 ){
            window.clearInterval(timer);
            document.getElementById(divname).innerHTML = "活动已结束";
        }
    }, 1000);
}

//leftTime已经配置好，需要做的是填入活动结束的时间，年/月/日

function joinGroup() {
    toggleClass(document.getElementById("groupbuyShare"),"groupbuy-share");
}

function toggleClass(obj,cls){
    if(hasClass(obj,cls)){
        removeClass(obj, cls);
    }else{
        addClass(obj, cls);
    }
}

function addClass(obj, cls) {
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;
}

function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}

function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}