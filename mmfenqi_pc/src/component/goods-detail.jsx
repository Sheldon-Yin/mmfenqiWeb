/**
 * Created by sheldon on 2016/7/22.
 */
'use strict';

var HotItems = React.createClass({
    styles: {
        header: {
            height: '40px',
            borderBottom: '1px solid #f3f3f3',
            lineHeight: '40px',
            paddingLeft: '12px',
            width: '100%'
        },
        item: {
            height: '54px',
            marginTop: '18px',
            paddingLeft: '11px',
            position: 'relative'
        }
    },

    getDefaultProps: function () {
        return {
            items: []
        }
    },

    render: function () {
        var nodes = this.props.items.map(function (item, index) {
            return (
                <div style={this.styles.item} key={index}>
                    <img src="http://img2.imgtn.bdimg.com/it/u=3260548700,3238345600&fm=21&gp=0.jpg" height="54"
                         width="54"></img>
                    <div
                        style={{position:'absolute', left: '70px', right: '0px', top: '0px', fontSize: '12px', height: '54px'}}>
                        <div style={{maxHeight: '34px'}}>商品详情商品</div>
                        <div
                            style={{position:'absolute', left: '0px', right: '0px', bottom: '0px', fontSize: '14px', height: '14px', lineHeight: '14px'}}>
                            $1222
                        </div>
                    </div>
                </div>
            )
        }.bind(this));


        return (
            <div style={{width: '100%'}}>
                <div style={this.styles.header}>
                    销量排行
                </div>
                {nodes}
                <div style={{height: '18px'}}></div>
            </div>
        )
    }
});


var DetailTabs = React.createClass({
    styles: {
        header: {
            height: '40px',
            borderBottom: '1px solid #FF6980',
            lineHeight: '40px',
            width: '100%',
            backgroundColor: '#fdfdfd'
        },
        link: {
            width: '130px',
            height: '40px',
            display: 'inline-block',
            textAlign: 'center',
            color: 'black',
            textDecoration: 'none'
        }
    },
    render: function () {
        return (
            <div style={{width: '100%'}}>
                <div style={this.styles.header}>
                    <a href="#ser-detail" style={this.styles.link}>服务详情</a>
                    <span style={{color: '#e3e3e3'}}>|</span>
                    <a href="#doc-detail" style={this.styles.link}>医生简介</a>
                    <span style={{color: '#e3e3e3'}}>|</span>
                    <a href="#hos-detail" style={this.styles.link}>医院位置/介绍</a>
                </div>
                <div id="ser-detail">
                    <div style={{height: '200px'}}></div>
                </div>
                <div id="doc-detail">
                    <h4 style={{paddingLeft: '20px'}}>医生简介</h4>
                    <div
                        style={{marginTop: '10px', marginBottom: '10px', marginLeft: '20px', marginRight: '20px', height: '1px', backgroundColor: '#f3f3f3'}}></div>
                    <div style={{height: '200px'}}></div>
                </div>
                <div id="hos-detail">
                    <h4 style={{paddingLeft: '20px'}}>医院位置/介绍</h4>
                    <div
                        style={{marginTop: '10px', marginBottom: '10px', marginLeft: '20px', marginRight: '20px', height: '1px', backgroundColor: '#f3f3f3'}}></div>
                    <div style={{height: '200px'}}></div>
                </div>
            </div>
        )
    }
});

