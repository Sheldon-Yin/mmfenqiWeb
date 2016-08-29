"use strict";var HotItems=React.createClass({displayName:"HotItems",styles:{header:{height:"40px",borderBottom:"1px solid #f3f3f3",lineHeight:"40px",paddingLeft:"12px",width:"100%"},item:{height:"54px",marginTop:"18px",paddingLeft:"11px",position:"relative"}},getDefaultProps:function(){return{items:[]}},render:function(){var e=this.props.items.map(function(e,t){return React.createElement("div",{style:this.styles.item,key:t},React.createElement("img",{src:"http://img2.imgtn.bdimg.com/it/u=3260548700,3238345600&fm=21&gp=0.jpg",height:"54",width:"54"}),React.createElement("div",{style:{position:"absolute",left:"70px",right:"0px",top:"0px",fontSize:"12px",height:"54px"}},React.createElement("div",{style:{maxHeight:"34px"}},"商品详情商品"),React.createElement("div",{style:{position:"absolute",left:"0px",right:"0px",bottom:"0px",fontSize:"14px",height:"14px",lineHeight:"14px"}},"$1222")))}.bind(this));return React.createElement("div",{style:{width:"100%"}},React.createElement("div",{style:this.styles.header},"销量排行"),e,React.createElement("div",{style:{height:"18px"}}))}}),DetailTabs=React.createClass({displayName:"DetailTabs",styles:{header:{height:"40px",borderBottom:"1px solid #FF6980",lineHeight:"40px",width:"100%",backgroundColor:"#fdfdfd"},link:{width:"130px",height:"40px",display:"inline-block",textAlign:"center",color:"black",textDecoration:"none"}},render:function(){return React.createElement("div",{style:{width:"100%"}},React.createElement("div",{style:this.styles.header},React.createElement("a",{href:"#ser-detail",style:this.styles.link},"服务详情"),React.createElement("span",{style:{color:"#e3e3e3"}},"|"),React.createElement("a",{href:"#hos-detail",style:this.styles.link},"医院位置/介绍")),React.createElement("div",{id:"ser-detail"},React.createElement("div",{style:{width:640}},this.props.goodsDetail)),React.createElement("div",{id:"hos-detail"},React.createElement("h4",{style:{paddingLeft:"20px"}},"医院位置/介绍"),React.createElement("div",{style:{marginTop:20,marginLeft:50}},React.createElement("iframe",{src:"/pcgoods/toBaiduMap/"+this.props.hospitalInfo.hosId,frameBorder:"0",height:"260px",width:"660px",scrolling:"no"})),React.createElement("div",{style:{marginTop:"10px",marginBottom:"10px",marginLeft:"20px",marginRight:"20px",height:"1px",backgroundColor:"#f3f3f3"}},this.props.hospitalInfo.introduction),React.createElement("div",{style:{height:"200px"}})))}}),DetailPreview=React.createClass({displayName:"DetailPreview",getDefaultProps:function(){return{images:[]}},getInitialState:function(){return{currentIndex:0,firstIndex:0,lastIndex:0}},firstIndex:-1,lastIndex:-1,saveCollect:function(e,t){HttpService.save({url:"/pc/computer/products_collection",data:{collectionId:e,collectionType:t},success:function(e){console.log(e)}})},onClickCt:function(){this.saveCollect(CommonService.getUrlParams("goodsId"),"1")},onChange:function(e){return function(){this.setState({currentIndex:e})}.bind(this)},onNext:function(){this.state.currentIndex+1<this.props.images.length&&this.setState({currentIndex:this.state.currentIndex+1})},onPre:function(){this.state.currentIndex-1>=0&&this.setState({currentIndex:this.state.currentIndex-1})},render:function(){this.firstIndex==-1&&this.lastIndex==-1&&(this.firstIndex=0,this.lastIndex=3,this.lastIndex>this.props.images.length-1&&(this.lastIndex=this.props.images.length-1)),this.state.currentIndex>this.lastIndex&&(this.firstIndex+=1,this.lastIndex+=1),this.state.currentIndex<this.firstIndex&&(this.firstIndex-=1,this.lastIndex-=1);for(var e=[],t=this.firstIndex;t<=this.lastIndex;t++)e.push(t);var i=e.map(function(e){var t={cursor:"pointer",width:"24%",lineHeight:"68px",textAlign:"center",height:"70px",float:"left",border:"1px solid transparent"};return e==this.state.currentIndex&&(t={cursor:"pointer",width:"24%",lineHeight:"68px",textAlign:"center",height:"70px",float:"left",border:"1px solid #f3f3f3"}),React.createElement("div",{onClick:this.onChange(e),key:this.props.images[e]+" "+e,style:t},React.createElement("img",{src:this.props.images[e],style:{maxWidth:"100%",maxHeight:"68px"}}))}.bind(this));return React.createElement("div",{style:{float:"left",width:"482px"}},React.createElement("div",{style:{lineHeight:"277px",width:"438px",height:"277px",margin:"0 auto",textAlign:"center",backgroundColor:"#f3f3f3"}},React.createElement("img",{src:this.props.images[this.state.currentIndex],style:{maxWidth:"100%",maxHeight:"100%"}})),React.createElement("div",{style:{position:"relative",width:"438px",height:"70px",margin:"0 auto",marginTop:"25px",backgroundColor:"white"}},React.createElement("div",{onClick:this.onPre,style:{cursor:"pointer",left:"0px",top:"0px",position:"absolute",height:"70px",width:"18px",lineHeight:"70px",textAlign:"center"}},React.createElement("img",{src:"../static/images/common/left.png",style:{maxWidth:"100%",maxHeight:"100%",marginTop:20}})),React.createElement("div",{style:{position:"absolute",left:"20px",right:"20px",height:"70px",top:"0px"}},i),React.createElement("div",{onClick:this.onNext,style:{cursor:"pointer",right:"0px",top:"0px",position:"absolute",height:"70px",width:"18px",lineHeight:"70px",textAlign:"center"}},React.createElement("img",{src:"../static/images/common/right.png",style:{maxWidth:"100%",maxHeight:"100%",marginTop:20}}))),React.createElement("div",{style:{width:"438px",height:"1px",margin:"0 auto",marginTop:"25px",backgroundColor:"#f3f3f3"}}),React.createElement("div",{style:{width:"438px",margin:"0 22px",padding:"14px 0"}},React.createElement("span",null,React.createElement("img",{src:"../static/images/goods-detail/true.png",alt:"",style:{verticalAlign:"middle"}})),React.createElement("span",{style:{verticalAlign:"middle",color:"#999",margin:"0 10px",fontSize:16}},this.props.hospital),React.createElement("span",{style:{verticalAlign:"middle",color:"#e6e6e6"}},"|"),React.createElement("span",{onClick:this.onClickCt},React.createElement("img",{src:"../static/images/goods-detail/collect.png",alt:"",style:{verticalAlign:"middle",margin:"0 10px",cursor:"pointer"}})),React.createElement("span",{onClick:this.onClickCt,style:{verticalAlign:"middle",color:"#999",cursor:"pointer"}},"收藏")))}}),Selector=React.createClass({displayName:"Selector",getDefaultProps:function(){return{items:[]}},getInitialState:function(){return{currentIndex:this.props.currentIndex?this.props.currentIndex:0}},componentDidUpdate:function(){this.flag||this.props.callbackSetValue&&(this.props.callbackSetValue(this.state.currentIndex),this.flag=!0)},componentWillMount:function(){this.flag=!1},styles:{span:{cursor:"pointer",display:"inline-block",backgroundColor:"white",padding:"8px",border:"1px solid #f3f3f3",marginLeft:"12px",marginTop:"8px"},spanSelect:{cursor:"pointer",display:"inline-block",backgroundColor:"#FF6980",padding:"8px",border:"1px solid #f3f3f3",marginLeft:"12px",marginTop:"8px",color:"white"}},onChange:function(e){return function(){this.setState({currentIndex:e}),this.flag=!1}.bind(this)},render:function(){var e=this.props.items.map(function(e,t){var i=this.state.currentIndex==t?this.styles.spanSelect:this.styles.span;return React.createElement("span",{key:e+" "+t,style:i,onClick:this.onChange(t)},e)}.bind(this));return React.createElement("div",{style:{display:"inline"}},e)}}),NumberSelector=React.createClass({displayName:"NumberSelector",getInitialState:function(){return{number:1,currentItem:""}},styles:{operations:{display:"inline-block",lineHeight:"35px",height:"35px",width:"35px",border:"1px solid #f3f3f3",textAlign:"center",cursor:"pointer"},number:{display:"inline-block",lineHeight:"35px",height:"35px",minWidth:"55px",border:"1px solid #f3f3f3",textAlign:"center"}},onAdd:function(e){return function(){var t=this.state.number+e;t<1&&(t=1),this.setState({number:t}),this.props.callbackParent&&this.props.callbackParent(t)}.bind(this)},render:function(){return React.createElement("div",{style:{display:"inline",marginLeft:"12px"}},React.createElement("span",{style:this.styles.operations,onClick:this.onAdd(-1)},"-"),React.createElement("span",{style:this.styles.number},this.state.number),React.createElement("span",{style:this.styles.operations,onClick:this.onAdd(1)},"+"))}}),ComboBox=React.createClass({displayName:"ComboBox",getInitialState:function(){return{currentIndex:this.props.currentIndex?this.props.currentIndex:0,show:!1}},getDefaultProps:function(){return{items:[]}},componentDidUpdate:function(){this.flag||this.props.callbackSetValue&&(this.props.callbackSetValue(this.state.currentIndex),this.flag=!0)},componentWillMount:function(){this.flag=!1},styles:{li:{cursor:"pointer",height:"35px",lineHeight:"35px",borderBottom:"1px solid #f3f3f3",paddingLeft:"8px"},ulHidden:{listStyle:"none",position:"absolute",border:"1px solid #f3f3f3",backgroundColor:"white",right:"0px",paddingLeft:"0px",left:"0px",zIndex:"1000",display:"none"},ulShow:{listStyle:"none",position:"absolute",border:"1px solid #f3f3f3",backgroundColor:"white",right:"0px",paddingLeft:"0px",left:"0px",zIndex:"1000"}},onToggle:function(){this.setState({show:!this.state.show})},onChange:function(e){return function(){this.setState({currentIndex:e,show:!1}),this.flag=!1}.bind(this)},render:function(){var e=this.state.show?this.styles.ulShow:this.styles.ulHidden,t=this.props.items.map(function(e,t){return React.createElement("li",{key:t,style:this.styles.li,onClick:this.onChange(t)},e)}.bind(this));return React.createElement("div",{style:{float:"left",height:"40px",position:"relative"}},React.createElement("div",{onClick:this.onToggle,style:{cursor:"pointer",border:"1px solid #f3f3f3",padding:"8px",backgroundColor:"white"}},React.createElement("span",null,this.props.items[this.state.currentIndex]),React.createElement("span",null,"  ▼")),React.createElement("ul",{style:e},t))}}),DetailHelp=React.createClass({displayName:"DetailHelp",jumpMyCredit:function(){window.location.href="my-credit.html"},render:function(){return React.createElement("div",{style:{float:"left",width:"220px"}},React.createElement("div",{style:{width:"145px",margin:"0 auto"}},React.createElement("img",{src:"../static/images/goods/tips.png",width:"100%",style:{maxHeight:"150px"}}),React.createElement("input",{type:"button",value:"立即提额",onClick:this.jumpMyCredit,style:{backgroundColor:"#FF6980",borderWidth:"0px",color:"white",height:"35px",display:"block",width:"125px",margin:"0 auto",marginTop:"25px"}}),React.createElement("div",{style:{height:"1px",backgroundColor:"#f3f3f3",width:"125px",margin:"0 auto",marginTop:"35px",marginBottom:"35px"}}),React.createElement("img",{src:"../static/images/goods/tips2.png",width:"100%",style:{maxHeight:"150px"}}),React.createElement("div",{style:{height:"1px",backgroundColor:"#f3f3f3",width:"125px",margin:"0 auto",marginTop:"35px",marginBottom:"35px"}}),React.createElement("input",{type:"button",value:"联系客服",style:{backgroundColor:"white",borderWidth:"0px",color:"#FF6980",height:"35px",display:"block",width:"125px",margin:"0 auto",marginTop:"25px",border:"1px solid #FF6980"}}),React.createElement("div",{style:{height:"25px"}}),React.createElement("div",{style:{fontSize:"12px",color:"#737373",textAlign:"center"}},"客服电话:400-711-8898"),React.createElement("div",{style:{fontSize:"12px",color:"#737373",textAlign:"center"}},"工作日:9:00-21:00"),React.createElement("div",{style:{fontSize:"12px",color:"#737373",textAlign:"center"}},"工作日:10:00-17:00")))}}),ReactSku=React.createClass({displayName:"ReactSku",getDefaultProps:function(){return{types:[],items:[]}},getInitialState:function(){return{keyMap:[],selected:[],keys:[]}},componentWillMount:function(){this.key_account_Map=[]},initKeyMap:function(e){var t={},i=this.getKeys(e);return i.forEach(function(e,i){e.forEach(function(e,i){t[e]={name:e,selected:!1,disabled:!1}})}),t},filter:function(e,t){var i=[];return e.forEach(function(e,n){t(e,n)&&i.push(e)}),i},getIndex:function(e){var t=-1;return this.keys.forEach(function(i,n){t===-1&&i.forEach(function(i,s){e===i&&(t=n)})}),t},unique:function(e){for(var t=[],i={},n=0;n<e.length;n++)i[e[n]]||(t.push(e[n]),i[e[n]]=1);return t},getSkuList:function(e){var t=[],i="";if(e||$log.error("input sku-data error!"),e.forEach)e.forEach(function(e,i){t.push(i.split("#"))});else for(i in e)t.push(i.split("#"));return t},transpose:function(e){var t=e.length?e.length:0,i=e[0]instanceof Array?e[0].length:0;if(0===i||0===t)return[];var n,s,a=[];for(n=0;n<i;n++)for(a[n]=[],s=0;s<t;s++)a[n][s]=e[s][n];return a},getKeys:function(e){for(var t=this.getSkuList(e),i=this.transpose(t),n=[],s=0;s<i.length;s++)n[s]=this.unique(i[s]);return this.keys=n,this.keys},getPrice:function(e,t){var i,n,s,a,o=0,r=[];if(this.key_account_Map[e])return this.key_account_Map[e];if(a=e.split("#"),a.length===this.keys.length)return this.key_account_Map[e]=t[e]?t[e].presentPrice:null,t[e]?t[e].presentPrice:null;for(i=0;i<this.keys.length;i++){for(n=0;n<this.keys[i].length&&a.length>0&&this.keys[i][n]!=a[0];n++);if(!(n<this.keys[i].length&&a.length>0)){for(s=0;s<this.keys[i].length;s++){var l=this.getPrice(r.concat(this.keys[i][s],a).join("#"),t);o&&o<l||(o=l?l:o)}break}r.push(a.shift())}return this.key_account_Map[e]=o,o},getStoreId:function(e,t){var i;return i=e.split("#"),i.length===this.keys.length&&t[e]?t[e].storeGoodsCombinationId:null},styles:{span:{cursor:"pointer",display:"inline-block",backgroundColor:"white",padding:"8px",border:"1px solid #f3f3f3",marginLeft:"12px",marginTop:"8px"},spanSelect:{cursor:"pointer",display:"inline-block",backgroundColor:"#FF6980",padding:"8px",border:"1px solid #f3f3f3",marginLeft:"12px",marginTop:"8px",color:"white"},spanDisabled:{cursor:"pointer",display:"inline-block",backgroundColor:"#999",padding:"8px",border:"1px solid #f3f3f3",marginLeft:"12px",marginTop:"8px",color:"white"}},onChange:function(e){return function(){this.setState({currentIndex:e}),this.props.callbackParent&&this.props.callbackParent(e)}.bind(this)},onSelect:function(e){var t=0;for(var i in this.state.keyMap)t++;var n=[];if(0==t){var i=0;for(var s in this.props.items)i++;return void(1!=this.count&&0!=i&&(this.setState({keyMap:this.initKeyMap(this.props.items)}),this.count=1))}e&&(this.state.keyMap[e.target.innerHTML].disabled||(this.checkItem(e.target.innerHTML),n=this.filter(this.state.selected,function(e,t){return e}),this.props.cxt.getGoodsInfo(this.getStoreId(n.join("#"),this.props.items),this.getPrice(n.join("#"),this.props.items))))},checkItem:function(e){var t=this,i=this.state.keyMap,n=[],s=this.getIndex(e),a=this.state.selected;return s===-1?void $log.error("key is undefiend!"):(a[s]=this.state.selected[s]===e?void 0:e,this.keys.forEach(function(o,r){var l=$.extend(!0,[],a);o.forEach(function(a,o){r===s&&(i[a].selected=e===a&&!i[a].selected),r===s||i[a].selected||(l[r]=a,n=t.filter(l,function(e,t){return!!e}),i[a].disabled=t.getPrice(n.join("#"),t.props.items)<=0)})}),void this.setState({keyMap:i,selected:a}))},render:function(){var e=this,t=0;for(var i in this.props.items)t++;1!=this.count&&0!=t&&setTimeout(function(){e.onSelect()},0);var n=this.props.types.map(function(e,t){var i=this,n=e.combinationDefinitionInfoList.map(function(e,t){var n=i.styles.span;if(i.state.keyMap[e.combinationName]){var n=1==i.state.keyMap[e.combinationName].selected?i.styles.spanSelect:i.styles.span;i.state.keyMap[e.combinationName].disabled&&(n=i.styles.spanDisabled)}return React.createElement("span",{key:e+" "+t,style:n,onClick:i.onSelect},e.combinationName)});return React.createElement("div",{key:e+" "+t},React.createElement("span",{style:{marginLeft:12}},e.combinationTypeName),n)}.bind(this));return React.createElement("div",{style:{display:"inline"}},n)}}),DetailOrder=React.createClass({displayName:"DetailOrder",styles:{detail:{border:"1px solid #f3f3f3",paddingTop:"16px",paddingBottom:"16px"},container:{position:"relative",width:"1200px",margin:"0 auto"},row:{width:"100%"},leftPanel:{border:"1px solid #f3f3f3",left:"0px",width:"1000px",minHeight:"40px"},rightPanel:{border:"1px solid #f3f3f3",width:"185px",minHeight:"40px",position:"absolute",right:"0px",top:"0px"}},getInitialState:function(){return{kinds:[],mounts:[],insurance:[],percent:[],goodsInfo:{},goodsTypes:[],goodsItems:[],goodsTeam:{},isInsuranceBuy:!0,selectedFirstPayNo:0,selectedStagingNo:0,hospital:[],json:[],t_startTime:"",t_endTime:"",text:"",h:"",m:"",s:"",leftOrRight:"0"}},getGoodsInfo:function(e,t){var i=this;e?this.setState({storeGoodsCombinationId:e,orderPrice:t}):this.setState({storeGoodsCombinationId:null,orderPrice:null});var n=this.getQueryString("goodsId");$.ajax({type:"post",url:"/pc/computer/query_goods_staging_order",data:{goodsId:n,storeGoodsCombinationId:e},dataType:"json",success:function(e){console.log(e),0==e.result&&(i.goodsInfo=e.data,i.setState({mounts:e.data.goodsStagingInfoResponse.fenqiConfigList,insurance:e.data.goodsStagingInfoResponse.insuranceAmountList,percent:e.data.goodsStagingInfoResponse.fenqiShowfuInfoList,hospitalInfo:e.data.goodsStagingInfoResponse.hospital,goodsInfo:e.data.goodsStagingInfoResponse.goodsDetailsInfo,goodsTypes:e.data.combinationTypeInfoList,goodsItems:e.data.goodsCombinationExtMap,goodsDetail:e.data.goodsStagingInfoResponse.goodsDetailsInfo.goodsDetailUrlList,goodsTeam:e.data.goodsTeam,hospital:e.data.goodsStagingInfoResponse.hospital.hosName}))}})},componentWillMount:function(){this.getGoodsInfo(),Date.prototype.Format=function(e){var t={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var i in t)new RegExp("("+i+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?t[i]:("00"+t[i]).substr((""+t[i]).length)));return e};var e,t,i=new Date;console.log(i);var n=Date.parse(new Date),n=n/1e3;console.log("当前时间戳为："+n-123),e=i.Format("yyyy-MM-dd 00:00:00"),t=i.Format("yyyy-MM-dd 23:59:59"),this.setState({t_startTime:e,t_endTime:t}),this.today_fast(e,t),this.compareTime()},getQueryString:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),i=window.location.search.substr(1).match(t);return null!=i?unescape(i[2]):null},percentChanged:function(e){console.log(e)},mountsChanged:function(e){console.log(e)},numberChanged:function(e){console.log(e)},setInsurance:function(e){this.goodsInfo&&(e>0?(console.log("选择了"+this.goodsInfo.goodsStagingInfoResponse.insuranceAmountList[e-1].price+"元保险"),this.setState({selectedInsurance:this.goodsInfo.goodsStagingInfoResponse.insuranceAmountList[e-1].price,isInsuranceBuy:!0})):0==e&&(console.log("不买保险"),this.setState({isInsuranceBuy:!1})))},setFirstPayRatio:function(e){this.goodsInfo&&(console.log("选择了"+this.goodsInfo.goodsStagingInfoResponse.fenqiShowfuInfoList[e].ratio+"比例的首付，id为"+this.goodsInfo.goodsStagingInfoResponse.fenqiShowfuInfoList[e].shoufuId),this.setState({selectedFirstPay:this.goodsInfo.goodsStagingInfoResponse.fenqiShowfuInfoList[e].shoufuId,selectedFirstPayValue:this.goodsInfo.goodsStagingInfoResponse.fenqiShowfuInfoList[e].ratio,selectedFirstPayNo:e}))},setStaging:function(e){this.goodsInfo&&(console.log("选择了分"+this.goodsInfo.goodsStagingInfoResponse.fenqiConfigList[e].staging+"期，id为"+this.goodsInfo.goodsStagingInfoResponse.fenqiConfigList[e].configId),this.setState({selectedStaging:this.goodsInfo.goodsStagingInfoResponse.fenqiConfigList[e].configId,selectedStagingValue:this.goodsInfo.goodsStagingInfoResponse.fenqiConfigList[e].staging,selectedStagingNo:e}))},createOrder:function(){if(this.goodsInfo){var e={};if(0!=this.goodsInfo.combinationList.length){if(!this.state.storeGoodsCombinationId)return void alert("请先选择完整的商品属性");e={goodsId:this.getQueryString("goodsId"),orderName:this.goodsInfo.goodsStagingInfoResponse.goodsDetailsInfo.storeGoods.goodsName,isInsuranceBuy:this.state.isInsuranceBuy,insuranceAmount:this.state.selectedInsurance,configId:this.state.selectedStaging,shoufuId:this.state.selectedFirstPay,staging:this.state.selectedStagingValue,shoufuMoney:this.state.selectedFirstPayValue,goodsNumber:1,fenqiObj:this.getFenqiObj(),storeGoodsCombinationId:this.state.storeGoodsCombinationId,orderAmount:this.state.orderPrice,orderPrice:this.state.orderPrice}}else e={goodsId:this.getQueryString("goodsId"),orderName:this.goodsInfo.goodsStagingInfoResponse.goodsDetailsInfo.storeGoods.goodsName,isInsuranceBuy:this.state.isInsuranceBuy,insuranceAmount:this.state.selectedInsurance,configId:this.state.selectedStaging,shoufuId:this.state.selectedFirstPay,staging:this.state.selectedStagingValue,fenqiObj:this.getFenqiObj(),shoufuMoney:this.state.selectedFirstPayValue,orderPrice:this.state.orderPrice,goodsNumber:1,orderAmount:this.goodsInfo.goodsStagingInfoResponse.goodsDetailsInfo.storeGoods.shopPrice};window.localStorage.orderData=JSON.stringify(e),window.location.href="order-ensure.html"}},getFenqiObj:function(){var e=null;if(this.goodsInfo){var t=this;this.goodsInfo.goodsStagingInfoResponse.fenqiObj.forEach(function(i){i.paymentId==t.state.selectedStagingValue&&i.shoufuId==t.state.selectedFirstPayValue&&(e=i)})}return e},today_fast:function(e,t){this.setState({leftOrRight:"0"})},more:function(){({index:"2",startTime:this.state.t_startTime,endTime:this.state.t_endTime})},init:function(e){var t={timer:null,init:function(e){var t=this;this.setShowTime(e.endtime,e.done),this.timer=setInterval(function(){t.setShowTime(e.endtime,e.done,e.callback)},1e3),console.log(this.timer)},getCountdown:function(e){var t=this.getSecond(e)-this.getSecond();if(t<0)return[0,"00","00","00"];var i=parseInt(t%60),n=parseInt(t/3600/24),s=parseInt(t/3600)-24*n,a=parseInt((t-3600*parseInt(t/3600))/60);return s=s>9?s:"0"+s,i=i>9?i:"0"+i,a=a>9?a:"0"+a,[n,s,a,i]},getSecond:function(e){if(e){var t=parseInt(e.slice(0,4)),i=parseInt(e.match(/-\d*/gi)[0].replace("-","")-1),n=parseInt(e.match(/-\d*/gi)[1].replace("-","")),s=parseInt(e.match(/\d*:/)[0].replace(":","")),a=parseInt(e.match(/:\d*/)[0].replace(":",""));return new Date(t,i,n,s,a,0).getTime()/1e3}return(new Date).getTime()/1e3},setShowTime:function(e,t,i){var n=this,s=this.getCountdown(e)[0],a=this.getCountdown(e)[1],o=this.getCountdown(e)[2],r=this.getCountdown(e)[3];t([s,a,o,r]),0==s&&"00"==a&&"00"==o&&"00"==r&&(clearInterval(n.timer),n.timer=null,i&&i())}};t.init({endtime:e,done:function(e){this.setState({h:e[1],m:e[2],s:e[3]})}.bind(this),callback:function(){}})},compareTime:function e(){var e=new Date;if(e.getHours()>=10){var t=e.Format("yyyy-MM-dd 23:59:59");return this.init(t),void this.setState({text:"距离结束仅剩"})}var i=e.Format("yyyy-MM-dd 10:00:00");this.init(i),this.setState({text:"距离开始仅剩"})},tm_fast:function(){this.setState({leftOrRight:"1"});var e,t,i,n=new Date;i=n.setDate(n.getDate()+1),e=this.timeStamp2String(i),t=this.timeStamp3String(i)},timeStamp2String:function(e){var t=new Date;t.setTime(e);var i=t.getFullYear(),n=t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1,s=t.getDate()<10?"0"+t.getDate():t.getDate(),a="00",o="00",r="00";return i+"-"+n+"-"+s+" "+a+":"+o+":"+r},timeStamp3String:function(e){var t=new Date;t.setTime(e);var i=t.getFullYear(),n=t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1,s=t.getDate()<10?"0"+t.getDate():t.getDate(),a="23",o="59",r="59";return i+"-"+n+"-"+s+" "+a+":"+o+":"+r},timeStamp4String:function(e){var t=new Date;t.setTime(e);var i=t.getFullYear(),n=t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1,s=t.getDate()<10?"0"+t.getDate():t.getDate(),a=t.getHours()<10?"0"+t.getHours():t.getHours(),o=t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes(),r=t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds();return i+"-"+n+"-"+s+" "+a+":"+o+":"+r},render:function(){var e=this.getFenqiObj(),t=[],i=["不购买"],n=[],s="",a="";if(this.state.hospitalInfo&&(a=this.state.hospitalInfo),this.state.goodsDetail&&(s=this.state.goodsDetail.map(function(e,t){return React.createElement("img",{src:e,key:t,style:{width:"100%"}})})),this.state.insurance.forEach(function(e){i.push(e.price)}),this.state.mounts.forEach(function(e){t.push(e.staging)}),this.state.percent.forEach(function(e){n.push(e.ratio)}),this.state.goodsInfo.coverPic)var o=this.state.goodsInfo.coverPic;var r=10;return setInterval(function(){r--},1e3),React.createElement("div",null,o?React.createElement(DetailPreview,{images:o,hospital:this.state.hospital}):"",React.createElement("div",{style:{float:"left",width:"495px"}},React.createElement("span",{style:{color:"black",fontSize:"18px"}},this.state.goodsInfo.storeGoods?this.state.goodsInfo.storeGoods.goodsName:""),React.createElement("div",{style:{height:"16px"}}),React.createElement("div",{style:{color:"#646464"}},this.state.goodsTeam?React.createElement("div",{style:{height:40,backgroundColor:"#FD657A",color:"#fff",lineHeight:"40px"}},React.createElement("span",{style:{paddingLeft:"12px",lineHeight:"40px"}},"限时抢购"),React.createElement("span",null,"    "),React.createElement("span",{style:{color:"#FFF",fontSize:"30px",lineHeight:"40px"}},"￥",this.state.goodsInfo.storeGoods?this.state.orderPrice?this.state.orderPrice:this.state.goodsInfo.storeGoods.shopPrice:""),React.createElement("span",null,"    "),React.createElement("span",{style:{paddingRight:10}},this.state.text),React.createElement("span",{style:{display:"inline-block",height:"22px",padding:"3px",borderRadius:"3px",backgroundColor:"#fff",color:"#FD657A",fontSize:"18px",lineHeight:"27px"}},this.state.h),React.createElement("span",{style:{padding:5}},":"),React.createElement("span",{style:{display:"inline-block",height:"22px",padding:"3px",borderRadius:"3px",backgroundColor:"#fff",color:"#FD657A",fontSize:"18px",lineHeight:"27px"}},this.state.m),React.createElement("span",{style:{padding:5}},":"),React.createElement("span",{style:{display:"inline-block",height:"22px",padding:"3px",borderRadius:"3px",backgroundColor:"#fff",color:"#FD657A",fontSize:"18px",lineHeight:"27px"}},this.state.s),React.createElement("span",{style:{fontSize:20,padding:10}},"|"),React.createElement("span",{style:{paddingLeft:10}},"已购买:",this.state.goodsTeam.alreadyBuyProple)):React.createElement("div",null,React.createElement("span",{style:{paddingLeft:"12px"}},"商品价格"),React.createElement("span",null,"    "),React.createElement("span",{style:{color:"#FF6980",fontSize:"30px"}},"￥",this.state.goodsInfo.storeGoods?this.state.orderPrice?this.state.orderPrice:this.state.goodsInfo.storeGoods.shopPrice:""),React.createElement("span",null,"    "),React.createElement("span",{style:{textDecoration:"line-through"}},"￥",this.state.goodsInfo.storeGoods?this.state.goodsInfo.storeGoods.marketPrice:""),React.createElement("div",{style:{border:"1px dashed #FF6980",marginLeft:"12px"}})),React.createElement("div",{style:{height:"8px"}}),React.createElement("div",null,React.createElement("span",{style:{paddingLeft:"12px",fontWeight:"bold",fontSize:"18px"}},"选择规格"),React.createElement(ReactSku,{cxt:this,types:this.state.goodsTypes?this.state.goodsTypes:[],items:this.state.goodsItems})),React.createElement("div",{style:{height:"8px"}}),React.createElement("div",null,React.createElement("div",{style:{paddingLeft:"12px",float:"left",marginRight:"12px",height:"40px",lineHeight:"50px"}},"选择保险(元)"),React.createElement(Selector,{cxt:this,callbackSetValue:this.setInsurance,items:i,currentIndex:"1"}),React.createElement("a",{href:"../static/pdf/insuranceIntroduction.pdf",target:"_blank"},React.createElement("img",{src:"../static/images/goods-detail/question.png",style:{marginLeft:10}})),React.createElement("div",{style:{clear:"both"}})),React.createElement("div",{style:{height:"8px"}}),React.createElement("div",{style:{backgroundColor:"rgb(253, 251, 253)"}},React.createElement("div",{style:{fontSize:"18px",padding:"12px",fontWeight:"bold"}},React.createElement("span",null,"分期选择")),React.createElement("div",null,React.createElement("div",{style:{paddingLeft:"12px",float:"left",marginRight:"12px",height:"40px",lineHeight:"40px"}},"首付比例"),React.createElement(ComboBox,{callbackSetValue:this.setFirstPayRatio,cxt:this,items:n,callbackParent:this.percentChanged}),React.createElement("div",{style:{clear:"both"}})),React.createElement("div",null,React.createElement("span",{style:{paddingLeft:"12px"}},"选择分期数(月)"),React.createElement(Selector,{callbackSetValue:this.setStaging,cxt:this,items:t})),React.createElement("div",{style:{height:"8px"}}),this.state.firstPay?React.createElement("div",null,React.createElement("div",{style:{float:"left",width:"50%"}},React.createElement("span",{style:{paddingLeft:"12px",paddingRight:"12px"}},"首付金额"),React.createElement("span",{style:{color:"#FF6980",fontSize:"18px"}},"￥",this.state.firstPay)),React.createElement("div",{style:{float:"right",width:"50%"}},React.createElement("span",{style:{paddingLeft:"12px",paddingRight:"12px"}},"月供"),React.createElement("span",{style:{color:"#FF6980",fontSize:"18px"}},"￥",this.state.monthlyPay)),React.createElement("div",{style:{clear:"both"}}),React.createElement("div",{style:{height:"12px"}})):"",React.createElement("div",{style:{padding:"15px 0"}},React.createElement("span",{style:{paddingLeft:14}},"首付金额  ",React.createElement("span",{style:{color:"rgb(255, 105, 128)"}},"￥",e?e.shoufu:"")),React.createElement("span",{style:{paddingLeft:14}},"月付 ",React.createElement("span",{style:{color:"rgb(255, 105, 128)"}},e?e.yuefu:"")))),React.createElement("div",{style:{height:"12px"}}),React.createElement("div",null,React.createElement("input",{type:"button",onClick:this.createOrder,value:"立即分期",style:{border:"0px solid transparent",width:"166px",height:"48px",fontSize:"18px",backgroundColor:"#FF6980",fontFamily:"Microsoft Yahei",color:"white",cursor:"pointer"}})))),React.createElement(DetailHelp,null),React.createElement("div",{style:{clear:"both"}}),React.createElement("div",{style:{height:"16px"}}),React.createElement("div",{style:this.styles.container},React.createElement("div",{style:this.styles.leftPanel},React.createElement(DetailTabs,{goodsDetail:s,hospitalInfo:a})),React.createElement("div",{style:this.styles.rightPanel})))}}),R_DetailPage=React.createClass({displayName:"R_DetailPage",styles:{detail:{border:"1px solid #f3f3f3",paddingTop:"16px",paddingBottom:"16px"},container:{position:"relative",width:"1200px",margin:"0 auto"}},render:function(){return React.createElement("div",null,React.createElement("div",{style:{height:"16px"}}),React.createElement("div",{style:this.styles.container},React.createElement("div",{style:this.styles.detail},React.createElement(DetailOrder,null))))}});