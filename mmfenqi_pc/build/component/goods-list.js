/**
 * Created by sheldon on 2016/7/25.
 */
'use strict';

var Pagination = React.createClass({
    displayName: 'Pagination',

    getInitialState: function getInitialState() {
        return {
            currentPage: 0
        };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            maxNumberOfDisplayPages: 10,
            numberOfPages: 20,
            onPage: function onPage(page) {
                console.log(page);
            }
        };
    },

    firstPage: -1,
    lastPage: -1,

    onPage: function onPage(page) {
        return function () {
            if (page >= 0 && page < this.props.numberOfPages) {
                this.props.onPage(page);
                this.setState({ currentPage: page });
            }
        }.bind(this);
    },

    goto: function goto() {
        var page = parseInt(this.refs.pageInput.value);
        this.onPage(page)();
    },

    render: function render() {
        if (this.firstPage == -1 || this.lastPage == -1 || Math.abs(this.state.currentPage - this.firstPage) < 1 || Math.abs(this.state.currentPage - this.lastPage) < 1 || this.state.currentPage < this.firstPage || this.state.currentPage > this.lastPage) {
            this.firstPage = this.state.currentPage - parseInt(this.props.maxNumberOfDisplayPages / 2);
            if (this.firstPage < 0) {
                this.firstPage = 0;
            }

            this.lastPage = this.firstPage + this.props.maxNumberOfDisplayPages;
            if (this.lastPage > this.props.numberOfPages - 1) {
                this.lastPage = this.props.numberOfPages - 1;
            }

            if (this.lastPage - this.firstPage + 1 < this.props.maxNumberOfDisplayPages) {
                this.firstPage = this.lastPage - this.props.maxNumberOfDisplayPages + 1;
                if (this.firstPage < 0) {
                    this.firstPage = 0;
                }
            }
        }
        var pages = [];
        pages.push({ text: "首页", page: 0 });
        pages.push({ text: '上一页', page: this.state.currentPage - 1 });
        for (var page = this.firstPage; page <= this.lastPage; page++) {
            var text = page + 1;
            if (page == this.firstPage && this.firstPage > 0) {
                text = '...';
            }

            if (page == this.lastPage && this.lastPage < this.props.numberOfPages - 1) {
                text = '...';
            }

            pages.push({ text: text, page: page });
        }
        pages.push({ text: '下一页', page: this.state.currentPage + 1 });
        pages.push({ text: '最后一页', page: this.props.numberOfPages - 1 });

        var nodes = pages.map(function (item, index) {
            var style = {
                marginRight: '4px',
                textAlign: 'center',
                minWidth: '30px',
                cursor: 'pointer',
                display: 'inline-block',
                border: '1px solid #f3f3f3',
                backgroundColor: 'rgb(248,249,250)',
                padding: '4px'
            };
            if (item.page == this.state.currentPage && parseInt(item.text) == item.page + 1) {
                style = {
                    backgroundColor: 'rgb(233,113,125)',
                    marginRight: '4px',
                    textAlign: 'center',
                    minWidth: '30px',
                    cursor: 'pointer',
                    display: 'inline-block',
                    color: 'white',
                    border: '1px solid #f3f3f3',
                    padding: '4px'
                };
            }
            return React.createElement(
                'span',
                { onClick: this.onPage(item.page), key: item + ' ' + index, style: style },
                item.text
            );
        }.bind(this));
        return React.createElement(
            'div',
            null,
            nodes,
            React.createElement(
                'span',
                null,
                '  共',
                this.props.numberOfPages,
                '页'
            ),
            React.createElement(
                'span',
                null,
                '  转到  '
            ),
            React.createElement('input', { ref: 'pageInput',
                type: 'text',
                style: { cursor: 'pointer',
                    textAlign: 'center',
                    backgroundColor: 'rgb(248,249,250)',
                    border: '1px solid #f3f3f3',
                    width: '45px',
                    padding: '4px' } }),
            React.createElement(
                'span',
                null,
                '  页  '
            ),
            React.createElement('input', { type: 'button',
                onClick: this.goto,
                value: '确定',
                style: { backgroundColor: 'rgb(233,113,125)', color: 'white', border: '0px solid transparent', padding: '12px' } })
        );
    }
});

