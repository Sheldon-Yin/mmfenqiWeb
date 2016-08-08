/**
 * Created by sheldon on 2016/8/1.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_OrderEnsure = function (_React$Component) {
    _inherits(R_OrderEnsure, _React$Component);

    function R_OrderEnsure() {
        _classCallCheck(this, R_OrderEnsure);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(R_OrderEnsure).apply(this, arguments));
    }

    _createClass(R_OrderEnsure, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.order = JSON.parse(window.localStorage.orderData);
            console.log(this.order);
        }
    }, {
        key: 'createOrderConfirm',
        value: function createOrderConfirm() {
            var orderData = this.order;
            $.ajax({
                type: 'post',
                url: '/pc/computer/user_goods_confirm_order',
                data: orderData,
                dataType: 'json',
                success: function success(res) {
                    console.log(res);
                    if (res.result == 0) {
                        var locationSearchString = '?';
                        var order = res.data.goodsConfirmOrderResponse.order;
                        console.log(JSON.stringify(res.data.goodsConfirmOrderResponse));
                        window.localStorage.midOrder = JSON.stringify(res.data.goodsConfirmOrderResponse);
                        var user = res.data.goodsConfirmOrderResponse.userInfo;
                        locationSearchString = locationSearchString + 'orderId=' + order.orderId + '&orderNo=' + order.orderNo + '&orderName=' + order.orderName + '&downpayAmount=' + (order.downpayAmount + (res.data.goodsConfirmOrderResponse.isInsuranceBuy ? parseInt(res.data.goodsConfirmOrderResponse.insuranceAmount) : 0)) + '&creditPay=' + res.data.goodsConfirmOrderResponse.creditPayment + '&telephone=' + user.telephone + '&startPhone=' + user.telephone.substring(0, 3) + "****" + user.telephone.substring(7, 11);
                        window.location.href = 'my-order-detail.html' + locationSearchString;
                    } else if (res.result == 1013) {
                        window.location.href = 'login.html';
                        window.localStorage.referer = window.location.href;
                    } else {
                        alert(res.msg);
                    }
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                {
                    style: { flexGrow: '1', width: '100%', backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', minHeight: 780, display: 'flex', flexDirection: 'column', justifyContent: 'center' } },
                React.createElement(
                    'div',
                    { className: 'wrap', style: { width: 1000 } },
                    React.createElement(
                        'div',
                        { style: { backgroundColor: '#fff', height: 650, width: 998, border: '1px solid #e2e2e2' } },
                        React.createElement(
                            'div',
                            {
                                style: { height: 48, borderBottom: '1px solid #e2e2e2', backgroundColor: '#FCFCFC', textIndent: '24px', lineHeight: '48px', fontSize: '16px' } },
                            '确认项目信息'
                        ),
                        React.createElement(
                            'div',
                            { style: { height: 600, width: 958, padding: 20 } },
                            React.createElement(
                                'div',
                                { style: { fontSize: '14px', fontWeight: 'bolder', margin: '5px 0' } },
                                '项目信息'
                            ),
                            React.createElement(
                                'table',
                                { className: 'orderTable',
                                    style: { width: 958, border: '1px solid #eee', textAlign: 'center' } },
                                React.createElement(
                                    'tbody',
                                    null,
                                    React.createElement(
                                        'tr',
                                        { style: { height: 30 } },
                                        React.createElement(
                                            'th',
                                            null,
                                            '项目名称'
                                        ),
                                        React.createElement(
                                            'th',
                                            null,
                                            '价格'
                                        ),
                                        React.createElement(
                                            'th',
                                            null,
                                            '数量'
                                        ),
                                        React.createElement(
                                            'th',
                                            null,
                                            '总价'
                                        )
                                    ),
                                    React.createElement(
                                        'tr',
                                        { style: { height: 60 } },
                                        React.createElement(
                                            'td',
                                            null,
                                            this.order.orderName
                                        ),
                                        React.createElement(
                                            'td',
                                            null,
                                            this.order.fenqiObj.shoufuId != 0 ? this.order.fenqiObj.shoufu * 100 / this.order.fenqiObj.shoufuId : this.order.orderAmount
                                        ),
                                        React.createElement(
                                            'td',
                                            null,
                                            '1'
                                        ),
                                        React.createElement(
                                            'td',
                                            null,
                                            this.order.fenqiObj.shoufuId != 0 ? this.order.fenqiObj.shoufu * 100 / this.order.fenqiObj.shoufuId : this.order.orderAmount
                                        )
                                    )
                                )
                            ),
                            this.order.isInsuranceBuy ? React.createElement(
                                'div',
                                null,
                                React.createElement('div', { style: { backgroundColor: '#eee', height: 1, width: 958, margin: '20px 0' } }),
                                React.createElement(
                                    'div',
                                    { style: { fontSize: '14px', fontWeight: 'bolder', margin: '5px 0' } },
                                    '保险'
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    this.order.insuranceAmount,
                                    '元'
                                )
                            ) : '',
                            React.createElement('div', { style: { backgroundColor: '#eee', height: 1, width: 958, margin: '20px 0' } }),
                            React.createElement(
                                'div',
                                { style: { fontSize: '14px', fontWeight: 'bolder', margin: '5px 0' } },
                                '分期方式'
                            ),
                            React.createElement(
                                'div',
                                null,
                                React.createElement(
                                    'table',
                                    { className: 'orderTable', style: { width: 958, textAlign: 'center' } },
                                    React.createElement(
                                        'tbody',
                                        null,
                                        React.createElement(
                                            'tr',
                                            { style: { height: 30 } },
                                            React.createElement(
                                                'th',
                                                null,
                                                '首付比例'
                                            ),
                                            React.createElement(
                                                'th',
                                                null,
                                                '首付金额(元)'
                                            ),
                                            React.createElement(
                                                'th',
                                                null,
                                                '信用支付(元)'
                                            ),
                                            React.createElement(
                                                'th',
                                                null,
                                                '分期数'
                                            ),
                                            React.createElement(
                                                'th',
                                                null,
                                                '月供(元)'
                                            )
                                        ),
                                        React.createElement(
                                            'tr',
                                            { style: { height: 100 } },
                                            React.createElement(
                                                'td',
                                                null,
                                                this.order.fenqiObj.shoufuId,
                                                '%'
                                            ),
                                            React.createElement(
                                                'td',
                                                null,
                                                this.order.fenqiObj.shoufu,
                                                '元'
                                            ),
                                            React.createElement(
                                                'td',
                                                { style: { color: '#25a9f4' } },
                                                '-',
                                                this.order.fenqiObj.shoufuId != 0 ? this.order.fenqiObj.shoufu * (100 - this.order.fenqiObj.shoufuId) / this.order.fenqiObj.shoufuId : this.order.orderAmount
                                            ),
                                            React.createElement(
                                                'td',
                                                null,
                                                this.order.fenqiObj.paymentId,
                                                '月'
                                            ),
                                            React.createElement(
                                                'td',
                                                null,
                                                React.createElement(
                                                    'p',
                                                    { style: { color: '#ff6678' } },
                                                    this.order.fenqiObj.yuefu
                                                ),
                                                React.createElement(
                                                    'p',
                                                    { style: { color: '#999' } },
                                                    '(包含服务费',
                                                    this.order.fenqiObj.interest,
                                                    '元/月)'
                                                )
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement('div', { style: { backgroundColor: '#eee', height: 1, width: 958, margin: '20px 0' } }),
                            React.createElement(
                                'div',
                                { style: { fontSize: '14px', fontWeight: 'bolder', margin: '5px 0' } },
                                '分期计算器'
                            ),
                            React.createElement(
                                'div',
                                { style: { textAlign: 'right' } },
                                React.createElement(
                                    'div',
                                    null,
                                    '自付金额：',
                                    React.createElement(
                                        'span',
                                        { style: { color: '#ff6678' } },
                                        this.order.fenqiObj.shoufu + parseFloat(this.order.isInsuranceBuy ? this.order.insuranceAmount : 0)
                                    ),
                                    '元'
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    '信用支付金额：',
                                    React.createElement(
                                        'span',
                                        { style: { color: '#25a9f4' } },
                                        '-',
                                        this.order.fenqiObj.shoufuId != 0 ? this.order.fenqiObj.shoufu * (100 - this.order.fenqiObj.shoufuId) / this.order.fenqiObj.shoufuId : this.order.orderAmount
                                    ),
                                    '元'
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { style: { float: 'right' } },
                        React.createElement(
                            'div',
                            { onClick: this.createOrderConfirm.bind(this),
                                style: { padding: 10, backgroundColor: '#FD657A', color: 'white', fontSize: '16px', width: '80px', margin: '15px 0', textAlign: 'center' } },
                            '确认支付'
                        )
                    )
                )
            );
        }
    }]);

    return R_OrderEnsure;
}(React.Component);