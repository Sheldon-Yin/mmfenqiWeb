/**
 * Created by sheldon on 2016/7/22.
 */
'use strict';

var HotItems = React.createClass({
    displayName: 'HotItems',

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

    getDefaultProps: function getDefaultProps() {
        return {
            items: []
        };
    },

    render: function render() {
        var nodes = this.props.items.map(function (item, index) {
            return React.createElement(
                'div',
                { style: this.styles.item, key: index },
                React.createElement('img', { src: 'http://img2.imgtn.bdimg.com/it/u=3260548700,3238345600&fm=21&gp=0.jpg', height: '54',
                    width: '54' }),
                React.createElement(
                    'div',
                    {
                        style: { position: 'absolute', left: '70px', right: '0px', top: '0px', fontSize: '12px', height: '54px' } },
                    React.createElement(
                        'div',
                        { style: { maxHeight: '34px' } },
                        '商品详情商品'
                    ),
                    React.createElement(
                        'div',
                        {
                            style: { position: 'absolute', left: '0px', right: '0px', bottom: '0px', fontSize: '14px', height: '14px', lineHeight: '14px' } },
                        '$1222'
                    )
                )
            );
        }.bind(this));

        return React.createElement(
            'div',
            { style: { width: '100%' } },
            React.createElement(
                'div',
                { style: this.styles.header },
                '销量排行'
            ),
            nodes,
            React.createElement('div', { style: { height: '18px' } })
        );
    }
});

var DetailTabs = React.createClass({
    displayName: 'DetailTabs',

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
    render: function render() {
        return React.createElement(
            'div',
            { style: { width: '100%' } },
            React.createElement(
                'div',
                { style: this.styles.header },
                React.createElement(
                    'a',
                    { href: '#ser-detail', style: this.styles.link },
                    '服务详情'
                ),
                React.createElement(
                    'span',
                    { style: { color: '#e3e3e3' } },
                    '|'
                ),
                React.createElement(
                    'a',
                    { href: '#hos-detail', style: this.styles.link },
                    '医院位置/介绍'
                )
            ),
            React.createElement(
                'div',
                { id: 'ser-detail' },
                React.createElement(
                    'div',
                    null,
                    this.props.goodsDetail
                )
            ),
            React.createElement(
                'div',
                { id: 'hos-detail' },
                React.createElement(
                    'h4',
                    { style: { paddingLeft: '20px' } },
                    '医院位置/介绍'
                ),
                React.createElement(
                    'div',
                    { style: { marginTop: 20, marginLeft: 50 } },
                    React.createElement('iframe', { src: "/pcgoods/toBaiduMap/" + this.props.hospitalInfo.hosId, frameBorder: '0',
                        height: '260px', width: '660px', scrolling: 'no' })
                ),
                React.createElement(
                    'div',
                    { style: { marginTop: '10px', marginBottom: '10px', marginLeft: '20px', marginRight: '20px', height: '1px', backgroundColor: '#f3f3f3' } },
                    this.props.hospitalInfo.introduction
                ),
                React.createElement('div', { style: { height: '200px' } })
            )
        );
    }
});

