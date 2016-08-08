'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_Combo = function (_React$Component) {
    _inherits(R_Combo, _React$Component);

    function R_Combo() {
        _classCallCheck(this, R_Combo);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(R_Combo).call(this));

        _this.state = {
            data: [],
            goodsMapList: [],
            item0: [],
            item1: [],
            item2: [],
            item00: [],
            item11: [],
            item22: [],
            goodsId0: [],
            goodsId1: [],
            goodsId2: []
        };
        return _this;
    }

    _createClass(R_Combo, [{
        key: 'http',
        value: function http(url, jsonData, cb) {
            $.ajax({
                type: 'post',
                url: url,
                data: jsonData,
                dataType: 'json',
                success: function success(res) {
                    if (res.result == 0) {
                        return cb(res);
                    } else if (res.result == 1013) {
                        alert(333);
                    }
                }
            });
        }
    }, {
        key: 'combo',
        value: function combo() {

            this.http('/pc/computer/query_netRedPack_pc', '', function (res) {

                console.log(res);

                this.setState({
                    data: res.data.orderList,
                    goodsMapList: res.data.goodsMapList,
                    item0: res.data.goodsMapList[0].goodsItemGroupList,
                    item1: res.data.goodsMapList[1].goodsItemGroupList,
                    item2: res.data.goodsMapList[2].goodsItemGroupList,

                    item00: res.data.goodsMapList[0].netRedGoodsItem,
                    item11: res.data.goodsMapList[1].netRedGoodsItem,
                    item22: res.data.goodsMapList[2].netRedGoodsItem,

                    goodsId0: res.data.goodsMapList[0].goodsId,
                    goodsId1: res.data.goodsMapList[1].goodsId,
                    goodsId2: res.data.goodsMapList[2].goodsId

                });
            }.bind(this));
        }
    }, {
        key: 'timeStamp2String',
        value: function timeStamp2String(time) {
            var datetime = new Date();
            datetime.setTime(time);
            var year = datetime.getFullYear();
            var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
            var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
            var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
            var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
            var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
            return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.combo();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var goodsMapList = this.state.goodsMapList;

            for (var i = 0; i < goodsMapList.length; i++) {}

            console.log(this.state.item0);
            console.log(this.state.item1);
            console.log(this.state.item2);

            var goodsId0 = this.state.goodsId0;
            var goodsId1 = this.state.goodsId1;
            var goodsId2 = this.state.goodsId2;

            return React.createElement(
                'div',
                { className: 'combo-main' },
                React.createElement('div', { className: 'main' }),
                React.createElement(
                    'div',
                    { className: 'one-g' },
                    React.createElement(
                        'div',
                        { className: 'one-main' },
                        React.createElement(
                            'div',
                            { className: 'main-content' },
                            React.createElement(
                                'div',
                                { className: 'goods-info' },
                                React.createElement(
                                    'ul',
                                    null,
                                    this.state.item0.map(function (json) {
                                        return React.createElement(
                                            'li',
                                            { style: { marginBottom: '20px', marginLeft: '7px' }, key: json.goodsId },
                                            React.createElement(
                                                'div',
                                                { className: 'infoImg' },
                                                React.createElement('img', { src: json.goodsHerPic, alt: '' })
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'babyInfo' },
                                                React.createElement(
                                                    'p',
                                                    { className: 'infoTit1' },
                                                    json.hotItemName
                                                ),
                                                React.createElement(
                                                    'p',
                                                    { className: 'infoTit2' },
                                                    React.createElement(
                                                        'b',
                                                        { className: 'pink' },
                                                        React.createElement(
                                                            'i',
                                                            null,
                                                            '￥'
                                                        ),
                                                        React.createElement(
                                                            'span',
                                                            null,
                                                            json.presentPrice
                                                        )
                                                    ),
                                                    React.createElement(
                                                        'del',
                                                        null,
                                                        '市场价￥',
                                                        json.marketPrice
                                                    )
                                                )
                                            )
                                        );
                                    })
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'one-pay' },
                                React.createElement(
                                    'div',
                                    { style: { width: '150px' } },
                                    React.createElement(
                                        'del',
                                        null,
                                        '￥',
                                        this.state.item00.marketPrice
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { style: { width: '382px' } },
                                    '美眉专享价: ',
                                    React.createElement(
                                        'i',
                                        null,
                                        '￥'
                                    ),
                                    ' ',
                                    React.createElement(
                                        'b',
                                        null,
                                        this.state.item00.monthlyPrice
                                    ),
                                    ' ',
                                    React.createElement(
                                        'span',
                                        null,
                                        'x',
                                        this.state.item00.staging
                                    )
                                ),
                                React.createElement(
                                    'a',
                                    { href: "goods-detail.html?goodsId=" + goodsId0 },
                                    React.createElement(
                                        'div',
                                        { className: '_btn btn_btn', style: { padding: '9px' } },
                                        '立刻分期'
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'two-g one-g' },
                    React.createElement(
                        'div',
                        { className: 'one-main', style: { paddingTop: '24px' } },
                        React.createElement(
                            'div',
                            { className: 'main-content', style: { marginLeft: '540px' } },
                            React.createElement(
                                'div',
                                { className: 'goods-info goods2-info' },
                                React.createElement(
                                    'ul',
                                    null,
                                    this.state.item1.map(function (json) {
                                        return React.createElement(
                                            'li',
                                            { style: { margin: 0, marginBottom: '20px' }, key: json.goodsId },
                                            React.createElement(
                                                'div',
                                                { className: 'infoImg' },
                                                React.createElement('img', { src: json.goodsHerPic, alt: '' })
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'babyInfo' },
                                                React.createElement(
                                                    'p',
                                                    { className: 'infoTit1' },
                                                    json.hotItemName
                                                ),
                                                React.createElement(
                                                    'p',
                                                    { className: 'infoTit2' },
                                                    React.createElement(
                                                        'b',
                                                        { className: 'pink' },
                                                        React.createElement(
                                                            'i',
                                                            null,
                                                            '￥'
                                                        ),
                                                        React.createElement(
                                                            'span',
                                                            null,
                                                            json.presentPrice
                                                        )
                                                    ),
                                                    React.createElement(
                                                        'del',
                                                        null,
                                                        '市场价￥',
                                                        json.marketPrice
                                                    )
                                                )
                                            )
                                        );
                                    })
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'one-pay' },
                                React.createElement(
                                    'div',
                                    { style: { width: '150px' } },
                                    React.createElement(
                                        'del',
                                        null,
                                        '￥',
                                        this.state.item11.marketPrice
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { style: { width: '377px' } },
                                    '美眉专享价: ',
                                    React.createElement(
                                        'i',
                                        null,
                                        '￥'
                                    ),
                                    ' ',
                                    React.createElement(
                                        'b',
                                        null,
                                        this.state.item11.monthlyPrice
                                    ),
                                    ' ',
                                    React.createElement(
                                        'span',
                                        null,
                                        'x',
                                        this.state.item11.staging
                                    )
                                ),
                                React.createElement(
                                    'a',
                                    { href: "goods-detail.html?goodsId=" + goodsId1 },
                                    React.createElement(
                                        'div',
                                        { className: '_btn btn_btn', style: { padding: '9px' } },
                                        '立刻分期'
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'three-g one-g' },
                    React.createElement(
                        'div',
                        { className: 'one-main', style: { paddingTop: '24px', paddingLeft: '8px' } },
                        React.createElement(
                            'div',
                            { className: 'main-content' },
                            React.createElement(
                                'div',
                                { className: 'goods-info goods3-info' },
                                React.createElement(
                                    'ul',
                                    null,
                                    this.state.item2.map(function (json) {
                                        return React.createElement(
                                            'li',
                                            { style: { margin: 0, marginBottom: '20px' }, key: json.goodsId },
                                            React.createElement(
                                                'div',
                                                { className: 'infoImg' },
                                                React.createElement('img', { src: json.goodsHerPic, alt: '' })
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'babyInfo' },
                                                React.createElement(
                                                    'p',
                                                    { className: 'infoTit1' },
                                                    json.hotItemName
                                                ),
                                                React.createElement(
                                                    'p',
                                                    { className: 'infoTit2' },
                                                    React.createElement(
                                                        'b',
                                                        { className: 'pink' },
                                                        React.createElement(
                                                            'i',
                                                            null,
                                                            '￥'
                                                        ),
                                                        React.createElement(
                                                            'span',
                                                            null,
                                                            json.presentPrice
                                                        )
                                                    ),
                                                    React.createElement(
                                                        'del',
                                                        null,
                                                        '市场价￥',
                                                        json.marketPrice
                                                    )
                                                )
                                            )
                                        );
                                    })
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'one-pay' },
                                React.createElement(
                                    'div',
                                    { style: { width: '150px' } },
                                    React.createElement(
                                        'del',
                                        null,
                                        '￥',
                                        this.state.item22.marketPrice
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { style: { width: '377px' } },
                                    '美眉专享价: ',
                                    React.createElement(
                                        'i',
                                        null,
                                        '￥'
                                    ),
                                    ' ',
                                    React.createElement(
                                        'b',
                                        null,
                                        this.state.item22.monthlyPrice
                                    ),
                                    ' ',
                                    React.createElement(
                                        'span',
                                        null,
                                        'x',
                                        this.state.item22.staging
                                    )
                                ),
                                React.createElement(
                                    'a',
                                    { href: "goods-detail.html?goodsId=" + goodsId2 },
                                    React.createElement(
                                        'div',
                                        { className: '_btn btn_btn', style: { padding: '9px' } },
                                        '立刻分期'
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement('div', { className: 'f-g' }),
                React.createElement('div', { className: 'five-g' }),
                React.createElement('div', { className: 's-g' }),
                React.createElement('div', { className: 'sv-g' }),
                React.createElement(
                    'div',
                    { className: 'e-g' },
                    React.createElement(
                        'div',
                        { className: 'e-main' },
                        React.createElement(
                            'div',
                            { className: 'e-content' },
                            React.createElement(
                                'div',
                                { className: 'e-t' },
                                React.createElement('div', null),
                                React.createElement(
                                    'p',
                                    { style: { display: 'inline-block' } },
                                    '她们正在变美'
                                ),
                                React.createElement('div', null)
                            ),
                            React.createElement(
                                'div',
                                { style: { overflow: 'hidden' } },
                                React.createElement(
                                    'div',
                                    { className: 'tab-list' },
                                    React.createElement(
                                        'table',
                                        null,
                                        React.createElement(
                                            'tbody',
                                            null,
                                            this.state.data.map(function (json, i) {
                                                return React.createElement(
                                                    'tr',
                                                    { key: i },
                                                    React.createElement(
                                                        'td',
                                                        { className: 'wid-10' },
                                                        React.createElement(
                                                            'div',
                                                            { style: { width: '61px', height: '61px', borderRadius: '50%' } },
                                                            React.createElement('img', { src: json.sculptureUrl ? json.sculptureUrl : '', alt: '', style: { width: '100%', borderRadius: '50%' } })
                                                        )
                                                    ),
                                                    React.createElement(
                                                        'td',
                                                        { className: 'wid-30' },
                                                        React.createElement(
                                                            'div',
                                                            null,
                                                            json.telphone
                                                        )
                                                    ),
                                                    React.createElement(
                                                        'td',
                                                        { className: 'wid-30' },
                                                        React.createElement(
                                                            'div',
                                                            null,
                                                            '已预约'
                                                        )
                                                    ),
                                                    React.createElement(
                                                        'td',
                                                        { className: 'wid-30' },
                                                        React.createElement(
                                                            'div',
                                                            null,
                                                            _this2.timeStamp2String(json.createTime)
                                                        )
                                                    )
                                                );
                                            })
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return R_Combo;
}(React.Component);