var Filter = React.createClass({
    displayName: 'Filter',


    getInitialState: function getInitialState() {
        return {
            currentIndex: 0
        };
    },

    componentDidMount: function componentDidMount() {
        this.props.cxt.addRemoveConditionListener(function (key, value) {
            if (key == this.props.label) {
                this.setState({ currentIndex: 0 });
            }
        }.bind(this));
    },

    onChange: function onChange(index) {
        return function () {
            this.setState({ currentIndex: index });
            this.props.cxt.onFilterChange(this.props.label, this.props.items[index]);
            this.props.cxt.setQueryCondition(this.props.label, this.props.queryName, index);
        }.bind(this);
    },

    render: function render() {
        var nodes = this.props.items.map(function (item, index) {
            var style = { display: 'inline-block', paddingRight: '12px', paddingBottom: '12px', cursor: 'pointer' };
            if (index == this.state.currentIndex) {
                style = {
                    display: 'inline-block',
                    paddingRight: '12px',
                    paddingBottom: '12px',
                    cursor: 'pointer',
                    color: 'rgb(233,113,125)',
                    lineHeight: '35px',
                    paddingLeft: '2px'
                };
            }
            return React.createElement(
                'span',
                { key: item + ' ' + index, style: style, onClick: this.onChange(index) },
                item
            );
        }.bind(this));

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { style: { width: '5%', float: 'left' } },
                React.createElement(
                    'span',
                    {
                        style: { paddingRight: '12px', paddingBottom: '12px', color: '#a4a4a4', lineHeight: '35px' } },
                    this.props.label
                )
            ),
            React.createElement(
                'div',
                { style: { width: '95%', float: 'left' } },
                nodes
            ),
            React.createElement('div', { style: { clear: 'both' } })
        );
    }
});

var DoubleFilter = React.createClass({
    displayName: 'DoubleFilter',


    getInitialState: function getInitialState() {
        return {
            currentIndex: -1
        };
    },

    componentDidMount: function componentDidMount() {
        this.props.cxt.addRemoveConditionListener(function (key, value) {
            if (key == this.props.typeName) {
                this.setState({ currentIndex: -1 });
            }
        }.bind(this));
    },

    onChange: function onChange(index, name, callbackId) {
        return function () {
            this.setState({ currentIndex: index });
            this.props.cxt.onFilterChange(this.props.typeName, name);
            this.props.cxt.setQueryCondition(this.props.typeName, this.props.callbackId, callbackId);
        }.bind(this);
    },

    render: function render() {
        var nodes = this.props.items.map(function (item, index) {
            var style = { display: 'inline-block', paddingRight: '12px', paddingBottom: '12px', cursor: 'pointer' };
            if (index == this.state.currentIndex) {
                style = {
                    display: 'inline-block',
                    paddingRight: '12px',
                    paddingBottom: '12px',
                    cursor: 'pointer',
                    color: 'rgb(233,113,125)'
                };
            }
            return React.createElement(
                'div',
                { className: 'filterCont', key: index },
                React.createElement(
                    'span',
                    { className: 'filterNow' },
                    React.createElement(
                        'em',
                        { style: style },
                        item[this.props.typeName]
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'filterItem' },
                    React.createElement(
                        'p',
                        null,
                        item[this.props.subTypeName].map(function (subItem, subIndex) {
                            return React.createElement(
                                'a',
                                { key: subIndex, onClick: this.onChange(index, subItem[this.props.subItemName], subItem[this.props.subItemId]) },
                                React.createElement(
                                    'span',
                                    null,
                                    subItem[this.props.subItemName]
                                )
                            );
                        }.bind(this))
                    )
                )
            );
        }.bind(this));

        return React.createElement(
            'div',
            { className: 'ft-logo' },
            React.createElement(
                'div',
                { style: { float: 'left', lineHeight: '35px', color: '#999', paddingRight: '30px' } },
                this.props.kindName
            ),
            React.createElement(
                'div',
                { className: 'filterCont' },
                React.createElement(
                    'span',
                    { className: 'filterNow' },
                    React.createElement(
                        'em',
                        { style: this.state.currentIndex == -1 ? {
                                display: 'inline-block',
                                paddingRight: '12px',
                                paddingBottom: '12px',
                                cursor: 'pointer',
                                color: 'rgb(233,113,125)'
                            } : { display: 'inline-block', paddingRight: '12px', paddingBottom: '12px', cursor: 'pointer' }, onClick: this.onChange(-1, '不限') },
                        '不限'
                    )
                )
            ),
            nodes,
            React.createElement('div', { style: { clear: 'both' } })
        );
    }
});

