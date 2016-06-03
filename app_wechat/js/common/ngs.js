(function(J,f,C){'use strict';function D(t,e){e=e||{};f.forEach(e,function(f,k){delete e[k]});for(var k in t)!t.hasOwnProperty(k)||"$"===k.charAt(0)&&"$"===k.charAt(1)||(e[k]=t[k]);return e}var y=f.$$minErr("$resource"),B=/^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;f.module("ngResource",["ng"]).provider("$resource",function(){var t=/^https?:\/\/[^\/]*/,e=this;this.defaults={stripTrailingSlashes:!0,actions:{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},"delete":{method:"DELETE"}}};
    this.$get=["$http","$log","$q",function(k,F,G){function w(f,g){this.template=f;this.defaults=r({},e.defaults,g);this.urlParams={}}function z(l,g,s,h){function c(a,q){var c={};q=r({},g,q);u(q,function(b,q){x(b)&&(b=b());var m;if(b&&b.charAt&&"@"==b.charAt(0)){m=a;var d=b.substr(1);if(null==d||""===d||"hasOwnProperty"===d||!B.test("."+d))throw y("badmember",d);for(var d=d.split("."),n=0,g=d.length;n<g&&f.isDefined(m);n++){var e=d[n];m=null!==m?m[e]:C}}else m=b;c[q]=m});return c}function H(a){return a.resource}
        function d(a){D(a||{},this)}var t=new w(l,h);s=r({},e.defaults.actions,s);d.prototype.toJSON=function(){var a=r({},this);delete a.$promise;delete a.$resolved;return a};u(s,function(a,q){var g=/^(POST|PUT|PATCH)$/i.test(a.method);d[q]=function(b,A,m,e){var n={},h,l,s;switch(arguments.length){case 4:s=e,l=m;case 3:case 2:if(x(A)){if(x(b)){l=b;s=A;break}l=A;s=m}else{n=b;h=A;l=m;break}case 1:x(b)?l=b:g?h=b:n=b;break;case 0:break;default:throw y("badargs",arguments.length);}var w=this instanceof d,p=w?
            h:a.isArray?[]:new d(h),v={},z=a.interceptor&&a.interceptor.response||H,B=a.interceptor&&a.interceptor.responseError||C;u(a,function(a,b){switch(b){default:v[b]=I(a);break;case "params":case "isArray":case "interceptor":break;case "timeout":a&&!f.isNumber(a)&&F.debug("ngResource:\n  Only numeric values are allowed as `timeout`.\n  Promises are not supported in $resource, because the same value would be used for multiple requests.\n  If you need support for cancellable $resource actions, you should upgrade to version 1.5 or higher.")}});
            g&&(v.data=h);t.setUrlParams(v,r({},c(h,a.params||{}),n),a.url);n=k(v).then(function(b){var c=b.data,m=p.$promise;if(c){if(f.isArray(c)!==!!a.isArray)throw y("badcfg",q,a.isArray?"array":"object",f.isArray(c)?"array":"object",v.method,v.url);a.isArray?(p.length=0,u(c,function(b){"object"===typeof b?p.push(new d(b)):p.push(b)})):(D(c,p),p.$promise=m)}p.$resolved=!0;b.resource=p;return b},function(b){p.$resolved=!0;(s||E)(b);return G.reject(b)});n=n.then(function(b){var a=z(b);(l||E)(a,b.headers);return a},
                B);return w?n:(p.$promise=n,p.$resolved=!1,p)};d.prototype["$"+q]=function(b,a,c){x(b)&&(c=a,a=b,b={});b=d[q].call(this,b,this,a,c);return b.$promise||b}});d.bind=function(a){return z(l,r({},g,a),s)};return d}var E=f.noop,u=f.forEach,r=f.extend,I=f.copy,x=f.isFunction;w.prototype={setUrlParams:function(l,g,e){var h=this,c=e||h.template,k,d,r="",a=h.urlParams={};u(c.split(/\W/),function(d){if("hasOwnProperty"===d)throw y("badname");!/^\d+$/.test(d)&&d&&(new RegExp("(^|[^\\\\]):"+d+"(\\W|$)")).test(c)&&
    (a[d]=!0)});c=c.replace(/\\:/g,":");c=c.replace(t,function(a){r=a;return""});g=g||{};u(h.urlParams,function(a,e){k=g.hasOwnProperty(e)?g[e]:h.defaults[e];f.isDefined(k)&&null!==k?(d=encodeURIComponent(k).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"%20").replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+"),c=c.replace(new RegExp(":"+e+"(\\W|$)","g"),function(b,a){return d+a})):c=c.replace(new RegExp("(/?):"+e+"(\\W|$)","g"),function(b,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         a,c){return"/"==c.charAt(0)?c:a+c})});h.defaults.stripTrailingSlashes&&(c=c.replace(/\/+$/,"")||"/");c=c.replace(/\/\.(?=\w+($|\?))/,".");l.url=r+c.replace(/\/\\\./,"/.");u(g,function(a,c){h.urlParams[c]||(l.params=l.params||{},l.params[c]=a)})}};return z}]})})(window,window.angular);
//# sourceMappingURL=angular-resource.min.js.map
(function(q,d,C){'use strict';function w(s,k,h){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(a,f,b,c,y){function z(){l&&(h.cancel(l),l=null);m&&(m.$destroy(),m=null);n&&(l=h.leave(n),l.then(function(){l=null}),n=null)}function x(){var b=s.current&&s.current.locals;if(d.isDefined(b&&b.$template)){var b=a.$new(),c=s.current;n=y(b,function(b){h.enter(b,null,n||f).then(function(){!d.isDefined(u)||u&&!a.$eval(u)||k()});z()});m=c.scope=b;m.$emit("$viewContentLoaded");
    m.$eval(v)}else z()}var m,n,l,u=b.autoscroll,v=b.onload||"";a.$on("$routeChangeSuccess",x);x()}}}function A(d,k,h){return{restrict:"ECA",priority:-400,link:function(a,f){var b=h.current,c=b.locals;f.html(c.$template);var y=d(f.contents());b.controller&&(c.$scope=a,c=k(b.controller,c),b.controllerAs&&(a[b.controllerAs]=c),f.data("$ngControllerController",c),f.children().data("$ngControllerController",c));y(a)}}}q=d.module("ngRoute",["ng"]).provider("$route",function(){function s(a,f){return d.extend(Object.create(a),
    f)}function k(a,d){var b=d.caseInsensitiveMatch,c={originalPath:a,regexp:a},h=c.keys=[];a=a.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)(\*\?|[\?\*])?/g,function(a,d,b,c){a="?"===c||"*?"===c?"?":null;c="*"===c||"*?"===c?"*":null;h.push({name:b,optional:!!a});d=d||"";return""+(a?"":d)+"(?:"+(a?d:"")+(c&&"(.+?)"||"([^/]+)")+(a||"")+")"+(a||"")}).replace(/([\/$\*])/g,"\\$1");c.regexp=new RegExp("^"+a+"$",b?"i":"");return c}var h={};this.when=function(a,f){var b=d.copy(f);d.isUndefined(b.reloadOnSearch)&&
(b.reloadOnSearch=!0);d.isUndefined(b.caseInsensitiveMatch)&&(b.caseInsensitiveMatch=this.caseInsensitiveMatch);h[a]=d.extend(b,a&&k(a,b));if(a){var c="/"==a[a.length-1]?a.substr(0,a.length-1):a+"/";h[c]=d.extend({redirectTo:a},k(c,b))}return this};this.caseInsensitiveMatch=!1;this.otherwise=function(a){"string"===typeof a&&(a={redirectTo:a});this.when(null,a);return this};this.$get=["$rootScope","$location","$routeParams","$q","$injector","$templateRequest","$sce",function(a,f,b,c,k,q,x){function m(b){var e=
    t.current;(w=(p=l())&&e&&p.$$route===e.$$route&&d.equals(p.pathParams,e.pathParams)&&!p.reloadOnSearch&&!v)||!e&&!p||a.$broadcast("$routeChangeStart",p,e).defaultPrevented&&b&&b.preventDefault()}function n(){var g=t.current,e=p;if(w)g.params=e.params,d.copy(g.params,b),a.$broadcast("$routeUpdate",g);else if(e||g)v=!1,(t.current=e)&&e.redirectTo&&(d.isString(e.redirectTo)?f.path(u(e.redirectTo,e.params)).search(e.params).replace():f.url(e.redirectTo(e.pathParams,f.path(),f.search())).replace()),c.when(e).then(function(){if(e){var a=
    d.extend({},e.resolve),b,g;d.forEach(a,function(b,e){a[e]=d.isString(b)?k.get(b):k.invoke(b,null,null,e)});d.isDefined(b=e.template)?d.isFunction(b)&&(b=b(e.params)):d.isDefined(g=e.templateUrl)&&(d.isFunction(g)&&(g=g(e.params)),d.isDefined(g)&&(e.loadedTemplateUrl=x.valueOf(g),b=q(g)));d.isDefined(b)&&(a.$template=b);return c.all(a)}}).then(function(c){e==t.current&&(e&&(e.locals=c,d.copy(e.params,b)),a.$broadcast("$routeChangeSuccess",e,g))},function(b){e==t.current&&a.$broadcast("$routeChangeError",
    e,g,b)})}function l(){var a,b;d.forEach(h,function(c,h){var r;if(r=!b){var k=f.path();r=c.keys;var m={};if(c.regexp)if(k=c.regexp.exec(k)){for(var l=1,n=k.length;l<n;++l){var p=r[l-1],q=k[l];p&&q&&(m[p.name]=q)}r=m}else r=null;else r=null;r=a=r}r&&(b=s(c,{params:d.extend({},f.search(),a),pathParams:a}),b.$$route=c)});return b||h[null]&&s(h[null],{params:{},pathParams:{}})}function u(a,b){var c=[];d.forEach((a||"").split(":"),function(a,d){if(0===d)c.push(a);else{var g=a.match(/(\w+)(?:[?*])?(.*)/),
    f=g[1];c.push(b[f]);c.push(g[2]||"");delete b[f]}});return c.join("")}var v=!1,p,w,t={routes:h,reload:function(){v=!0;var b={defaultPrevented:!1,preventDefault:function(){this.defaultPrevented=!0;v=!1}};a.$evalAsync(function(){m(b);b.defaultPrevented||n()})},updateParams:function(a){if(this.current&&this.current.$$route)a=d.extend({},this.current.params,a),f.path(u(this.current.$$route.originalPath,a)),f.search(a);else throw B("norout");}};a.$on("$locationChangeStart",m);a.$on("$locationChangeSuccess",
    n);return t}]});var B=d.$$minErr("ngRoute");q.provider("$routeParams",function(){this.$get=function(){return{}}});q.directive("ngView",w);q.directive("ngView",A);w.$inject=["$route","$anchorScroll","$animate"];A.$inject=["$compile","$controller","$route"]})(window,window.angular);
//# sourceMappingURL=angular-route.min.js.map
!function(){"use strict";function a(a,c,d){b(a),this.register=d,this.init=function(b,e){var f=angular.isObject(e)?e:this.loaders[e]||this.loaders.seajs;a.$on("$routeChangeStart",function(e,g){var h=g&&g.$$route;h&&(!angular.isFunction(f.check)||f.check(h))&&(h.resolve=h.resolve||{},h.resolve.loadedModule=function(){var e=c.defer();return f.load(h,function(c){a.safeApply(function(){e.resolve(angular.isFunction(c)?c(b,d):c)})},function(b){a.safeApply(function(){e.reject(b)})}),e.promise})})}}function b(a){a.safeApply=function(a){var b=this.$root.$$phase;"$apply"==b||"$digest"==b?a&&"function"==typeof a&&a():this.$apply(a)}}angular.module("angular-lazyload",[],["$controllerProvider","$compileProvider","$filterProvider","$provide",function(b,c,d,e){e.factory("$lazyload",["$rootScope","$q",function(f,g){var h={controller:b.register,directive:c.directive,filter:d.register,factory:e.factory,service:e.service,decorator:e.decorator};return new a(f,g,h)}])}]),a.prototype.loaders={},a.prototype.loaders.seajs={check:function(a){return"string"==typeof a.controllerUrl},load:function(a,b,c){seajs.use(a.controllerUrl,function(a){angular.isUndefined(a)?c(a):b(a)})}},a.prototype.loaders.requirejs={check:function(a){return"string"==typeof a.controllerUrl},load:function(a,b,c){require(a.controllerUrl,function(a){angular.isUndefined(a)?c(a):b(a)})}}}(this);
/*! angular-lazyload - v0.4.0 - https://github.com/atian25/angular-lazyload - 2013-10-28 */
angular.module("me-lazyload",[]).directive("lazySrc",["$window","$document",function($window,$document){var doc=$document[0],body=doc.body,win=$window,$win=angular.element(win),uid=0,elements={};function getUid(el){var __uid=el.data("__uid");if(!__uid){el.data("__uid",(__uid=""+ ++uid))}return __uid}function getWindowOffset(){var t,pageXOffset=(typeof win.pageXOffset=="number")?win.pageXOffset:(((t=doc.documentElement)||(t=body.parentNode))&&typeof t.ScrollLeft=="number"?t:body).ScrollLeft,pageYOffset=(typeof win.pageYOffset=="number")?win.pageYOffset:(((t=doc.documentElement)||(t=body.parentNode))&&typeof t.ScrollTop=="number"?t:body).ScrollTop;return{offsetX:pageXOffset,offsetY:pageYOffset}}function isVisible(iElement){var elem=iElement[0],elemRect=elem.getBoundingClientRect(),windowOffset=getWindowOffset(),winOffsetX=windowOffset.offsetX,winOffsetY=windowOffset.offsetY,elemWidth=elemRect.width,elemHeight=elemRect.height,elemOffsetX=elemRect.left+winOffsetX,elemOffsetY=elemRect.top+winOffsetY,viewWidth=Math.max(doc.documentElement.clientWidth,win.innerWidth||0),viewHeight=Math.max(doc.documentElement.clientHeight,win.innerHeight||0),xVisible,yVisible;if(elemOffsetY<=winOffsetY){if(elemOffsetY+elemHeight>=winOffsetY){yVisible=true}}else{if(elemOffsetY>=winOffsetY){if(elemOffsetY<=winOffsetY+viewHeight){yVisible=true}}}if(elemOffsetX<=winOffsetX){if(elemOffsetX+elemWidth>=winOffsetX){xVisible=true}}else{if(elemOffsetX>=winOffsetX){if(elemOffsetX<=winOffsetX+viewWidth){xVisible=true}}}return xVisible&&yVisible}function checkImage(){Object.keys(elements).forEach(function(key){var obj=elements[key],iElement=obj.iElement,$scope=obj.$scope;if(isVisible(iElement)){iElement.attr("src",$scope.lazySrc)}})}$win.bind("scroll",checkImage);$win.bind("resize",checkImage);function onLoad(){var $el=angular.element(this),uid=getUid($el);$el.css("opacity",1);if(elements.hasOwnProperty(uid)){delete elements[uid]}}return{restrict:"A",scope:{lazySrc:"@",animateVisible:"@",animateSpeed:"@"},link:function($scope,iElement){iElement.bind("load",onLoad);$scope.$watch("lazySrc",function(){var speed="1s";if($scope.animateSpeed!=null){speed=$scope.animateSpeed}if(isVisible(iElement)){if($scope.animateVisible){iElement.css({"background-color":"#fff","opacity":0,"-webkit-transition":"opacity "+speed,"transition":"opacity "+speed})}iElement.attr("src",$scope.lazySrc)}else{var uid=getUid(iElement);iElement.css({"background-color":"#fff","opacity":0,"-webkit-transition":"opacity "+speed,"transition":"opacity "+speed});elements[uid]={iElement:iElement,$scope:$scope}}});$scope.$on("$destroy",function(){iElement.unbind("load");var uid=getUid(iElement);if(elements.hasOwnProperty(uid)){delete elements[uid]}})}}}]);
//angular-me-lazyload-for-img
(function(){angular.module("ui.angularSku",[]).value("skuConfig",{splitStr:";"}).factory("utilService",["$log","skuConfig",function($log,skuConfig){var key_account_Map={},keys=[];return{filter:function(a,predicate){var results=[];angular.forEach(a,function(value,index){if(predicate(value,index)){results.push(value)}});return results},getIndex:function(key){var index=-1;angular.forEach(keys,function(array,i0){if(index!==-1){return}angular.forEach(array,function(value,i1){if(key===value){index=i0}})});return index},unique:function(a){var res=[];var json={};for(var i=0;i<a.length;i++){if(!json[a[i]]){res.push(a[i]);json[a[i]]=1}}return res},getSkuList:function(obj){var array=[];if(!obj){$log.error("input sku-data error!")}angular.forEach(obj,function(value,key){array.push(key.split(skuConfig.splitStr))});return array},transpose:function(a){var w=a.length?a.length:0,h=a[0] instanceof Array?a[0].length:0;if(h===0||w===0){return[]}var i,j,t=[];for(i=0;i<h;i++){t[i]=[];for(j=0;j<w;j++){t[i][j]=a[j][i]}}return t},getKeys:function(obj){var list=this.getSkuList(obj),ta=this.transpose(list),r=[];for(var i=0;i<ta.length;i++){r[i]=this.unique(ta[i])}keys=r;return keys},getPrice:function(key,data){var result=0,i,j,m,items,n=[];if(angular.isDefined(key_account_Map[key])){return key_account_Map[key]}items=key.split(skuConfig.splitStr);if(items.length===keys.length){key_account_Map[key]=data[key]?data[key].presentPrice:null;return data[key]?data[key].presentPrice:null}for(i=0;i<keys.length;i++){for(j=0;j<keys[i].length&&items.length>0;j++){if(keys[i][j]==items[0]){break}}if(j<keys[i].length&&items.length>0){n.push(items.shift())}else{for(m=0;m<keys[i].length;m++){var newPrice=this.getPrice(n.concat(keys[i][m],items).join(skuConfig.splitStr),data);if(!!result&&result<newPrice){}else{result=newPrice?newPrice:result}}break}}key_account_Map[key]=result;return result},getStoreId:function(key,data){var result=0,i,j,m,items,n=[];items=key.split(skuConfig.splitStr);if(items.length===keys.length){return data[key]?data[key].storeGoodsCombinationId:null}else{return null}}}}]).directive("uiSku",["$log","skuConfig","utilService",function($log,skuConfig,utilService){return{restrict:"A",controller:["$scope","$element","$attrs",function($scope,$element,$attrs){this.checkIn=function(keys){$scope.initSelect(keys)}}],link:function(scope,element,attrs,ctrls,transclude){if(!!scope.splitStr){skuConfig.splitStr=scope.splitStr}scope.keyMap={};scope.selected=[];scope.skuData.$promise.then(function(response){scope.skuDataGet=response.data.goodsDetailsResponse.goodsCombinationExtMap;console.log(scope.skuDataGet);scope.keys=utilService.getKeys(scope.skuDataGet);angular.forEach(scope.keys,function(array,i0){angular.forEach(array,function(value,i1){scope.keyMap[value]={name:value,selected:!1,disabled:!1}})})});scope.onSelect=function(key){var keyMap=scope.keyMap,check=[];if(keyMap[key].disabled){return}scope.checkItem(key);check=utilService.filter(scope.selected,function(value,index){return angular.isDefined(value)});scope.onOk({price:utilService.getPrice(check.join(skuConfig.splitStr),scope.skuData),selectedNum:check.length,storeId:utilService.getStoreId(check.join(skuConfig.splitStr),scope.skuData)})};scope.checkItem=function(currentKey){var keyMap=scope.keyMap,copy=[],check=[],index=utilService.getIndex(currentKey);if(index===-1){$log.error("key is undefiend!");return}scope.selected[index]=(scope.selected[index]===currentKey)?void 0:currentKey;angular.forEach(scope.keys,function(array,i0){angular.copy(scope.selected,copy);angular.forEach(array,function(key,i1){if(i0===index){keyMap[key].selected=!!(currentKey===key)?!keyMap[key].selected:!1}if(i0===index||!!keyMap[key].selected){return}copy[i0]=key;check=utilService.filter(copy,function(value,index){return angular.isDefined(value)});keyMap[key].disabled=utilService.getPrice(check.join(skuConfig.splitStr),scope.skuData)>0?false:true})})};if(!!scope.initSku){scope.initSelect(scope.initSku)}}}}])})();
//angular-sku