var DetailPreview = React.createClass({
    displayName: 'DetailPreview',


    getDefaultProps: function getDefaultProps() {
        return {
            images: []
        };
    },

    getInitialState: function getInitialState() {
        return {
            currentIndex: 0,
            firstIndex: 0,
            lastIndex: 0
        };
    },

    firstIndex: -1,
    lastIndex: -1,

    onChange: function onChange(index) {
        return function () {
            this.setState({ currentIndex: index });
        }.bind(this);
    },

    onNext: function onNext() {
        if (this.state.currentIndex + 1 < this.props.images.length) {
            this.setState({ currentIndex: this.state.currentIndex + 1 });
        }
    },

    onPre: function onPre() {
        if (this.state.currentIndex - 1 >= 0) {
            this.setState({ currentIndex: this.state.currentIndex - 1 });
        }
    },

    render: function render() {

        if (this.firstIndex == -1 && this.lastIndex == -1) {
            this.firstIndex = 0;
            this.lastIndex = 3;

            if (this.lastIndex > this.props.images.length - 1) {
                this.lastIndex = this.props.images.length - 1;
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
                };
            }

            return React.createElement(
                'div',
                { onClick: this.onChange(index), key: this.props.images[index] + ' ' + index, style: style },
                React.createElement('img', { src: this.props.images[index], style: { maxWidth: '100%', maxHeight: '68px' } })
            );
        }.bind(this));

        return React.createElement(
            'div',
            { style: { float: 'left', width: '482px' } },
            React.createElement(
                'div',
                {
                    style: { lineHeight: '277px', width: '438px', height: '277px', margin: '0 auto', textAlign: 'center', backgroundColor: '#f3f3f3' } },
                React.createElement('img', { src: this.props.images[this.state.currentIndex], style: { maxWidth: '100%', maxHeight: '100%' } })
            ),
            React.createElement(
                'div',
                {
                    style: { position: 'relative', width: '438px', height: '70px', margin: '0 auto', marginTop: '25px', backgroundColor: 'white' } },
                React.createElement(
                    'div',
                    { onClick: this.onPre,
                        style: { cursor: 'pointer', left: '0px', top: '0px', position: 'absolute', height: '70px', width: '18px', lineHeight: '70px', textAlign: 'center' } },
                    React.createElement('img', { src: '../static/images/common/left.png',
                        style: { maxWidth: '100%', maxHeight: '100%', marginTop: 20 } })
                ),
                React.createElement(
                    'div',
                    { style: { position: 'absolute', left: '20px', right: '20px', height: '70px', top: '0px' } },
                    nodes
                ),
                React.createElement(
                    'div',
                    { onClick: this.onNext,
                        style: { cursor: 'pointer', right: '0px', top: '0px', position: 'absolute', height: '70px', width: '18px', lineHeight: '70px', textAlign: 'center' } },
                    React.createElement('img', { src: '../static/images/common/right.png',
                        style: { maxWidth: '100%', maxHeight: '100%', marginTop: 20 } })
                )
            ),
            React.createElement('div', {
                style: { width: '438px', height: '1px', margin: '0 auto', marginTop: '25px', backgroundColor: '#f3f3f3' } })
        );
    }
});