var Conditions = React.createClass({
    displayName: 'Conditions',


    getDefaultProps: function getDefaultProps() {
        return {
            conditions: {}
        };
    },

    onConditionsChange: function onConditionsChange(key, value) {
        return function () {
            this.props.cxt.onConditionsChanged(key, value);
            this.props.cxt.clearQueryCondition(key);
        }.bind(this);
    },

    render: function render() {

        var items = [];

        for (var key in this.props.conditions) {
            if (this.props.conditions[key] != '不限') {
                items.push({ key: key, value: this.props.conditions[key] });
            }
        }

        var nodes = items.map(function (item, index) {

            var style = {
                display: 'inline-block',
                padding: '2px',
                paddingLeft: '8px',
                paddingRight: '8px',
                border: '1px solid rgb(233,113,125)',
                color: 'rgb(233,113,125)',
                cursor: 'pointer'
            };
            if (index > 0) {
                style = {
                    display: 'inline-block',
                    padding: '2px',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    border: '1px solid rgb(233,113,125)',
                    color: 'rgb(233,113,125)',
                    cursor: 'pointer',
                    marginLeft: '5px'
                };
            }
            return React.createElement(
                'span',
                { key: item + ' ' + index, style: style,
                    onClick: this.onConditionsChange(item.key, item.value) },
                item.value,
                '     X'
            );
        }.bind(this));

        return React.createElement(
            'div',
            { style: { marginTop: '10px' } },
            React.createElement(
                'div',
                { style: { width: '5%', float: 'left' } },
                React.createElement(
                    'span',
                    {
                        style: { display: 'inline-block', padding: '4px', paddingLeft: '0px', color: '#a4a4a4' } },
                    '条件'
                )
            ),
            React.createElement(
                'div',
                { style: { width: '95%', float: 'left' } },
                nodes
            ),
            React.createElement('div', { style: { clear: 'both' } })
        );
    }
});

