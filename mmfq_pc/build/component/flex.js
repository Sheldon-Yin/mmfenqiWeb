"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),R_Flex=function(e){function t(e){_classCallCheck(this,t);var n=_possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this,e));return n.state={blockOrnone:n.props.blockOrnone},n}return _inherits(t,e),_createClass(t,[{key:"yescb",value:function(){this.props.config.yescb()}},{key:"nocb",value:function(){var e=!1;this.setState({blockOrnone:e}),this.props.config.nocb(e)}},{key:"render",value:function(){var e=this.props.config,t=e.img,n=e.issure,a=e.iscancle;return React.createElement("div",{className:"none",style:{display:1==this.props.blockOrnone?"block":"none"}},React.createElement("div",{className:"_z"}),React.createElement("div",{className:"layer_content"},React.createElement("div",{className:"header"},React.createElement("div",{className:"title"},"提示"),React.createElement("div",{className:"cance"},"x")),React.createElement("div",{className:"layer_content2"},React.createElement("div",null,React.createElement("img",{src:t,alt:""}))),React.createElement("div",{className:"foot"},React.createElement("div",{className:"btn cancle_btn",style:{display:a?"none":"inline-block"},onClick:this.nocb.bind(this)},"取消"),React.createElement("div",{className:"btn sure_btn",style:{display:n?"none":"inline-block"},onClick:this.yescb.bind(this)},"确定"))))}}]),t}(React.Component),toast=function(){function e(){_classCallCheck(this,e)}return _createClass(e,null,[{key:"toaster",value:function(e,t){t=isNaN(t)?3e3:t;var n=document.createElement("div");n.innerHTML=e,n.style.cssText="width:230px;opacity:1; height:35px; color:#fff; line-height:35px ; text-align:center; border-radius:2px; position:fixed; top:0; left:50%; z-index:9999999; filter: alpha(opacity=100); background: #fc8394;margin-left: -115px;",document.body.appendChild(n),setTimeout(function(){var e=.5;n.style.webkitTransition="-webkit-transform "+e+"s ease-in, opacity "+e+"s ease-in",n.style.mozTransition="-moz-transform "+e+"s ease-in, opacity "+e+"s ease-in",n.style.msTransition="-ms-transform "+e+"s ease-in, opacity "+e+"s ease-in",n.style.oTransition="-o-transform "+e+"s ease-in, opacity "+e+"s ease-in",n.style.transition="transform "+e+"s ease-in, opacity "+e+"s ease-in",n.style.opacity="0",setTimeout(function(){document.body.removeChild(n)},1e3*e)},t)}}]),e}();