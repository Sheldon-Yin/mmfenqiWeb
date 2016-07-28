/**
 * Created by sheldon on 2016/7/11.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_PopularGoods = function (_React$Component) {
    _inherits(R_PopularGoods, _React$Component);

    function R_PopularGoods(props) {
        _classCallCheck(this, R_PopularGoods);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(R_PopularGoods).call(this, props));

        _this.state = {
            sales: []
        };
        return _this;
    }

    _createClass(R_PopularGoods, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.getPorpularGoods();
        }
    }, {
        key: 'getPorpularGoods',
        value: function getPorpularGoods() {
            var _this2 = this;

            $.ajax({
                type: 'post',
                url: '/pc/computer/query_index_popular_goodsItem',
                dataType: 'json',
                success: function success(res) {
                    console.log(res);
                    if (res.result == 0) {
                        _this2.setState({ sales: res.data.goodsItemList });
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
                        { href: 'goods-detail.html?goodsId=' + item.goodsHerf, target: '_blank' },
                        React.createElement(
                            'p',
                            { className: 'infoImg left' },
                            React.createElement('img', { alt: '',
                                src: item.goodsHerPic })
                        ),
                        React.createElement(
                            'div',
                            { className: 'right' },
                            React.createElement(
                                'p',
                                { className: 'infoItem2' },
                                item.hotItemName
                            ),
                            React.createElement(
                                'p',
                                { className: 'infoItem3 ' },
                                React.createElement('i', null),
                                ' ',
                                item.hospitalName,
                                ' '
                            ),
                            React.createElement(
                                'p',
                                { className: 'price' },
                                React.createElement(
                                    'span',
                                    { className: 'left' },
                                    React.createElement(
                                        'i',
                                        { className: 'ft18' },
                                        '￥'
                                    ),
                                    React.createElement(
                                        'i',
                                        { className: 'ft24' },
                                        item.monthlyPrice,
                                        'x',
                                        item.staging
                                    )
                                ),
                                React.createElement(
                                    'b',
                                    { className: 'info-lab return-lab' },
                                    '返现'
                                )
                            )
                        )
                    )
                );
            });

            return React.createElement(
                'div',
                { className: 'boxItem2 wrap clearfix hoverTab' },
                React.createElement(
                    'ul',
                    { style: { display: 'block' }, className: 'hoverCont' },
                    goods
                )
            );
        }
    }]);

    return R_PopularGoods;
}(React.Component);