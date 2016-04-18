/**
 * Created by zhouriheng on 15/10/15.
 */
(function() {
		var docEl = document.documentElement;
		var clientWidth = docEl.clientWidth;
		if (!clientWidth)
			return;
		docEl.style.fontSize = 20 * (clientWidth / 640) + 'px';
})();

/**
 * 判断是否是IOS/Android接入
 * <script type="text/javascript">
 * var u = navigator.userAgent;
 * var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
 * var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
 * alert('是否是Android：'+isAndroid);
 * alert('是否是iOS：'+isiOS);
 * </script>
 */

function  non(){
    document.getElementById('shadow').className="non";
    document.getElementById('show').className="non";
}

function cancel(){
    $("#showIdentity").hide();
}

function showBox(){
	$("#showIdentity").show();
}