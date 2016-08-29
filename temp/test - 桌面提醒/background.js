chrome.extension.getBackgroundPage().doThing();

// 从扩展页面调用通知的方法...
chrome.extension.getViews({type:"notification"}).forEach(function(win) {
	win.doOtherThing();
});

var notification = webkitNotifications.createNotification(
	'48.png',  // icon url - can be relative
	'Hello!',  // notification title
	'Lorem ipsum...'  // notification body text
);
notification.show();