var DetailPreview = React.createClass({

    getDefaultProps: function () {
        return {
            images: []
        }
    },

    getInitialState: function () {
        return {
            currentIndex: 0,
            firstIndex: 0,
            lastIndex: 0,
        }
    },

    firstIndex: -1,
    lastIndex: -1,

    onChange: function (index) {
        return function () {
            this.setState({currentIndex: index});
        }.bind(this);
    },

    onNext: function () {
        if (this.state.currentIndex + 1 < this.props.images.length) {
            this.setState({currentIndex: this.state.currentIndex + 1});
        }
    },

    onPre: function () {
        if (this.state.currentIndex - 1 >= 0) {
            this.setState({currentIndex: this.state.currentIndex - 1});
        }
    },

    render: function () {

        if (this.firstIndex == -1 && this.lastIndex == -1) {
            this.firstIndex = 0;
            this.lastIndex = 3;

            if (this.lastIndex > this.props.images.length - 1) {
                this.lastIndex = this.props.images.length - 1
            }
        }

        if (this.state.currentIndex > this.lastIndex) {
            this.firstIndex += 1;
            this.lastIndex += 1;
        }

        if (this.state.currentIndex < this.firstIndex) {
            this.firstIndex -= 1;
            this.lastIndex -= 1;
        }

        var indexes = [];
        for (var i = this.firstIndex; i <= this.lastIndex; i++) {
            indexes.push(i);
        }
        var nodes = indexes.map(function (index) {
            var style = {
                cursor: 'pointer',
                width: '24%',
                lineHeight: '68px',
                textAlign: 'center',
                height: '70px',
                float: 'left',
                border: '1px solid transparent'
            };
            if (index == this.state.currentIndex) {
                style = {
                    cursor: 'pointer',
                    width: '24%',
                    lineHeight: '68px',
                    textAlign: 'center',
                    height: '70px',
                    float: 'left',
                    border: '1px solid #f3f3f3'
                }
            }

            return (
                <div onClick={this.onChange(index)} key={this.props.images[index] + ' ' + index} style={style}>
                    <img src={this.props.images[index]} style={{maxWidth: '100%', maxHeight: '68px'}}/>
                </div>
            )
        }.bind(this));

        return (
            <div style={{float: 'left', width: '482px'}}>
                <div
                    style={{lineHeight: '277px', width: '438px', height: '277px', margin: '0 auto', textAlign:'center', backgroundColor: '#f3f3f3'}}>
                    <img src={this.props.images[this.state.currentIndex]} style={{maxWidth:'100%', maxHeight:'100%'}}/>
                </div>
                <div
                    style={{position:'relative', width: '438px', height: '70px', margin: '0 auto', marginTop: '25px', backgroundColor: 'white'}}>
                    <div onClick={this.onPre}
                         style={{cursor: 'pointer', left:'0px', top: '0px', position:'absolute', height: '70px', width: '18px', lineHeight: '70px', textAlign: 'center'}}>
                        <img src="../static/images/common/left.png"
                             style={{maxWidth: '100%', maxHeight: '100%',marginTop:20}}/>
                    </div>
                    <div style={{position: 'absolute', left: '20px', right: '20px', height: '70px', top: '0px'}}>
                        {nodes}
                    </div>
                    <div onClick={this.onNext}
                         style={{cursor: 'pointer', right: '0px', top: '0px', position:'absolute', height: '70px', width: '18px', lineHeight: '70px', textAlign: 'center'}}>
                        <img src="../static/images/common/right.png"
                             style={{maxWidth: '100%', maxHeight: '100%',marginTop:20}}/>
                    </div>
                </div>
                <div
                    style={{width: '438px', height: '1px', margin: '0 auto', marginTop: '25px', backgroundColor: '#f3f3f3'}}></div>
            </div>
        )
    }
});


var Selector = React.createClass({
    getDefaultProps: function () {
        return {
            items: []
        }
    },

    getInitialState: function () {
        return {
            currentIndex: 0
        }
    },

    componentDidUpdate(){
        if (!this.flag) {
            if (!!this.props.callbackSetValue) {
                this.props.callbackSetValue(this.state.currentIndex);
                this.flag = true;
            }
        }
    },
    componentWillMount(){
        this.flag = false
    },

    styles: {
        span: {
            cursor: 'pointer',
            display: 'inline-block',
            backgroundColor: 'white',
            padding: '8px',
            border: '1px solid #f3f3f3',
            marginLeft: '12px',
            marginTop: '8px'
        },
        spanSelect: {
            cursor: 'pointer',
            display: 'inline-block',
            backgroundColor: '#FF6980',
            padding: '8px',
            border: '1px solid #f3f3f3',
            marginLeft: '12px',
            marginTop: '8px',
            color: 'white'
        }
    },

    onChange: function (index) {
        return function () {
            this.setState({currentIndex: index});
            this.flag = false;
        }.bind(this)
    },

    render: function () {
        var nodes = this.props.items.map(function (item, index) {

            var style = this.state.currentIndex == index ? this.styles.spanSelect : this.styles.span;

            return (
                <span key={item + ' ' + index}
                      style={style} onClick={this.onChange(index)}>
                    {item}
                </span>
            )
        }.bind(this));

        return (
            <div style={{display:'inline'}}>
                {nodes}
            </div>
        )
    }
});

