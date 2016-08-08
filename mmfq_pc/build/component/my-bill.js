'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_MyBill = function (_React$Component) {
    _inherits(R_MyBill, _React$Component);

    function R_MyBill() {
        _classCallCheck(this, R_MyBill);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(R_MyBill).call(this));

        _this.state = {
            data: [],
            myBillResponse: [],
            isOpen: '',
            repaymentedBill: '', //出现已还完
            length: '-1'
        };
        return _this;
    }

    _createClass(R_MyBill, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (!$.cookie('appToken')) {
                window.location.href = 'login.html';
            }
        }
    }, {
        key: 'myBill',
        value: function myBill(periodType) {
            var _this2 = this;

            $('.top ul li').eq(periodType).addClass('color_fd5').siblings('li').removeClass('color_fd5');

            if (periodType == '2') {
                //全部还款

                this.setState({
                    isOpen: '0',
                    repaymentedBill: '1'
                });

                $.ajax({
                    type: 'post',
                    url: '/pc/computer/repaymented_bill',
                    dataType: 'json',
                    success: function success(data) {
                        if (data.result == 1013) {
                            window.location.href = 'login.html';
                        }
                        console.log(data);
                        _this2.setState({
                            data: data.data,
                            myBillResponse: data.data.myBillResponse,
                            length: data.data.billNum

                        });
                    }

                });
                return;
            } else if (periodType == '0') {
                //本期
                var jsonData = {
                    periodType: periodType
                };
                $.ajax({
                    type: 'post',
                    url: '/pc/computer/user_bill',
                    data: jsonData,
                    dataType: 'json',
                    success: function success(data) {
                        console.log(data);
                        if (data.result == 1013) {
                            window.location.href = 'login.html';
                        }
                        _this2.setState({
                            data: data.data,
                            myBillResponse: data.data.myBillResponse,
                            length: data.data.billNum,

                            isOpen: '1',
                            repaymentedBill: '0'
                        });
                    }

                });
            } else if (periodType == '1') {
                //下期
                var _jsonData = {
                    periodType: periodType
                };
                $.ajax({
                    type: 'post',
                    url: '/pc/computer/user_bill',
                    data: _jsonData,
                    dataType: 'json',
                    success: function success(data) {
                        console.log(data);
                        if (data.result == 1013) {
                            window.location.href = 'login.html';
                        }
                        _this2.setState({
                            data: data.data,
                            myBillResponse: data.data.myBillResponse,
                            length: data.data.billNum,

                            isOpen: '0',
                            repaymentedBill: '0'
                        });
                    }

                });
            }
        }

        /*立即还款*/

    }, {
        key: 'pay',
        value: function pay(id) {
            if (id instanceof Array) {
                var b = id.join(",");
                var repaymentPlanId = b;
            } else {
                var repaymentPlanId = id;
            }
            var jsonData = {
                repaymentPlanId: repaymentPlanId
            };

            $.ajax({
                type: 'post',
                url: '/pc/computer/repayment',
                data: jsonData,
                dataType: 'json',
                success: function success(data) {

                    console.log(data);
                    var bill_amount = data.data.bill_amount;
                    var orderId = data.data.orderId;
                    var orderStr = data.data.orderStr;

                    window.open('my-pay.html?bill_amount=' + bill_amount + '&orderId=' + orderId + '&orderStr=' + orderStr + '');

                    // window.open('my-detail.html?id=' + id + '');
                }

            });
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
        key: 'getType',
        value: function getType(orderStatus) {
            switch (orderStatus) {
                case '0':
                    return '还款中';
                    break;
                case '1':
                    return '已还款';
                    break;
                case '2':
                    return '延期还款';
                    break;
                case '3':
                    return '逾期还款';
                    break;
                default:
                    return '无';
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.myBill('0');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var data = this.state.data;
            var length = this.state.length;
            console.log(length);

            console.log(this.state.myBillResponse);

            return React.createElement(
                'div',
                { style: { float: 'left' } },
                React.createElement(
                    'div',
                    { className: 'wrap-content' },
                    React.createElement(
                        'div',
                        { className: 'wrap-content-right' },
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                { className: 'top' },
                                React.createElement(
                                    'ul',
                                    null,
                                    React.createElement(
                                        'li',
                                        { className: 'color_fd5', onClick: this.myBill.bind(this, '0') },
                                        '本期账单'
                                    ),
                                    React.createElement(
                                        'li',
                                        { onClick: this.myBill.bind(this, '1') },
                                        '下期账单'
                                    ),
                                    React.createElement(
                                        'li',
                                        { onClick: this.myBill.bind(this, '2') },
                                        '已全部还款账单'
                                    )
                                )
                            ),
                            length == '-1' ? React.createElement('div', null) : length == '0' ? React.createElement(
                                'div',
                                { className: 'month-content' },
                                React.createElement(
                                    'div',
                                    { style: { width: '150px', float: 'left', 'minHeight': 500 } },
                                    React.createElement(
                                        'ul',
                                        null,
                                        React.createElement(
                                            'li',
                                            null,
                                            '亲，暂还没有账单哦！'
                                        )
                                    )
                                )
                            ) : React.createElement(
                                'div',
                                { className: 'month-content', style: { display: this.state.isOpen == '1' && this.state.data.billNum != '0' ? 'block' : 'none' } },
                                React.createElement(
                                    'div',
                                    { style: { width: '150px', float: 'left' } },
                                    React.createElement(
                                        'ul',
                                        null,
                                        React.createElement(
                                            'li',
                                            null,
                                            '本月，共 ',
                                            React.createElement(
                                                'span',
                                                null,
                                                this.state.data.billNum
                                            ),
                                            '笔账单'
                                        ),
                                        React.createElement(
                                            'li',
                                            null,
                                            '待还款 ',
                                            React.createElement(
                                                'span',
                                                null,
                                                '￥',
                                                this.state.data.payBillAmount
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: '_btn btn_btn', onClick: this.pay.bind(this, this.state.data.payBillId), style: { float: 'left', 'marginTop': '33px' } },
                                    '立即还款'
                                )
                            ),
                            this.state.myBillResponse.map(function (json) {
                                return React.createElement(
                                    'div',
                                    { className: 'top-content', key: json.repaymentPlanId },
                                    React.createElement(
                                        'div',
                                        { className: 'one' },
                                        React.createElement(
                                            'div',
                                            { className: 'sub-content' },
                                            React.createElement(
                                                'ul',
                                                null,
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    '距离还款日仅剩: ',
                                                    React.createElement(
                                                        'b',
                                                        null,
                                                        json.to_repayment_date
                                                    )
                                                ),
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    '期数: ',
                                                    React.createElement(
                                                        'b',
                                                        null,
                                                        json.staging
                                                    )
                                                ),
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    '到期时间: ',
                                                    React.createElement(
                                                        'b',
                                                        null,
                                                        json.expiredTime
                                                    )
                                                ),
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    '还款状态: ',
                                                    React.createElement(
                                                        'b',
                                                        null,
                                                        _this3.getType(json.repayment_status)
                                                    ),
                                                    ' '
                                                )
                                            ),
                                            React.createElement(
                                                'ul',
                                                null,
                                                React.createElement(
                                                    'li',
                                                    { style: { width: '70px' } },
                                                    '商品名称: ',
                                                    React.createElement('b', null),
                                                    '   '
                                                ),
                                                React.createElement(
                                                    'li',
                                                    { style: { width: '260px', paddingRight: '100px', color: '#7fa9d3' } },
                                                    json.goodsName
                                                ),
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    '订单号: ',
                                                    React.createElement(
                                                        'b',
                                                        { style: { color: '#7fa9d3' } },
                                                        json.orderNo
                                                    )
                                                ),
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    '所属医院: ',
                                                    React.createElement(
                                                        'b',
                                                        null,
                                                        json.hosName
                                                    ),
                                                    ' '
                                                )
                                            ),
                                            _this3.state.repaymentedBill == '' ? React.createElement('div', null) : _this3.state.repaymentedBill == 1 ? React.createElement(
                                                'div',
                                                { className: 'repaymented_bill' },
                                                React.createElement('img', { src: '../static/images/repaymented_bill.png' })
                                            ) : React.createElement('div', null)
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'refund' },
                                            React.createElement(
                                                'div',
                                                null,
                                                React.createElement(
                                                    'p',
                                                    null,
                                                    '本期账单应付: ',
                                                    React.createElement(
                                                        'span',
                                                        null,
                                                        '￥',
                                                        json.payAmount
                                                    ),
                                                    ' '
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { style: { color: '#9e9e9e', marginLeft: '20px' } },
                                                '应付明细:',
                                                json.payAmount,
                                                '+',
                                                json.overBreachAmount,
                                                ' (逾期费)'
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'btn', style: { display: _this3.state.isOpen == '1' ? 'inline-block' : 'none' } },
                                                React.createElement(
                                                    'div',
                                                    { className: '_btn btn_btn', onClick: _this3.pay.bind(_this3, json.repaymentPlanId) },
                                                    '立即还款'
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            null,
                                            React.createElement(
                                                'table',
                                                { cellSpacing: '0', cellPadding: '0' },
                                                React.createElement(
                                                    'thead',
                                                    null,
                                                    React.createElement(
                                                        'tr',
                                                        null,
                                                        React.createElement(
                                                            'th',
                                                            null,
                                                            '分期金额(元)'
                                                        ),
                                                        React.createElement(
                                                            'th',
                                                            null,
                                                            '分期数'
                                                        ),
                                                        React.createElement(
                                                            'th',
                                                            null,
                                                            '到期时间'
                                                        ),
                                                        React.createElement(
                                                            'th',
                                                            null,
                                                            '实际还款时间'
                                                        ),
                                                        React.createElement(
                                                            'th',
                                                            null,
                                                            '还款状态'
                                                        )
                                                    )
                                                ),
                                                json.billStageList.map(function (list) {
                                                    return React.createElement(
                                                        'tbody',
                                                        { className: 'bg_bd', key: list.id },
                                                        React.createElement(
                                                            'tr',
                                                            null,
                                                            React.createElement(
                                                                'td',
                                                                null,
                                                                React.createElement(
                                                                    'li',
                                                                    null,
                                                                    '￥',
                                                                    list.payAmount,
                                                                    ' ',
                                                                    React.createElement(
                                                                        'span',
                                                                        null,
                                                                        '(包含逾期费:',
                                                                        list.overBreachAmount,
                                                                        ')'
                                                                    )
                                                                )
                                                            ),
                                                            React.createElement(
                                                                'td',
                                                                null,
                                                                React.createElement(
                                                                    'li',
                                                                    null,
                                                                    list.staging
                                                                )
                                                            ),
                                                            React.createElement(
                                                                'td',
                                                                null,
                                                                React.createElement(
                                                                    'li',
                                                                    null,
                                                                    _this3.timeStamp2String(list.payTime)
                                                                )
                                                            ),
                                                            React.createElement(
                                                                'td',
                                                                null,
                                                                React.createElement(
                                                                    'li',
                                                                    null,
                                                                    list.actualPayTime == null ? '-' : _this3.timeStamp2String(list.actualPayTime)
                                                                )
                                                            ),
                                                            React.createElement(
                                                                'td',
                                                                null,
                                                                React.createElement(
                                                                    'li',
                                                                    null,
                                                                    _this3.getType(list.status)
                                                                )
                                                            )
                                                        )
                                                    );
                                                })
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'page_foot' },
                                            React.createElement('div', null),
                                            React.createElement(
                                                'div',
                                                null,
                                                '共 ',
                                                React.createElement(
                                                    'span',
                                                    null,
                                                    json.orderSurplusNum
                                                ),
                                                '个账单，本期还款总额: ',
                                                React.createElement(
                                                    'span',
                                                    null,
                                                    '￥',
                                                    json.orderSurplusPrice
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'pay_type' },
                                                React.createElement(
                                                    'div',
                                                    { onClick: _this3.pay.bind(_this3, json.orderSurplusId) },
                                                    '全部还清'
                                                )
                                            )
                                        )
                                    )
                                );
                            })
                        )
                    )
                )
            );
        }
    }]);

    return R_MyBill;
}(React.Component);