var Selector = React.createClass({
    displayName: 'Selector',


    getDefaultProps: function getDefaultProps() {
        return {
            items: []
        };
    },

    getInitialState: function getInitialState() {
        return {
            currentIndex: !!this.props.currentIndex ? this.props.currentIndex : 0
        };
    },

    componentDidUpdate: function componentDidUpdate() {
        if (!this.flag) {
            if (!!this.props.callbackSetValue) {
                this.props.callbackSetValue(this.state.currentIndex);
                this.flag = true;
            }
        }
    },
    componentWillMount: function componentWillMount() {
        this.flag = false;
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

    onChange: function onChange(index) {
        return function () {
            this.setState({ currentIndex: index });
            this.flag = false;
        }.bind(this);
    },

    render: function render() {
        var nodes = this.props.items.map(function (item, index) {

            var style = this.state.currentIndex == index ? this.styles.spanSelect : this.styles.span;

            return React.createElement(
                'span',
                { key: item + ' ' + index,
                    style: style, onClick: this.onChange(index) },
                item
            );
        }.bind(this));

        return React.createElement(
            'div',
            { style: { display: 'inline' } },
            nodes
        );
    }
});

var NumberSelector = React.createClass({
    displayName: 'NumberSelector',


    getInitialState: function getInitialState() {
        return {
            number: 1,
            currentItem: ''
        };
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

    onAdd: function onAdd(value) {
        return function () {
            var nextNumber = this.state.number + value;
            if (nextNumber < 1) {
                nextNumber = 1;
            }
            this.setState({ number: nextNumber });
            if (!!this.props.callbackParent) {
                this.props.callbackParent(nextNumber);
            }
        }.bind(this);
    },

    render: function render() {
        return React.createElement(
            'div',
            { style: { display: 'inline', marginLeft: '12px' } },
            React.createElement(
                'span',
                { style: this.styles.operations, onClick: this.onAdd(-1) },
                '-'
            ),
            React.createElement(
                'span',
                { style: this.styles.number },
                this.state.number
            ),
            React.createElement(
                'span',
                { style: this.styles.operations, onClick: this.onAdd(1) },
                '+'
            )
        );
    }
});

var ComboBox = React.createClass({
    displayName: 'ComboBox',


    getInitialState: function getInitialState() {
        return {
            currentIndex: !!this.props.currentIndex ? this.props.currentIndex : 0,
            show: false
        };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            items: []
        };
    },

    componentDidUpdate: function componentDidUpdate() {
        if (!this.flag) {
            if (!!this.props.callbackSetValue) {
                this.props.callbackSetValue(this.state.currentIndex);
                this.flag = true;
            }
        }
    },
    componentWillMount: function componentWillMount() {
        this.flag = false;
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

    onToggle: function onToggle() {
        this.setState({ show: !this.state.show });
    },

    onChange: function onChange(index) {
        return function () {
            this.setState({ currentIndex: index, show: false });

            this.flag = false;
        }.bind(this);
    },

    render: function render() {

        var ulStyle = this.state.show ? this.styles.ulShow : this.styles.ulHidden;

        var nodes = this.props.items.map(function (item, index) {
            return React.createElement(
                'li',
                { key: index, style: this.styles.li, onClick: this.onChange(index) },
                item
            );
        }.bind(this));

        return React.createElement(
            'div',
            { style: { float: 'left', height: '40px', position: 'relative' } },
            React.createElement(
                'div',
                { onClick: this.onToggle,
                    style: { cursor: 'pointer', border: '1px solid #f3f3f3', padding: '8px', backgroundColor: 'white' } },
                React.createElement(
                    'span',
                    null,
                    this.props.items[this.state.currentIndex]
                ),
                React.createElement(
                    'span',
                    null,
                    '  ▼'
                )
            ),
            React.createElement(
                'ul',
                { style: ulStyle },
                nodes
            )
        );
    }
});

var DetailHelp = React.createClass({
    displayName: 'DetailHelp',
    jumpMyCredit: function jumpMyCredit() {
        window.location.href = 'my-credit.html';
    },

    render: function render() {
        return React.createElement(
            'div',
            { style: { float: 'left', width: '220px' } },
            React.createElement(
                'div',
                { style: { width: '145px', margin: '0 auto' } },
                React.createElement('img', { src: '../static/images/goods/tips.png', width: '100%', style: { maxHeight: '150px' } }),
                React.createElement('input', { type: 'button', value: '立即提额', onClick: this.jumpMyCredit,
                    style: { backgroundColor: '#FF6980',
                        borderWidth: '0px',
                        color: 'white',
                        height: '35px',
                        display: 'block',
                        width: '125px',
                        margin: '0 auto',
                        marginTop: '25px' } }),
                React.createElement('div', {
                    style: { height: '1px', backgroundColor: '#f3f3f3', width: '125px', margin: '0 auto', marginTop: '35px', marginBottom: '35px' } }),
                React.createElement('img', { src: '../static/images/goods/tips2.png', width: '100%', style: { maxHeight: '150px' } }),
                React.createElement('div', {
                    style: { height: '1px', backgroundColor: '#f3f3f3', width: '125px', margin: '0 auto', marginTop: '35px', marginBottom: '35px' } }),
                React.createElement('input', { type: 'button', value: '联系客服', style: { backgroundColor: 'white',
                        borderWidth: '0px',
                        color: '#FF6980',
                        height: '35px',
                        display: 'block',
                        width: '125px',
                        margin: '0 auto',
                        marginTop: '25px',
                        border: '1px solid #FF6980' } }),
                React.createElement('div', { style: { height: '25px' } }),
                React.createElement(
                    'div',
                    { style: { fontSize: '12px', color: '#737373', textAlign: 'center' } },
                    '客服电话:400-711-8898'
                ),
                React.createElement(
                    'div',
                    { style: { fontSize: '12px', color: '#737373', textAlign: 'center' } },
                    '工作日:9:00-21:00'
                ),
                React.createElement(
                    'div',
                    { style: { fontSize: '12px', color: '#737373', textAlign: 'center' } },
                    '工作日:10:00-17:00'
                )
            )
        );
    }
});

var ReactSku = React.createClass({
    displayName: 'ReactSku',

    getDefaultProps: function getDefaultProps() {
        return {
            types: [],
            items: []
        };
    },
    getInitialState: function getInitialState() {
        return {
            keyMap: [],
            selected: [],
            keys: []
        };
    },
    componentWillMount: function componentWillMount() {
        this.key_account_Map = [];
    },

    initKeyMap: function initKeyMap(skuData) {
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
        return _keyMap;
    },
    /**
     * 过滤数组
     * @param a
     * @param predicate
     * @returns {Array}
     */
    filter: function filter(a, predicate) {
        var results = [];
        a.forEach(function (value, index) {
            if (predicate(value, index)) results.push(value);
        });
        return results;
    },
    getIndex: function getIndex(key) {
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
    unique: function unique(a) {
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
    getSkuList: function getSkuList(obj) {
        var array = [];
        var key = '';
        if (!obj) $log.error('input sku-data error!');
        if (!!obj.forEach) {
            obj.forEach(function (value, key) {
                array.push(key.split('#'));
            });
        } else {
            for (key in obj) {
                array.push(key.split('#'));
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
    transpose: function transpose(a) {
        var w = a.length ? a.length : 0,
            h = a[0] instanceof Array ? a[0].length : 0;
        if (h === 0 || w === 0) {
            return [];
        }
        var i,
            j,
            t = [];
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
    getKeys: function getKeys(obj) {
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
    getPrice: function getPrice(key, data) {
        var result = 0,
            i,
            j,
            m,
            items,
            n = [];

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
                    if (!!result && result < newPrice) {} else {
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
    getStoreId: function getStoreId(key, data) {
        var result = 0,
            i,
            j,
            m,
            items,
            n = [];

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

    onChange: function onChange(index) {
        return function () {
            this.setState({ currentIndex: index });
            if (!!this.props.callbackParent) {
                this.props.callbackParent(index);
            }
        }.bind(this);
    },

    onSelect: function onSelect(event) {
        var length = 0;
        for (var x in this.state.keyMap) {
            length++;
        }
        var check = [];
        if (length == 0) {
            var x = 0;
            for (var temp in this.props.items) {
                x++;
            }
            if (this.count != 1 && x != 0) {
                this.setState({ keyMap: this.initKeyMap(this.props.items) });
                this.count = 1;
            }
            return;
        }

        if (!event) {
            return;
        }
        if (this.state.keyMap[event.target.innerHTML].disabled) return;
        this.checkItem(event.target.innerHTML);

        check = this.filter(this.state.selected, function (value, index) {
            return value;
        });

        // fire callback
        this.props.cxt.getGoodsInfo(this.getStoreId(check.join('#'), this.props.items), this.getPrice(check.join('#'), this.props.items));
    },

    checkItem: function checkItem(currentKey) {
        var _this = this;
        var keyMap = this.state.keyMap,
            copy = [],
            check = [],
            index = this.getIndex(currentKey),
            selected = this.state.selected;

        if (index === -1) {
            $log.error('key is undefiend!');
            return;
        }
        // 维护selected数组

        selected[index] = this.state.selected[index] === currentKey ? void 0 : currentKey;
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
        this.setState({ keyMap: keyMap, selected: selected });
    },

    render: function render() {
        var _thisAll = this;
        var x = 0;
        for (var k in this.props.items) {
            x++;
        }
        if (this.count != 1 && x != 0) {
            setTimeout(function () {
                _thisAll.onSelect();
            }, 0);
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
                return React.createElement(
                    'span',
                    { key: subItem + ' ' + subIndex,
                        style: style, onClick: _this.onSelect },
                    subItem.combinationName
                );
            });

            return React.createElement(
                'div',
                { key: item + ' ' + index },
                React.createElement(
                    'span',
                    { style: { marginLeft: 12 } },
                    item.combinationTypeName
                ),
                items
            );
        }.bind(this));

        return React.createElement(
            'div',
            { style: { display: 'inline' } },
            nodes
        );
    }
});

var DetailOrder = React.createClass({
    displayName: 'DetailOrder',

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
    getInitialState: function getInitialState() {
        return {
            kinds: [],
            mounts: [],
            insurance: [],
            percent: [],
            goodsInfo: {},
            goodsTypes: [],
            goodsItems: [],
            isInsuranceBuy: true,
            selectedFirstPayNo: 0,
            selectedStagingNo: 0
        };
    },

    getGoodsInfo: function getGoodsInfo(conbinationId, price) {
        var _this2 = this;

        if (!!conbinationId) {
            this.setState({
                storeGoodsCombinationId: conbinationId,
                orderPrice: price
            });
        } else {
            this.setState({
                storeGoodsCombinationId: null,
                orderPrice: null
            });
        }

        var goodsId = this.getQueryString('goodsId');
        $.ajax({
            type: 'post',
            url: '/pc/computer/query_goods_staging_order',
            data: { goodsId: goodsId, storeGoodsCombinationId: conbinationId },
            dataType: 'json',
            success: function success(res) {
                console.log(res);
                if (res.result == 0) {
                    _this2.goodsInfo = res.data;
                    _this2.setState({
                        mounts: res.data.goodsStagingInfoResponse.fenqiConfigList,
                        insurance: res.data.goodsStagingInfoResponse.insuranceAmountList,
                        percent: res.data.goodsStagingInfoResponse.fenqiShowfuInfoList,
                        hospitalInfo: res.data.goodsStagingInfoResponse.hospital,
                        goodsInfo: res.data.goodsStagingInfoResponse.goodsDetailsInfo,
                        goodsTypes: res.data.combinationTypeInfoList,
                        goodsItems: res.data.goodsCombinationExtMap,
                        goodsDetail: res.data.goodsStagingInfoResponse.goodsDetailsInfo.goodsDetailUrlList
                    });
                }
            }
        });
    },
    componentWillMount: function componentWillMount() {
        this.getGoodsInfo();
    },
    getQueryString: function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    percentChanged: function percentChanged(index) {
        console.log(index);
    },
    mountsChanged: function mountsChanged(index) {
        console.log(index);
    },
    numberChanged: function numberChanged(num) {
        console.log(num);
    },
    setInsurance: function setInsurance(value) {
        if (!!this.goodsInfo) {
            if (value > 0) {
                console.log('选择了' + this.goodsInfo.goodsStagingInfoResponse.insuranceAmountList[value - 1].price + '元保险');
                this.setState({
                    selectedInsurance: this.goodsInfo.goodsStagingInfoResponse.insuranceAmountList[value - 1].price,
                    isInsuranceBuy: true
                });
            } else if (value == 0) {
                console.log('不买保险');
                this.setState({
                    isInsuranceBuy: false
                });
            }
        }
    },
    setFirstPayRatio: function setFirstPayRatio(value) {
        if (!!this.goodsInfo) {
            console.log('选择了' + this.goodsInfo.goodsStagingInfoResponse.fenqiShowfuInfoList[value].ratio + '比例的首付，id为' + this.goodsInfo.goodsStagingInfoResponse.fenqiShowfuInfoList[value].shoufuId);
            this.setState({
                selectedFirstPay: this.goodsInfo.goodsStagingInfoResponse.fenqiShowfuInfoList[value].shoufuId,
                selectedFirstPayValue: this.goodsInfo.goodsStagingInfoResponse.fenqiShowfuInfoList[value].ratio,
                selectedFirstPayNo: value
            });
        }
    },
    setStaging: function setStaging(value) {
        if (!!this.goodsInfo) {
            console.log('选择了分' + this.goodsInfo.goodsStagingInfoResponse.fenqiConfigList[value].staging + '期，id为' + this.goodsInfo.goodsStagingInfoResponse.fenqiConfigList[value].configId);
            this.setState({
                selectedStaging: this.goodsInfo.goodsStagingInfoResponse.fenqiConfigList[value].configId,
                selectedStagingValue: this.goodsInfo.goodsStagingInfoResponse.fenqiConfigList[value].staging,
                selectedStagingNo: value
            });
        }
    },
    createOrder: function createOrder() {
        if (!this.goodsInfo) {
            return;
        }
        var orderData = {};
        if (this.goodsInfo.combinationList.length != 0) {
            if (!this.state.storeGoodsCombinationId) {
                alert('请先选择完整的商品属性');
                return;
            } else {
                orderData = {
                    goodsId: this.getQueryString('goodsId'),
                    orderName: this.goodsInfo.goodsStagingInfoResponse.goodsDetailsInfo.storeGoods.goodsName,
                    isInsuranceBuy: this.state.isInsuranceBuy,
                    insuranceAmount: this.state.selectedInsurance,
                    configId: this.state.selectedStaging,
                    shoufuId: this.state.selectedFirstPay,
                    staging: this.state.selectedStagingValue,
                    shoufuMoney: this.state.selectedFirstPayValue,
                    goodsNumber: 1,
                    fenqiObj: this.getFenqiObj(),
                    storeGoodsCombinationId: this.state.storeGoodsCombinationId,
                    orderAmount: this.state.orderPrice,
                    orderPrice: this.state.orderPrice
                };
            }
        } else {
            orderData = {
                goodsId: this.getQueryString('goodsId'),
                orderName: this.goodsInfo.goodsStagingInfoResponse.goodsDetailsInfo.storeGoods.goodsName,
                isInsuranceBuy: this.state.isInsuranceBuy,
                insuranceAmount: this.state.selectedInsurance,
                configId: this.state.selectedStaging,
                shoufuId: this.state.selectedFirstPay,
                staging: this.state.selectedStagingValue,
                fenqiObj: this.getFenqiObj(),
                shoufuMoney: this.state.selectedFirstPayValue,
                orderPrice: this.state.orderPrice,
                goodsNumber: 1,
                orderAmount: this.goodsInfo.goodsStagingInfoResponse.goodsDetailsInfo.storeGoods.shopPrice
            };
        }
        window.localStorage.orderData = JSON.stringify(orderData);
        window.location.href = 'order-ensure.html';
    },
    getFenqiObj: function getFenqiObj() {
        var a = null;
        if (!!this.goodsInfo) {
            var _this = this;
            this.goodsInfo.goodsStagingInfoResponse.fenqiObj.forEach(function (item) {
                if (item.paymentId == _this.state.selectedStagingValue && item.shoufuId == _this.state.selectedFirstPayValue) {
                    a = item;
                }
            });
        }
        return a;
    },


    render: function render() {

        var hotItems = [{
            img: 'http://img2.imgtn.bdimg.com/it/u=3260548700,3238345600&fm=21&gp=0.jpg',
            detail: '商品详情',
            price: '$255'
        }, {
            img: 'http://img2.imgtn.bdimg.com/it/u=3260548700,3238345600&fm=21&gp=0.jpg',
            detail: '商品详情',
            price: '$255'
        }, {
            img: 'http://img2.imgtn.bdimg.com/it/u=3260548700,3238345600&fm=21&gp=0.jpg',
            detail: '商品详情',
            price: '$255'
        }, {
            img: 'http://img2.imgtn.bdimg.com/it/u=3260548700,3238345600&fm=21&gp=0.jpg',
            detail: '商品详情',
            price: '$255'
        }];

        var kinds = ['全切双眼皮', '全切双眼皮', '全切双眼皮', '全切双眼皮', '全切双眼皮'];

        var mounts = [];
        var insurance = ['不购买'];
        var percent = [];
        var images = ['', '', '', ''];
        var goodsDetail = '';
        var hospitalInfo = '';
        if (!!this.state.hospitalInfo) {
            hospitalInfo = this.state.hospitalInfo;
        }
        if (!!this.state.goodsDetail) {
            goodsDetail = this.state.goodsDetail.map(function (item, index) {
                return React.createElement('img', { src: item, key: index, style: { width: '100%' } });
            });
        }

        this.state.insurance.forEach(function (item) {
            insurance.push(item.price);
        });
        this.state.mounts.forEach(function (item) {
            mounts.push(item.staging);
        });
        //var insurance = this.state.insurance;
        this.state.percent.forEach(function (item) {
            percent.push(item.ratio);
        });

        if (!!this.state.goodsInfo.coverPic) {
            images = this.state.goodsInfo.coverPic;
        }

        return React.createElement(
            'div',
            null,
            React.createElement(DetailPreview, { images: images }),
            React.createElement(
                'div',
                { style: { float: 'left', width: '495px' } },
                React.createElement(
                    'span',
                    {
                        style: { color: 'black', fontSize: '18px' } },
                    !!this.state.goodsInfo.storeGoods ? this.state.goodsInfo.storeGoods.goodsName : ''
                ),
                React.createElement('div', { style: { height: '16px' } }),
                React.createElement(
                    'div',
                    { style: { color: '#646464' } },
                    React.createElement(
                        'span',
                        { style: { paddingLeft: '12px' } },
                        '商品价格'
                    ),
                    React.createElement(
                        'span',
                        null,
                        '    '
                    ),
                    React.createElement(
                        'span',
                        {
                            style: { color: '#FF6980', fontSize: '30px' } },
                        '￥',
                        !!this.state.goodsInfo.storeGoods ? !!this.state.orderPrice ? this.state.orderPrice : this.state.goodsInfo.storeGoods.shopPrice : ''
                    ),
                    React.createElement(
                        'span',
                        null,
                        '    '
                    ),
                    React.createElement(
                        'span',
                        {
                            style: { textDecoration: 'line-through' } },
                        '￥',
                        !!this.state.goodsInfo.storeGoods ? this.state.goodsInfo.storeGoods.marketPrice : ''
                    ),
                    React.createElement('div', { style: { border: '1px dashed #FF6980', marginLeft: '12px' } }),
                    React.createElement('div', { style: { height: '8px' } }),
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'span',
                            { style: { paddingLeft: '12px', fontWeight: 'bold', fontSize: '18px' } },
                            '选择规格'
                        ),
                        React.createElement(ReactSku, { cxt: this, types: !!this.state.goodsTypes ? this.state.goodsTypes : [],
                            items: this.state.goodsItems })
                    ),
                    React.createElement('div', { style: { height: '8px' } }),
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'div',
                            {
                                style: { paddingLeft: '12px', float: 'left', marginRight: '12px', height: '40px', lineHeight: '50px' } },
                            '选择保险(元)'
                        ),
                        React.createElement(Selector, { cxt: this, callbackSetValue: this.setInsurance, items: insurance,
                            currentIndex: '1' }),
                        React.createElement('div', { style: { clear: 'both' } })
                    ),
                    React.createElement('div', { style: { height: '8px' } }),
                    React.createElement(
                        'div',
                        { style: { backgroundColor: 'rgb(253, 251, 253)' } },
                        React.createElement(
                            'div',
                            { style: { fontSize: '18px', padding: '12px', fontWeight: 'bold' } },
                            React.createElement(
                                'span',
                                null,
                                '分期选择'
                            )
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                {
                                    style: { paddingLeft: '12px', float: 'left', marginRight: '12px', height: '40px', lineHeight: '40px' } },
                                '首付比例'
                            ),
                            React.createElement(ComboBox, { callbackSetValue: this.setFirstPayRatio, cxt: this, items: percent,
                                callbackParent: this.percentChanged }),
                            React.createElement('div', { style: { clear: 'both' } })
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'span',
                                { style: { paddingLeft: '12px' } },
                                '选择分期数(月)'
                            ),
                            React.createElement(Selector, { callbackSetValue: this.setStaging, cxt: this, items: mounts })
                        ),
                        React.createElement('div', { style: { height: '8px' } }),
                        !!this.state.firstPay ? React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                { style: { float: 'left', width: '50%' } },
                                React.createElement(
                                    'span',
                                    { style: { paddingLeft: '12px', paddingRight: '12px' } },
                                    '首付金额'
                                ),
                                React.createElement(
                                    'span',
                                    {
                                        style: { color: '#FF6980', fontSize: '18px' } },
                                    '￥',
                                    this.state.firstPay
                                )
                            ),
                            React.createElement(
                                'div',
                                { style: { float: 'right', width: '50%' } },
                                React.createElement(
                                    'span',
                                    { style: { paddingLeft: '12px', paddingRight: '12px' } },
                                    '月供'
                                ),
                                React.createElement(
                                    'span',
                                    {
                                        style: { color: '#FF6980', fontSize: '18px' } },
                                    '￥',
                                    this.state.monthlyPay
                                )
                            ),
                            React.createElement('div', { style: { clear: 'both' } }),
                            React.createElement('div', { style: { height: '12px' } })
                        ) : ''
                    ),
                    React.createElement('div', { style: { height: '12px' } }),
                    React.createElement(
                        'div',
                        null,
                        React.createElement('input', { type: 'button', onClick: this.createOrder,
                            value: '立即分期',
                            style: { border: '0px solid transparent',
                                width: '166px',
                                height: '48px',
                                fontSize: '18px',
                                backgroundColor: '#FF6980',
                                color: 'white' } })
                    )
                )
            ),
            React.createElement(DetailHelp, null),
            React.createElement('div', { style: { clear: 'both' } }),
            React.createElement('div', { style: { height: '16px' } }),
            React.createElement(
                'div',
                { style: this.styles.container },
                React.createElement(
                    'div',
                    { style: this.styles.leftPanel },
                    React.createElement(DetailTabs, { goodsDetail: goodsDetail, hospitalInfo: hospitalInfo })
                ),
                React.createElement('div', { style: this.styles.rightPanel })
            )
        );
    }
});

var R_DetailPage = React.createClass({
    displayName: 'R_DetailPage',

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
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement('div', { style: { height: '16px' } }),
            React.createElement(
                'div',
                { style: this.styles.container },
                React.createElement(
                    'div',
                    { style: this.styles.detail },
                    React.createElement(DetailOrder, null)
                )
            )
        );
    }
});