var NumberSelector = React.createClass({

    getInitialState: function () {
        return {
            number: 1,
            currentItem: ''
        }
    },

    styles: {
        operations: {
            display: 'inline-block',
            lineHeight: '35px',
            height: '35px',
            width: '35px',
            border: '1px solid #f3f3f3',
            textAlign: 'center',
            cursor: 'pointer'
        },
        number: {
            display: 'inline-block',
            lineHeight: '35px',
            height: '35px',
            minWidth: '55px',
            border: '1px solid #f3f3f3',
            textAlign: 'center'
        }
    },

    onAdd: function (value) {
        return function () {
            var nextNumber = this.state.number + value;
            if (nextNumber < 1) {
                nextNumber = 1;
            }
            this.setState({number: nextNumber});
            if (!!this.props.callbackParent) {
                this.props.callbackParent(nextNumber)
            }
        }.bind(this);
    },

    render: function () {
        return (
            <div style={{display:'inline', marginLeft: '12px'}}>
                <span style={this.styles.operations} onClick={this.onAdd(-1)}>-</span>
                <span style={this.styles.number}>{this.state.number}</span>
                <span style={this.styles.operations} onClick={this.onAdd(1)}>+</span>
            </div>
        );
    }
});

var ComboBox = React.createClass({

    getInitialState: function () {
        return {
            currentIndex: 0,
            show: false
        }
    },

    getDefaultProps: function () {
        return {
            items: []
        }
    },

    componentDidUpdate(){
        if (!this.flag) {
            if (!!this.props.callbackSetValue) {
                this.props.callbackSetValue(this.state.currentIndex);
                this.flag = true;
            }
        }
    },
    componentWillMount(){
        this.flag = false
    },

    styles: {
        li: {
            cursor: 'pointer',
            height: '35px',
            lineHeight: '35px',
            borderBottom: '1px solid #f3f3f3',
            paddingLeft: '8px'
        },
        ulHidden: {
            listStyle: 'none',
            position: 'absolute',
            border: '1px solid #f3f3f3',
            backgroundColor: 'white',
            right: '0px',
            paddingLeft: '0px',
            left: '0px',
            zIndex: '1000',
            display: 'none'
        },
        ulShow: {
            listStyle: 'none',
            position: 'absolute',
            border: '1px solid #f3f3f3',
            backgroundColor: 'white',
            right: '0px',
            paddingLeft: '0px',
            left: '0px',
            zIndex: '1000'
        }
    },

    onToggle: function () {
        this.setState({show: !this.state.show});
    },

    onChange: function (index) {
        return function () {
            this.setState({currentIndex: index, show: false});

            this.flag = false;

        }.bind(this);
    },

    render: function () {

        var ulStyle = this.state.show ? this.styles.ulShow : this.styles.ulHidden;

        var nodes = this.props.items.map(function (item, index) {
            return (
                <li key={index} style={this.styles.li} onClick={this.onChange(index)}>{item}</li>
            )
        }.bind(this));

        return (
            <div style={{float: 'left', height: '40px', position: 'relative'}}>
                <div onClick={this.onToggle}
                     style={{cursor: 'pointer', border: '1px solid #f3f3f3', padding: '8px', backgroundColor: 'white'}}>
                    <span>{this.props.items[this.state.currentIndex]}</span>
                    <span>&nbsp;&nbsp;▼</span>
                </div>
                <ul style={ulStyle}>
                    {nodes}
                </ul>
            </div>
        )
    }
});

var DetailHelp = React.createClass({
    render: function () {
        return (
            <div style={{float: 'left', width: '220px'}}>
                <div style={{width: '145px', margin: '0 auto'}}>
                    <img src="../static/images/goods/tips.png" width="100%" style={{maxHeight:'150px'}}/>
                    <input type="button" value="立即提额"
                           style={{backgroundColor: '#FF6980',
                                                                 borderWidth: '0px',
                                                                 color: 'white',
                                                                 height: '35px',
                                                                 display: 'block',
                                                                 width: '125px',
                                                                 margin: '0 auto',
                                                                 marginTop: '25px'}}/>
                    <div
                        style={{height: '1px', backgroundColor:'#f3f3f3', width: '125px', margin: '0 auto', marginTop: '35px', marginBottom: '35px'}}></div>
                    <img src="../static/images/goods/tips2.png" width="100%" style={{maxHeight:'150px'}}/>
                    <div
                        style={{height: '1px', backgroundColor:'#f3f3f3', width: '125px', margin: '0 auto', marginTop: '35px', marginBottom: '35px'}}></div>
                    <input type="button" value="联系客服" style={{backgroundColor: 'white',
                                                                 borderWidth: '0px',
                                                                 color: '#FF6980',
                                                                 height: '35px',
                                                                 display: 'block',
                                                                 width: '125px',
                                                                 margin: '0 auto',
                                                                 marginTop: '25px',
                                                                 border: '1px solid #FF6980'}}/>
                    <div style={{height: '25px'}}></div>
                    <div style={{fontSize: '12px', color: '#737373', textAlign: 'center'}}>工作日:9:00-21:00</div>
                    <div style={{fontSize: '12px', color: '#737373', textAlign: 'center'}}>工作日:10:00-17:00</div>
                </div>
            </div>
        )
    }
});


