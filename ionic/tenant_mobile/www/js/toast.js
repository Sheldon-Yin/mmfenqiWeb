/**
 * Created by sheldon on 2016/3/28.
 */

"use strict";

function Toast(msg,duration){
    duration=isNaN(duration)?3000:duration;
    var m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText="width:20rem;opacity:0.5; height:40px; color:#fff; line-height:40px; " +
        "text-align:center; border-radius:1rem; position:fixed; bottom:5rem; left:50%; z-index:999999; " +
        "font-weight:bold; filter: alpha(opacity=80); background: #000;margin-left: -10rem;";
    document.body.appendChild(m);
    setTimeout(function() {
        var d = 0.5;
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        m.style.opacity = '0';
        setTimeout(function() { document.body.removeChild(m) }, d * 1000);
    }, duration);
}
