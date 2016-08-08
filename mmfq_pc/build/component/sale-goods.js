/**
 * Created by sheldon on 2016/7/11.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_SaleGoods = function (_React$Component) {
    _inherits(R_SaleGoods, _React$Component);

    function R_SaleGoods(props) {
        _classCallCheck(this, R_SaleGoods);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(R_SaleGoods).call(this, props));

        _this.state = {
            sales: []
        };
        return _this;
    }

    _createClass(R_SaleGoods, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.getFlashSale();
        }
    }, {
        key: 'getFlashSale',
        value: function getFlashSale() {
            var _this2 = this;

            $.ajax({
                type: 'post',
                url: '/pc/computer/query_index_flash_sale_goodsItem',
                dataType: 'json',
                success: function success(res) {
                    console.log(res);
                    if (res.result == 0) {
                        _this2.setState({ sales: res.data.flashSaleGoodsItemList });
                    }
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                { className: 'activity-main' },
                React.createElement(
                    'div',
                    { className: 'activity-content' },
                    this.state.sales.map(function (json) {

                        return React.createElement(
                            'div',
                            { className: 'one', key: json.hotItemName },
                            React.createElement(
                                'ul',
                                null,
                                Date.parse(new Date()) < json.teamEndTime && Date.parse(new Date()) >= json.teamBeginTime ? React.createElement(
                                    'li',
                                    null,
                                    React.createElement(
                                        'a',
                                        { href: "goods-detail.html?goodsId=" + json.goodsHerf },
                                        React.createElement(
                                            'div',
                                            { className: 'top-img' },
                                            React.createElement('img', { src: '../static/images/goods/bit.png', alt: '' })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'img' },
                                            React.createElement('img', { src: json.goodsHerPic, alt: '' })
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'goods-info' },
                                            React.createElement(
                                                'p',
                                                null,
                                                json.hotItemName
                                            ),
                                            React.createElement(
                                                'div',
                                                null,
                                                '仅剩:',
                                                json.lastNumber
                                            ),
                                            React.createElement(
                                                'p',
                                                { style: { padding: '10px' } },
                                                React.createElement(
                                                    'span',
                                                    {
                                                        style: { marginRight: '30px' } },
                                                    '限时价: ',
                                                    React.createElement(
                                                        'b',
                                                        null,
                                                        '￥',
                                                        json.temporaryPrice
                                                    ),
                                                    ' '
                                                ),
                                                React.createElement(
                                                    'del',
                                                    null,
                                                    '原价:￥',
                                                    json.marketPrice
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'bg-img' },
                                                React.createElement(
                                                    'div',
                                                    { className: 'month-pay' },
                                                    '月供:￥',
                                                    json.monthlyPrice,
                                                    React.createElement(
                                                        'spna',
                                                        null,
                                                        'x12'
                                                    )
                                                ),
                                                React.createElement(
                                                    'div',
                                                    { style: { color: '#fff' } },
                                                    '立即分期'
                                                )
                                            )
                                        )
                                    )
                                ) : React.createElement(
                                    'li',
                                    null,
                                    React.createElement(
                                        'div',
                                        { className: 'top-img' },
                                        React.createElement('img', { src: '../static/images/goods/bit.png', alt: '' })
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'img' },
                                        React.createElement('img', { src: json.goodsHerPic, alt: '' })
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'goods-info' },
                                        React.createElement(
                                            'p',
                                            null,
                                            json.hotItemName
                                        ),
                                        React.createElement(
                                            'div',
                                            null,
                                            '仅剩:',
                                            json.lastNumber
                                        ),
                                        React.createElement(
                                            'p',
                                            { style: { padding: '10px' } },
                                            React.createElement(
                                                'span',
                                                {
                                                    style: { marginRight: '30px' } },
                                                '限时价: ',
                                                React.createElement(
                                                    'b',
                                                    null,
                                                    '￥',
                                                    json.temporaryPrice
                                                ),
                                                ' '
                                            ),
                                            React.createElement(
                                                'del',
                                                null,
                                                '原价:￥',
                                                json.marketPrice
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'bg-img2' },
                                            React.createElement(
                                                'div',
                                                { className: 'month-pay' },
                                                '月供:￥',
                                                json.monthlyPrice,
                                                React.createElement(
                                                    'spna',
                                                    null,
                                                    'x12'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'active' },
                                                '马上开始'
                                            )
                                        )
                                    )
                                )
                            )
                        );
                    })
                )
            );
        }
    }]);

    return R_SaleGoods;
}(React.Component);