var ReactSku = React.createClass({
    getDefaultProps: function () {
        return {
            types: [],
            items: []
        }
    },
    getInitialState: function () {
        return {
            keyMap: [],
            selected: [],
            keys: []
        }
    },
    componentWillMount(){
        this.key_account_Map = [];
    },
    initKeyMap: function (skuData) {
        var _keyMap = {};
        var _keys = this.getKeys(skuData);
        _keys.forEach(function (array, i0) {
            array.forEach(function (value, i1) {
                _keyMap[value] = {
                    name: value,
                    selected: !1,
                    disabled: !1
                };
            });
        });
        return _keyMap
    },
    /**
     * 过滤数组
     * @param a
     * @param predicate
     * @returns {Array}
     */
    filter: function (a, predicate) {
        var results = [];
        a.forEach(function (value, index) {
            if (predicate(value, index)) results.push(value);
        });
        return results;
    },
    getIndex: function (key) {
        var index = -1;
        this.keys.forEach(function (array, i0) {
            if (index !== -1) return;
            array.forEach(function (value, i1) {
                if (key === value) index = i0;
            });
        });
        return index;
    },
    /**
     * 数组去重
     * @param a {Array}
     * @returns {Array}
     */
    unique: function (a) {
        var res = [];
        var json = {};
        for (var i = 0; i < a.length; i++) {
            if (!json[a[i]]) {
                res.push(a[i]);
                json[a[i]] = 1;
            }
        }
        return res;
    },

    /**
     * 矩阵转置前的2维数组
     */
    getSkuList: function (obj) {
        var array = [];
        var key = '';
        if (!obj) $log.error('input sku-data error!');
        if (!!obj.forEach) {
            obj.forEach(function (value, key) {
                array.push(key.split('#'));
            });
        }
        else {
            for (key in obj) {
                array.push(key.split('#'))
            }
        }
        return array;
    },

    /**
     * 矩阵转置
     * http://geniuscarrier.com/transpose-in-javascript/
     * =====================
     *  |1 2 3|     |1 4 7|
     *  |4 5 6| ==> |2 5 8|
     *  |7 8 9|     |3 6 9|
     *======================
     */
    transpose: function (a) {
        var w = a.length ? a.length : 0,
            h = a[0] instanceof Array ? a[0].length : 0;
        if (h === 0 || w === 0) {
            return [];
        }
        var i, j, t = [];
        for (i = 0; i < h; i++) {
            t[i] = [];
            for (j = 0; j < w; j++) {
                t[i][j] = a[j][i];
            }
        }
        return t;
    },

    /**
     * 获取sku规格--2维数组
     * @param a {Array}
     * @returns {Array}
     */
    getKeys: function (obj) {
        var list = this.getSkuList(obj),
            ta = this.transpose(list),
            r = [];
        for (var i = 0; i < ta.length; i++) {
            r[i] = this.unique(ta[i]);
        }
        this.keys = r;
        return this.keys;
    },

    /**
     * key对应的库存
     * @param key
     * @param data
     * @returns {Number}
     */
    getPrice: function (key, data) {
        var result = 0,
            i, j, m,
            items, n = [];

        //检查是否已计算过
        if (!!this.key_account_Map[key]) {
            return this.key_account_Map[key];
        }

        items = key.split('#');

        //已选择数据是最小路径，直接从已端数据获取
        if (items.length === this.keys.length) {
            this.key_account_Map[key] = data[key] ? data[key].presentPrice : null;
            return data[key] ? data[key].presentPrice : null;
        }

        for (i = 0; i < this.keys.length; i++) {
            for (j = 0; j < this.keys[i].length && items.length > 0; j++) {
                if (this.keys[i][j] == items[0]) {
                    break;
                }
            }

            if (j < this.keys[i].length && items.length > 0) {
                //找到该项，跳过
                n.push(items.shift());
            } else {
                //分解求值
                for (m = 0; m < this.keys[i].length; m++) {
                    var newPrice = this.getPrice(n.concat(this.keys[i][m], items).join('#'), data);
                    if (!!result && result < newPrice) {
                    } else {
                        result = newPrice ? newPrice : result;
                    }
                }
                break;
            }
        }

        //缓存
        this.key_account_Map[key] = result;
        return result;
    },
    getStoreId: function (key, data) {
        var result = 0,
            i, j, m,
            items, n = [];

        items = key.split('#');

        //已选择数据是最小路径，直接从已端数据获取
        if (items.length === this.keys.length) {
            return data[key] ? data[key].storeGoodsCombinationId : null;
        } else {
            return null;
        }
    },

    styles: {
        span: {
            cursor: 'pointer',
            display: 'inline-block',
            backgroundColor: 'white',
            padding: '8px',
            border: '1px solid #f3f3f3',
            marginLeft: '12px',
            marginTop: '8px'
        },
        spanSelect: {
            cursor: 'pointer',
            display: 'inline-block',
            backgroundColor: '#FF6980',
            padding: '8px',
            border: '1px solid #f3f3f3',
            marginLeft: '12px',
            marginTop: '8px',
            color: 'white'
        },
        spanDisabled: {
            cursor: 'pointer',
            display: 'inline-block',
            backgroundColor: '#999',
            padding: '8px',
            border: '1px solid #f3f3f3',
            marginLeft: '12px',
            marginTop: '8px',
            color: 'white'
        }

    },

    onChange: function (index) {
        return function () {
            this.setState({currentIndex: index});
            if (!!this.props.callbackParent) {
                this.props.callbackParent(index)
            }
        }.bind(this)
    },

    onSelect: function (event) {
        var length = 0;
        for (var x in this.state.keyMap) {
            length++
        }
        var check = [];
        if (length == 0) {
            var x = 0;
            for (var temp in this.props.items) {
                x++;
            }
            if (this.count != 1 && x != 0) {
                this.setState({keyMap: this.initKeyMap(this.props.items)});
                this.count = 1;
            }
            return
        }

        if (!event) {
            return
        }
        if (this.state.keyMap[event.target.innerHTML].disabled) return;
        this.checkItem(event.target.innerHTML);

        check = this.filter(this.state.selected, function (value, index) {
            return value;
        });

        // fire callback
        this.props.cxt.getGoodsInfo(this.getStoreId(check.join('#'), this.props.items),this.getPrice(check.join('#'), this.props.items));

    },

    checkItem: function (currentKey) {
        var _this = this;
        var keyMap = this.state.keyMap,
            copy = [], check = [],
            index = this.getIndex(currentKey),
            selected = this.state.selected;

        if (index === -1) {
            $log.error('key is undefiend!');
            return;
        }
        // 维护selected数组

        selected[index] = (this.state.selected[index] === currentKey) ? void 0 : currentKey;
        this.keys.forEach(function (array, i0) {
            var copy = $.extend(true, [], selected);
            array.forEach(function (key, i1) {
                if (i0 === index) {
                    // 当前选中的行,当前选中的项状态置反，其他设置为false
                    keyMap[key].selected = !!(currentKey === key) ? !keyMap[key].selected : !1;
                }
                // 当前选中的行不做, 已经选中的项不具体逻辑
                if (i0 === index || !!keyMap[key].selected) return;
                copy[i0] = key;
                check = _this.filter(copy, function (value, index) {
                    return !!value;
                });
                keyMap[key].disabled = _this.getPrice(check.join('#'), _this.props.items) <= 0;
            });
        });
        this.setState({keyMap: keyMap, selected: selected})
    },


    render: function () {
        var _thisAll = this;
        var x = 0;
        for (var k in this.props.items) {
            x++;
        }
        if (this.count != 1 && x != 0) {
            setTimeout(function () {
                _thisAll.onSelect();
            }, 0)
        }

        var nodes = this.props.types.map(function (item, index) {

            var _this = this;

            var items = item.combinationDefinitionInfoList.map(function (subItem, subIndex) {
                var style = _this.styles.span;
                if (!!_this.state.keyMap[subItem.combinationName]) {
                    var style = _this.state.keyMap[subItem.combinationName].selected == true ? _this.styles.spanSelect : _this.styles.span;
                    if (_this.state.keyMap[subItem.combinationName].disabled) {
                        style = _this.styles.spanDisabled;
                    }
                }
                return (
                    <span key={subItem + ' ' + subIndex}
                          style={style} onClick={_this.onSelect}>
                        {subItem.combinationName}
                    </span>
                )
            });

            return (
                <div key={item + ' ' + index}>
                    <span style={{marginLeft:12}}>{item.combinationTypeName}</span>
                    {items}
                </div>
            )
        }.bind(this));

        return (
            <div style={{display:'inline'}}>
                {nodes}
            </div>
        )
    }
});

