"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),R_Logo=function(e){function t(e){_classCallCheck(this,t);var a=_possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this,e));return a.state={searchValue:""},a}return _inherits(t,e),_createClass(t,[{key:"changeValue",value:function(e){this.setState({searchValue:e.target.value})}},{key:"search",value:function(e){e.preventDefault(),console.log(this.state.searchValue),window.open("goods-list.html?search="+this.state.searchValue)}},{key:"render",value:function(){return React.createElement("div",{className:"bg-logo"},React.createElement("div",{className:"head-wrap"},React.createElement("div",{className:"city"},React.createElement("a",{title:"美眉分期",href:"index.html",style:{background:'url("../static/images/common/logo.png") no-repeat'},className:"logo"})),React.createElement("div",{className:"ym-search"},React.createElement("div",{className:"search-box"},React.createElement("form",{onSubmit:this.search.bind(this)},React.createElement("input",{id:"searchWd",style:{color:"black"},className:"search","data-type":"tao",onChange:this.changeValue.bind(this),value:this.state.searchValue,type:"text",placeholder:"轮廓锁的美 还能巨补水"}),React.createElement("input",{value:"搜索",type:"submit",id:"YMsearch",className:"search-btn"}))),React.createElement("ul",{className:"search-list"},React.createElement("li",{"data-type":""},React.createElement("a",{href:"http://so.yuemei.com/reviewsall//",target:"_blank"},React.createElement("span",null)))),React.createElement("div",{className:"hotItem clearfix"},React.createElement("a",{target:"_blank",href:"goods-list.html?search=玻尿酸"},"玻尿酸"),React.createElement("a",{target:"_blank",href:"goods-list.html?search=美白针"},"美白针"),React.createElement("a",{target:"_blank",href:"goods-list.html?search=双眼皮"},"双眼皮"),React.createElement("a",{target:"_blank",href:"goods-list.html?search=吸脂"},"吸脂"),React.createElement("a",{target:"_blank",href:"goods-list.html?search=水光针"},"水光针"),React.createElement("a",{target:"_blank",href:"goods-list.html?search=瘦脸针"},"瘦脸针"))),React.createElement("a",{className:"App",href:"my-bill.html",target:"_blank"},React.createElement("img",{src:"../static/images/money.png",style:{position:"absolute"}}),React.createElement("div",{style:{marginTop:"40px",marginLeft:"90px"},className:"money-tips"}))))}}]),t}(React.Component);