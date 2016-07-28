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

            var goods = this.state.sales.map(function (item, index) {
                return React.createElement(
                    'li',
                    { key: index },
                    React.createElement(
                        'a',
                        { href: "goods-detail.html?goodsId=" + item.goodsHerf, target: '_blank', className: 'infoImg' },
                        React.createElement('img', { src: item.goodsHerPic, alt: '' })
                    ),
                    React.createElement(
                        'a',
                        { href: "goods-detail.html?goodsId=" + item.goodsHerf, target: '_blank', className: 'infoTxt' },
                        React.createElement(
                            'div',
                            { className: 'babyInfo' },
                            React.createElement(
                                'p',
                                { className: 'infoTit1' },
                                item.hotItemName
                            ),
                            React.createElement(
                                'p',
                                { className: 'infoTit2' },
                                React.createElement(
                                    'span',
                                    { className: 'pink' },
                                    React.createElement(
                                        'i',
                                        null,
                                        '￥'
                                    ),
                                    item.monthlyPrice,
                                    'x',
                                    item.staging
                                ),
                                React.createElement(
                                    'del',
                                    null,
                                    '￥',
                                    item.marketPrice
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'hosInfo' },
                            React.createElement(
                                'p',
                                { className: 'infoTit1' },
                                item.hospitalName,
                                ' '
                            ),
                            React.createElement(
                                'p',
                                { className: 'infoTit2 clearfix' },
                                React.createElement('span', { className: 'left' }),
                                React.createElement(
                                    'span',
                                    { className: 'right' },
                                    '立即预订'
                                )
                            )
                        )
                    )
                );
            });

            return React.createElement(
                'div',
                { className: 'boxItem1 wrap clearfix hoverTab' },
                React.createElement(
                    'ul',
                    { style: { display: 'block' }, className: 'hoverCont' },
                    goods
                )
            );
        }
    }]);

    return R_SaleGoods;
}(React.Component);