var DetailOrder = React.createClass({
    styles: {
        detail: {
            border: '1px solid #f3f3f3',
            paddingTop: '16px',
            paddingBottom: '16px'
        },
        container: {
            position: 'relative',
            width: '1200px',
            margin: '0 auto'
        },
        row: {
            width: '100%'
        },
        leftPanel: {
            border: '1px solid #f3f3f3',
            left: '0px',
            width: '1000px',
            minHeight: '40px'
        },
        rightPanel: {
            border: '1px solid #f3f3f3',
            width: '185px',
            minHeight: '40px',
            position: 'absolute',
            right: '0px',
            top: '0px'
        }
    },
    getInitialState: function () {
        return {
            kinds: [],
            mounts: [],
            insurance: [],
            percent: [],
            goodsInfo: {},
            goodsTypes: [],
            goodsItems: []
        }
    },

    getGoodsInfo(conbinationId,price){
        if (!!conbinationId){
            this.setState({
                storeGoodsCombinationId: conbinationId,
                orderPrice: price
            });
        }else {
            this.setState({
                storeGoodsCombinationId: null,
                orderPrice: null
            })
        }


        var goodsId = this.getQueryString('goodsId');
        $.ajax({
            type: 'post',
            url: '/pc/computer/query_goods_staging_order',
            data: {goodsId: goodsId, storeGoodsCombinationId: conbinationId},
            dataType: 'json',
            success: (res)=> {
                console.log(res);
                if (res.result == 0) {
                    this.goodsInfo = res.data;
                    this.setState({
                        mounts: res.data.goodsStagingInfoResponse.fenqiConfigList,
                        insurance: res.data.goodsStagingInfoResponse.insuranceAmountList,
                        percent: res.data.goodsStagingInfoResponse.fenqiShowfuInfoList,
                        goodsInfo: res.data.goodsStagingInfoResponse.goodsDetailsInfo,
                        goodsTypes: res.data.combinationTypeInfoList,
                        goodsItems: res.data.goodsCombinationExtMap
                    })
                }
            }
        })
    },

    componentWillMount(){
        this.getGoodsInfo()
    },
    getQueryString(name)
    {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)return unescape(r[2]);
        return null;
    },
    percentChanged(index){
        console.log(index);
    },
    mountsChanged(index){
        console.log(index);
    },
    numberChanged(num){
        console.log(num)
    },
    setInsurance(value){
        if (!!this.goodsInfo) {
            console.log('选择了' + this.goodsInfo.goodsStagingInfoResponse.insuranceAmountList[value].price + '元保险');
            this.setState({
                selectedInsurance: this.goodsInfo.goodsStagingInfoResponse.insuranceAmountList[value].price
            })
        }
    },
    setFirstPayRatio(value){
        if (!!this.goodsInfo) {
            console.log('选择了' + this.goodsInfo.goodsStagingInfoResponse.fenqiShowfuInfoList[value].ratio + '比例的首付，id为' + this.goodsInfo.goodsStagingInfoResponse.fenqiShowfuInfoList[value].shoufuId);
            this.setState({
                selectedFirstPay: this.goodsInfo.goodsStagingInfoResponse.fenqiShowfuInfoList[value].shoufuId
            })
        }
    },
    setStaging(value){
        if (!!this.goodsInfo) {
            console.log('选择了分' + this.goodsInfo.goodsStagingInfoResponse.fenqiConfigList[value].staging + '期，id为' + this.goodsInfo.goodsStagingInfoResponse.fenqiConfigList[value].configId);
            this.setState({
                selectedStaging: this.goodsInfo.goodsStagingInfoResponse.fenqiConfigList[value].configId
            })
        }
    },
    createOrder(){

        var orderData = {};
        if (this.goodsInfo.combinationList.length != 0) {
            if (!this.state.storeGoodsCombinationId) {
                alert('请先选择完整的商品属性');
                return;
            }else {
                orderData = {
                    goodsId: this.getQueryString('goodsId'),
                    isInsuranceBuy: true,
                    insuranceAmount: this.state.selectedInsurance,
                    configId: this.state.selectedStaging,
                    shoufuId: this.state.selectedFirstPay,
                    goodsNumber: 1,
                    storeGoodsCombinationId: this.state.storeGoodsCombinationId,
                    orderAmount: this.state.orderPrice
                };
            }
        } else {
            orderData = {
                goodsId: this.getQueryString('goodsId'),
                isInsuranceBuy: true,
                insuranceAmount: this.state.selectedInsurance,
                configId: this.state.selectedStaging,
                shoufuId: this.state.selectedFirstPay,
                goodsNumber: 1,
                orderAmount: this.goodsInfo.goodsStagingInfoResponse.goodsDetailsInfo.storeGoods.shopPrice
            }
        }
        this.createOrderConfirm(orderData)
    },

    createOrderConfirm(orderData){
        console.log(orderData);
        $.ajax({
            type: 'post',
            url: '/pc/computer/user_goods_confirm_order',
            data: orderData,
            dataType: 'json',
            success: (res)=> {
                console.log(res);
                if (res.result == 0) {
                    var locationSearchString = '?';
                    var order = res.data.goodsConfirmOrderResponse.order;
                    var user = res.data.goodsConfirmOrderResponse.userInfo;
                    locationSearchString = locationSearchString + 'orderId=' + order.orderId +
                            '&orderNo=' + order.orderNo + '&orderName=' + order.orderName +
                            '&downpayAmount=' + order.downpayAmount + '&creditPay=' + res.data.goodsConfirmOrderResponse.creditPayment+
                            '&telephone=' + user.telephone + '&startPhone=' + user.telephone.substring(0,3)+"****"+user.telephone.substring(7,11);
                    window.location.href = ('my-order-detail.html'+locationSearchString);
                }else if(res.result == 1013) {
                    window.location.href = 'login.html';
                    window.localStorage.referer = window.location.href;
                }else {
                    alert(res.msg)
                }
            }
        });
    },

    render: function () {

        var hotItems = [
            {
                img: 'http://img2.imgtn.bdimg.com/it/u=3260548700,3238345600&fm=21&gp=0.jpg',
                detail: '商品详情',
                price: '$255'
            },
            {
                img: 'http://img2.imgtn.bdimg.com/it/u=3260548700,3238345600&fm=21&gp=0.jpg',
                detail: '商品详情',
                price: '$255'
            },
            {
                img: 'http://img2.imgtn.bdimg.com/it/u=3260548700,3238345600&fm=21&gp=0.jpg',
                detail: '商品详情',
                price: '$255'
            },
            {
                img: 'http://img2.imgtn.bdimg.com/it/u=3260548700,3238345600&fm=21&gp=0.jpg',
                detail: '商品详情',
                price: '$255'
            }
        ];

        var kinds = ['全切双眼皮', '全切双眼皮', '全切双眼皮', '全切双眼皮', '全切双眼皮'];

        var mounts = [];
        var insurance = [];
        var percent = [];
        var images = ['', '', '', ''];
        this.state.insurance.forEach(function (item) {
            insurance.push(item.price);
        });
        this.state.mounts.forEach(function (item) {
            mounts.push(item.staging);
        });
        //var insurance = this.state.insurance;
        this.state.percent.forEach(function (item) {
            percent.push(item.ratio)
        });

        if (!!this.state.goodsInfo.goodsDetailUrlList) {
            images = this.state.goodsInfo.goodsDetailUrlList;
        }

        return (
            <div>
                <DetailPreview images={images}/>
                <div style={{float: 'left', width: '495px'}}>
                    <span
                        style={{color: 'black', fontSize: '18px'}}>{!!this.state.goodsInfo.storeGoods ? this.state.goodsInfo.storeGoods.goodsName : ''}</span>
                    <div style={{height: '16px'}}></div>
                    <div style={{color: '#646464'}}>
                        <span style={{paddingLeft: '12px'}}>商品价格</span>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span
                            style={{color: '#FF6980', fontSize: '30px'}}>￥{!!this.state.goodsInfo.storeGoods ? (!!this.state.orderPrice ? this.state.orderPrice : this.state.goodsInfo.storeGoods.shopPrice) : ''}</span>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span
                            style={{textDecoration: 'line-through'}}>￥{!!this.state.goodsInfo.storeGoods ? this.state.goodsInfo.storeGoods.marketPrice : ''}</span>
                        <div style={{border:'1px dashed #FF6980', marginLeft: '12px'}}></div>
                        <div style={{height: '8px'}}></div>
                        <div>
                            <span style={{paddingLeft: '12px',fontWeight:'bold',fontSize:'18px'}}>选择规格</span>
                            <ReactSku cxt={this} types={!!this.state.goodsTypes ? this.state.goodsTypes : []}
                                      items={this.state.goodsItems}/>
                        </div>
                        <div style={{height: '8px'}}></div>
                        <div>
                            <div
                                style={{paddingLeft: '12px', float: 'left', marginRight: '12px', height: '40px', lineHeight: '40px'}}>
                                选择保险
                            </div>
                            <ComboBox cxt={this} callbackSetValue={this.setInsurance} items={insurance}/><span
                            style={{lineHeight:'40px',marginLeft:10}}>元</span>
                            <div style={{clear:'both'}}></div>
                        </div>

                        <div style={{height: '8px'}}></div>
                        <div style={{backgroundColor: 'rgb(253, 251, 253)'}}>
                            <div style={{fontSize:'18px', padding: '12px',fontWeight:'bold'}}>
                                <span>分期选择</span>
                            </div>
                            <div>
                                <div
                                    style={{paddingLeft: '12px', float: 'left', marginRight: '12px', height: '40px', lineHeight: '40px'}}>
                                    首付比例
                                </div>
                                <ComboBox callbackSetValue={this.setFirstPayRatio} cxt={this} items={percent}
                                          callbackParent={this.percentChanged}/>
                                <div style={{clear:'both'}}></div>
                            </div>
                            <div>
                                <span style={{paddingLeft: '12px'}}>选择分期数</span>
                                <Selector callbackSetValue={this.setStaging} cxt={this} items={mounts}/>
                            </div>
                            <div style={{height: '8px'}}></div>
                            {
                                !!this.state.firstPay ?
                                    <div>
                                        <div style={{float:'left', width: '50%'}}>
                                            <span style={{paddingLeft: '12px', paddingRight: '12px'}}>首付金额</span>
                                            <span
                                                style={{color: '#FF6980', fontSize: '18px'}}>￥{this.state.firstPay}</span>
                                        </div>
                                        <div style={{float:'right', width: '50%'}}>
                                            <span style={{paddingLeft: '12px', paddingRight: '12px'}}>月供</span>
                                            <span
                                                style={{color: '#FF6980', fontSize: '18px'}}>￥{this.state.monthlyPay}</span>
                                        </div>
                                        <div style={{clear:'both'}}></div>
                                        <div style={{height: '12px'}}></div>
                                    </div>
                                    :
                                    ''
                            }

                        </div>

                        <div style={{height: '12px'}}></div>
                        <div>
                            <input type='button' onClick={this.createOrder}
                                   value="立即分期"
                                   style={{border: '0px solid transparent',
                                       width: '166px',
                                       height: '48px',
                                       fontSize: '18px',
                                       backgroundColor: '#FF6980',
                                       color: 'white'}}/>
                        </div>
                    </div>
                </div>

                <DetailHelp/>
                <div style={{clear: 'both'}}></div>
                <div style={{height: '16px'}}/>
                <div style={this.styles.container}>
                    <div style={this.styles.leftPanel}>
                        <DetailTabs/>
                    </div>
                    <div style={this.styles.rightPanel}>
                        {/*<HotItems items={hotItems}/>*/}
                    </div>
                </div>


            </div>
        )
    }
});

var R_DetailPage = React.createClass({
    styles: {
        detail: {
            border: '1px solid #f3f3f3',
            paddingTop: '16px',
            paddingBottom: '16px'
        },
        container: {
            position: 'relative',
            width: '1200px',
            margin: '0 auto'
        }
    },
    render: function () {
        return (
            <div>
                <div style={{height: '16px'}}/>
                <div style={this.styles.container}>
                    <div style={this.styles.detail}>
                        <DetailOrder/>
                    </div>
                </div>
            </div>
        )
    }
});