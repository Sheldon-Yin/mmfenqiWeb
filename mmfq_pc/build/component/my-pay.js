
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RMy_pay = function (_React$Component) {
    _inherits(RMy_pay, _React$Component);

    function RMy_pay() {
        _classCallCheck(this, RMy_pay);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(RMy_pay).call(this));

        _this2.state = {
            downpayAmount: '',
            url: '',
            orderId: ''
        };
        return _this2;
    }

    _createClass(RMy_pay, [{
        key: 'getUrl',
        value: function getUrl(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);return null;
        }
    }, {
        key: 'weixinMchPay',
        value: function weixinMchPay(downpayAmount, orderId) {
            var jsonData = {
                downpayAmount: downpayAmount,
                orderId: orderId,
                type: '1',
                payType: '1'
            };
            $.ajax({
                type: 'post',
                url: '/pc/weixin/weixinMchPay',
                data: jsonData,
                dataType: 'json',

                success: function (data) {
                    this.setState({
                        url: '/pc/weixin/getQRCode?codeUrl=' + data.data.resPar.codeUrl + ''
                    });
                }.bind(this)

            });
        }
    }, {
        key: 'alipayTrade',
        value: function alipayTrade() {
            var downpayAmount = this.getUrl('bill_amount');
            var orderId = this.getUrl('orderId');
            window.location.href = '/pc/alipayWeb/alipayTrade?downpayAmount=' + downpayAmount + '&orderId=' + orderId + '&type=' + 1 + '';
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {

            var downpayAmount = this.getUrl('bill_amount');
            var orderId = this.getUrl('orderId');

            this.setState({
                downpayAmount: downpayAmount
            });

            this.weixinMchPay(downpayAmount, orderId);

            var _this = this;

            setInterval(function () {
                _this.check_order_pay_success(orderId);
            }, 1000);
        }
    }, {
        key: 'check_order_pay_success',
        value: function check_order_pay_success(orderId) {
            $.ajax({
                type: 'post',
                url: '/pc/computer/check_bill_pay_success',
                data: { orderId: orderId },
                dataType: 'json',
                success: function success(res) {
                    console.log(res);
                    if (res.result == '0') {
                        if (res.data.isPaySuccess) {
                            window.location.href = 'pay-success.html?orderId=' + orderId + '';
                        }
                    }
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'wrap-content' },
                React.createElement(
                    'div',
                    { className: 'title-info' },
                    React.createElement(
                        'div',
                        { className: 'left' },
                        React.createElement(
                            'p',
                            null,
                            '还款申请已提交，请尽快还款'
                        ),
                        React.createElement(
                            'p',
                            null,
                            '收款方:美眉分期'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'right' },
                        React.createElement(
                            'p',
                            null,
                            '还款金额 ',
                            React.createElement(
                                'span',
                                null,
                                '￥',
                                this.state.downpayAmount
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: '_sub' },
                    React.createElement(
                        'div',
                        { className: 'pay-method' },
                        '选择支付方式'
                    ),
                    React.createElement(
                        'div',
                        { className: 'pay-content' },
                        React.createElement(
                            'div',
                            { className: 'weChatPay' },
                            React.createElement(
                                'div',
                                { className: 'good' },
                                React.createElement('img', { src: '../static/images/my-pay/my-pay.png', alt: '' })
                            ),
                            React.createElement(
                                'div',
                                { className: 'we-title' },
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement('img', { src: '../static/images/my-pay/pay2.png', alt: '' })
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'weixinma' },
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement('img', { src: this.state.url, style: { width: '100%', height: '100%' } })
                                ),
                                React.createElement(
                                    'p',
                                    null,
                                    '请使用微信扫描下方的二维码完成支付'
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'alipay' },
                            React.createElement(
                                'div',
                                { style: { paddingLeft: '40px', width: '780px' } },
                                React.createElement('img', { src: '../static/images/my-pay/pay1.png', alt: '' })
                            ),
                            React.createElement(
                                'div',
                                { className: '_btn btn_btn', onClick: this.alipayTrade.bind(this), style: { padding: '7px', borderRadius: '0' } },
                                '去支付'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return RMy_pay;
}(React.Component);