var ProjectList = React.createClass({
    displayName: 'ProjectList',

    styles: {
        list: {
            width: '100%',
            border: '1px solid #f3f3f3',
            marginTop: '12px'
        },
        header: {
            height: '40px',
            backgroundColor: 'rgb(249, 250, 251)',
            borderBottom: '1px solid #f3f3f3'
        },
        body: {
            width: '100%',
            padding: '12px'
        },
        item: {
            height: '118px',
            position: 'relative',
            cursor: 'pointer'
        },
        itemImg: {
            width: '181px',
            textAlign: 'center',
            height: '100%',
            lineHeight: '118px',
            position: 'absolute',
            left: '0px',
            top: '0px'
        },
        itemContent: {
            left: '181px',
            top: '0px',
            right: '0px',
            bottom: '0px',
            position: 'absolute',
            paddingLeft: '12px'
        }
    },

    getInitialState: function getInitialState() {
        return {
            currentIndex: 0
        };
    },

    onTabChange: function onTabChange(index) {
        return function () {
            this.setState({ currentIndex: index });
            this.props.cxt.setQueryCondition('排序方式', 'sortId', index + 1);
        }.bind(this);
    },

    goToDetail: function goToDetail(id) {
        window.location.href = 'goods-detail.html?goodsId=' + id;
    },


    render: function render() {
        var items = ['销量', '价格', '最新上架'];
        var tabs = items.map(function (item, index) {
            var style = {
                borderRight: '1px solid #e3e3e3',
                display: 'inline-block',
                height: '100%',
                lineHeight: '40px',
                paddingLeft: '12px',
                cursor: 'pointer',
                paddingRight: '12px'
            };
            if (this.state.currentIndex == index) {
                style = {
                    borderRight: '1px solid #e3e3e3',
                    display: 'inline-block',
                    height: '100%',
                    lineHeight: '40px',
                    paddingLeft: '12px',
                    cursor: 'pointer',
                    backgroundColor: 'white',
                    paddingRight: '12px'
                };
            }
            return React.createElement(
                'span',
                { key: item + ' ' + index, style: style, onClick: this.onTabChange(index) },
                item
            );
        }.bind(this));

        var items = [];
        for (var i = 0; i < this.props.items.length; i++) {
            items.push(this.props.items[i]);
            if (i != this.props.items.length - 1) {
                items.push({});
            }
        }
        var nodes = items.map(function (item, index) {
            if (index % 2 == 1) {
                return React.createElement('div', { style: { backgroundColor: '#f3f3f3', height: '1px', marginTop: '12px', marginBottom: '12px' },
                    key: index });
            } else {
                return React.createElement(
                    'div',
                    { style: this.styles.item, key: index },
                    React.createElement(
                        'div',
                        { style: this.styles.itemImg },
                        React.createElement(
                            'a',
                            { href: 'goods-detail.html?goodsId=' + item.goodsHerf, target: '_Blank' },
                            React.createElement('img', { src: item.goodsHerPic, style: { maxWidth: '100%', maxHeight: '100%' } })
                        )
                    ),
                    React.createElement(
                        'div',
                        { style: this.styles.itemContent },
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'a',
                                { href: 'goods-detail.html?goodsId=' + item.goodsHerf, target: '_Blank' },
                                React.createElement(
                                    'span',
                                    { style: { fontSize: '18px' } },
                                    item.hotItemName
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { style: { marginTop: '12px' } },
                            React.createElement(
                                'a',
                                { href: 'goods-detail.html?goodsId=' + item.goodsHerf, target: '_Blank' },
                                React.createElement(
                                    'span',
                                    { style: { color: '#a3a3a3' } },
                                    item.hospitalName
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { style: { position: 'absolute', bottom: '0px' } },
                            React.createElement(
                                'a',
                                { href: 'goods-detail.html?goodsId=' + item.goodsHerf, target: '_Blank' },
                                React.createElement(
                                    'span',
                                    {
                                        style: { color: 'rgb(233,113,125)', fontSize: '25px' } },
                                    item.presentPrice
                                ),
                                React.createElement(
                                    'span',
                                    { style: { color: '#a3a3a3' } },
                                    '    医院价格: '
                                ),
                                React.createElement(
                                    'span',
                                    {
                                        style: { color: '#a3a3a3', textDecoration: 'line-through' } },
                                    item.marketPrice
                                )
                            )
                        )
                    )
                );
            }
        }.bind(this));

        return React.createElement(
            'div',
            { style: this.styles.list },
            React.createElement(
                'div',
                { style: this.styles.header },
                tabs
            ),
            React.createElement(
                'div',
                { style: this.styles.body },
                nodes
            )
        );
    }
});

var R_ProjectListPage = React.createClass({
    displayName: 'R_ProjectListPage',


    styles: {
        container: {
            position: 'relative',
            width: '1200px',
            margin: '0 auto'
        },
        row: {
            width: '100%'
        },

        filter: {
            width: '100%',
            border: '1px solid #f3f3f3',
            padding: '12px',
            marginTop: '12px'
        }
    },

    getInitialState: function getInitialState() {
        return {
            conditions: {},
            list: {},
            areas: []
        };
    },

    clearQueryCondition: function clearQueryCondition(key) {
        if (!this.queryCondition[key]) {
            this.queryCondition[key] = {};
        }
        this.queryCondition[key] = {};
        this.queryGoodsList();
    },

    merge: function merge(obj1, obj2) {
        var obj3 = {};
        for (var attr in obj1) {
            obj3[attr] = obj1[attr];
        }
        for (var attr in obj2) {
            obj3[attr] = obj2[attr];
        }
        return obj3;
    },

    onFilterChange: function onFilterChange(key, value) {
        var obj = {};
        obj[key] = value;
        this.setState({ conditions: this.merge(this.state.conditions, obj) });
        setTimeout(function () {
            console.log(this.state.conditions);
        }.bind(this), 0);
    },

    removeConditionListers: [],

    addRemoveConditionListener: function addRemoveConditionListener(cb) {
        this.removeConditionListers.push(cb);
    },

    onConditionsChanged: function onConditionsChanged(key, value) {
        this.onFilterChange(key, '不限');
        this.removeConditionListers.forEach(function (item) {
            item(key, value);
        });
    },

    queryGoodsList: function queryGoodsList() {
        var _this = this;

        var data = {};
        for (var x in this.queryCondition) {
            data[this.queryCondition[x].name] = this.queryCondition[x].value;
        }
        $.ajax({
            type: 'post',
            url: '/pc/computer/query_searchGoodsList_condition_pc',
            data: data,
            dataType: 'json',
            success: function success(res) {
                if (res.result == 0) {
                    _this.setState({ list: res.data.goodsItemList, areas: res.data.provinceVOList, kinds: res.data.categoryList });
                }
                console.log(res);
            }
        });
    },


    setQueryCondition: function setQueryCondition(key, name, value) {
        if (!this.queryCondition[key]) {
            this.queryCondition[key] = {};
        }
        this.queryCondition[key]['name'] = name;
        this.queryCondition[key]['value'] = value;
        this.queryGoodsList();
    },

    componentWillMount: function componentWillMount() {
        this.queryCondition = { index: { name: 'index', value: 1 } };
        if (this.getUrlParam('categoryId') != null && this.getUrlParam('categoryName') != null) {
            this.onFilterChange('categoryName', this.getUrlParam('categoryName'));
            this.setQueryCondition('categoryName', 'categoryId', this.getUrlParam('categoryId'));
        }
        this.queryGoodsList();
    },
    getUrlParam: function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(decodeURI(r[2]));return null; //返回参数值
    },


    render: function render() {
        var list = this.state.list;
        return React.createElement(
            'div',
            { style: this.styles.container },
            React.createElement(
                'div',
                { style: this.styles.filter },
                React.createElement(DoubleFilter, { kindName: '地区', typeName: 'proname', subTypeName: 'cityList', subItemName: 'cityname', cxt: this,
                    items: !!this.state.areas ? this.state.areas : [], subItemId: 'cityid', callbackId: 'cityId' }),
                React.createElement(DoubleFilter, { kindName: '类别', typeName: 'categoryName', subTypeName: 'categoryList', subItemName: 'categoryName', cxt: this,
                    items: !!this.state.kinds ? this.state.kinds : [], subItemId: 'categoryId', callbackId: 'categoryId' }),
                React.createElement(Filter, { cxt: this, label: '价格', queryName: 'priceRange',
                    items: ['不限', '100-1000元', '1000-3000元', '3000-5000元', '5000-10000元', '1-2万', '2万以上'] }),
                React.createElement('div', { style: { height: '1px', width: '100%', backgroundColor: '#f3f3f3' } }),
                React.createElement(Conditions, { cxt: this, conditions: this.state.conditions })
            ),
            React.createElement(ProjectList, { cxt: this, items: list }),
            React.createElement(
                'div',
                { style: { marginTop: '12px', marginBottom: '12px' } },
                React.createElement(Pagination, null)
            )
        );
    }
});