'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_MyOrderDetail = function (_React$Component) {
    _inherits(R_MyOrderDetail, _React$Component);

    function R_MyOrderDetail(props) {
        _classCallCheck(this, R_MyOrderDetail);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(R_MyOrderDetail).call(this, props));

        _this2.state = {
            isxingyong: false,
            orderId: '',
            orderNo: '',
            downpayAmount: '',
            orderName: '',
            creditPay: '',
            url: '',
            smsCode: '', //验证码

            telephone: '',
            starPhone: '',

            disabled: false,
            text: '获取验证码',
            timer: 60

        };
        return _this2;
    }

    _createClass(R_MyOrderDetail, [{
        key: 'init',
        value: function init(time) {

            var setCountDown = {
                timer: null,
                init: function init(opt) {
                    var _this = this;
                    this.setShowTime(opt.endtime, opt.done);
                    this.timer = setInterval(function () {
                        _this.setShowTime(opt.endtime, opt.done, opt.callback);
                    }, 1000);

                    console.log(this.timer);
                },
                getCountdown: function getCountdown(time) {
                    var curShowTimeSecondsVal = this.getSecond(time) - this.getSecond();
                    if (curShowTimeSecondsVal < 0) return [0, '00', '00', '00'];
                    // console.log(curShowTimeSecondsVal)
                    // 剩余秒数
                    var curShowTimeSeconds = parseInt(curShowTimeSecondsVal % 60);
                    // 计算剩余天数
                    var curShowTimeDays = parseInt(curShowTimeSecondsVal / 3600 / 24);
                    // 计算剩余小时
                    var curShowTimeHours = parseInt(curShowTimeSecondsVal / 3600) - curShowTimeDays * 24;
                    // 计算剩余分钟
                    var curShowTimeMinutes = parseInt((curShowTimeSecondsVal - parseInt(curShowTimeSecondsVal / 3600) * 3600) / 60);
                    curShowTimeHours = curShowTimeHours > 9 ? curShowTimeHours : '0' + curShowTimeHours;
                    curShowTimeSeconds = curShowTimeSeconds > 9 ? curShowTimeSeconds : '0' + curShowTimeSeconds;
                    curShowTimeMinutes = curShowTimeMinutes > 9 ? curShowTimeMinutes : '0' + curShowTimeMinutes;
                    return [curShowTimeDays, curShowTimeHours, curShowTimeMinutes, curShowTimeSeconds];
                },
                getSecond: function getSecond(times) {
                    if (times) {
                        var year = parseInt(times.slice(0, 4)),
                            month = parseInt(times.match(/-\d*/gi)[0].replace('-', '') - 1),
                            day = parseInt(times.match(/-\d*/gi)[1].replace('-', '')),
                            hour = parseInt(times.match(/\d*:/)[0].replace(':', '')),
                            minute = parseInt(times.match(/:\d*/)[0].replace(':', ''));
                        return new Date(year, month, day, hour, minute, 0).getTime() / 1000;
                    }
                    return new Date().getTime() / 1000;
                },
                setShowTime: function setShowTime(endtime, done, callback) {
                    var _this = this;
                    // var oSetTime = document.getElementById('time');
                    var day = this.getCountdown(endtime)[0],
                        hour = this.getCountdown(endtime)[1],
                        minute = this.getCountdown(endtime)[2],
                        second = this.getCountdown(endtime)[3];
                    done([day, hour, minute, second]);
                    // oSetTime.innerHTML = '剩余时间：'+day+'天'+hour+'小时'+minute+'分'+second+'秒';
                    if (day == 0 && hour == '00' && minute == '00' && second == '00') {
                        clearInterval(_this.timer);
                        _this.timer = null;
                        if (callback) callback();
                    }
                }
            };

            setCountDown.init({
                endtime: time,
                done: function done(data) {

                    console.log(data);
                    // console.log(data)
                    document.getElementById('time2').innerHTML = '剩余时间：' + data[0] + '天' + data[1] + '小时' + data[2] + '分' + data[3] + '秒';
                },
                callback: function callback() {
                    // window.location.reload()
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
        key: 'handleClick',
        value: function handleClick() {

            if (this.state.disabled) {
                return;
            }

            $.ajax({
                type: "post",
                url: '/pc/computer/user_getcode',
                dataType: "json",
                data: {
                    smsFmtId: 'payCredit',
                    telephone: this.state.telephone
                },
                error: function error() {},
                timeout: 60000,
                success: function success(data) {}
            });
            this.setState({
                disabled: true,
                text: '59s后重新获取',
                timer: 59
            });
            var self = this;
            var tm = setInterval(function () {
                var tt = self.state.timer - 1;
                if (tt <= 0) {
                    self.setState({
                        disabled: false,
                        text: '获取验证码',
                        timer: 60
                    });
                    clearInterval(tm);
                    return;
                }
                self.setState({
                    disabled: true,
                    text: tt + 's后重新获取',
                    timer: tt
                });
            }, 1000);
        }
    }, {
        key: 'weixinMchPay',
        value: function weixinMchPay(downpayAmount, orderId) {
            var jsonData = {
                downpayAmount: downpayAmount,
                orderId: orderId,
                type: '0',
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
            var downpayAmount = this.getUrl('downpayAmount');
            var orderId = this.getUrl('orderId');
            window.location.href = '/pc/alipayWeb/alipayTrade?downpayAmount=' + downpayAmount + '&orderId=' + orderId + '&type=' + 0 + '';
        }
    }, {
        key: 'getUrl',
        value: function getUrl(key) {
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
            var result = window.location.search.substr(1).match(reg);
            return result ? decodeURIComponent(result[2]) : null;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {

            var c = new Date();
            c.setHours(c.getHours() + 1);
            var a = this.timeStamp2String(c);
            this.init(a);

            var orderId = this.getUrl('orderId');
            var orderNo = this.getUrl('orderNo');
            var downpayAmount = this.getUrl('downpayAmount');
            var orderName = decodeURIComponent(this.getUrl('orderName'));
            var creditPay = this.getUrl('creditPay');
            var telephone = this.getUrl('telephone');
            var starPhone = this.getUrl('starPhone');

            if (downpayAmount == 0) {
                this.setState({
                    isxingyong: true,
                    orderId: orderId,
                    orderNo: orderNo,
                    downpayAmount: downpayAmount,
                    orderName: orderName,
                    creditPay: creditPay,
                    telephone: telephone,
                    starPhone: starPhone
                });
            } else {

                this.setState({
                    isxingyong: false,
                    orderId: orderId,
                    orderNo: orderNo,
                    downpayAmount: downpayAmount,
                    orderName: orderName,
                    creditPay: creditPay,
                    telephone: telephone,
                    starPhone: starPhone
                });

                this.weixinMchPay(downpayAmount, orderId);
            }
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            this.setState({ smsCode: e.target.value });
        }
    }, {
        key: 'userOrder',
        value: function userOrder(yzm) {
            $.ajax({
                type: "post",
                url: '/pc/computer/user_Order_Confirm_Pay',
                dataType: "json",
                data: {
                    smsCode: this.state.smsCode,
                    orderId: this.state.orderId
                },
                error: function error() {},
                timeout: 60000,
                success: function success(res) {

                    console.log(res);

                    if (res.result == '0') {
                        window.location.href = 'my-order.html';
                    }
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'order-detail-main' },
                React.createElement(
                    'div',
                    { className: 'main' },
                    React.createElement(
                        'div',
                        { className: 'order-content' },
                        React.createElement(
                            'div',
                            { className: 'o-t' },
                            '订单详情'
                        ),
                        React.createElement(
                            'div',
                            { className: 'o-info' },
                            React.createElement(
                                'div',
                                null,
                                '商品名称:',
                                this.state.orderName
                            ),
                            React.createElement(
                                'div',
                                null,
                                '订单号:',
                                this.state.orderNo
                            ),
                            React.createElement(
                                'div',
                                { className: 'info-pay' },
                                React.createElement(
                                    'div',
                                    { className: 'left' },
                                    React.createElement(
                                        'div',
                                        null,
                                        ' '
                                    ),
                                    React.createElement(
                                        'div',
                                        null,
                                        '请在',
                                        React.createElement(
                                            'span',
                                            { style: { color: '#fd657a', fontSize: '20px' } },
                                            React.createElement('span', {
                                                id: 'time2' })
                                        ),
                                        ' 完成支付 ',
                                        React.createElement(
                                            'span',
                                            {
                                                style: { color: '#c6c6c6' } },
                                            '(逾期将会取消订单)'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'right' },
                                    React.createElement(
                                        'div',
                                        null,
                                        '本次自付金额:',
                                        React.createElement(
                                            'span',
                                            {
                                                style: { color: '#fd657a', fontSize: '20px' } },
                                            this.state.downpayAmount
                                        ),
                                        '元'
                                    ),
                                    React.createElement(
                                        'div',
                                        null,
                                        '本次信用支付: ',
                                        React.createElement(
                                            'span',
                                            {
                                                style: { color: '#25a9f4', fontSize: '20px' } },
                                            this.state.creditPay
                                        ),
                                        '元'
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: '_sub', style: { display: this.state.isxingyong ? 'none' : 'block' } },
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
                                        { style: { paddingLeft: '40px', width: '778px' } },
                                        React.createElement('img', { src: '../static/images/my-pay/pay1.png', alt: '' })
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: '_btn', onClick: this.alipayTrade.bind(this),
                                            style: { padding: '7px', borderRadius: '0' } },
                                        '去支付'
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: '_sub', style: { display: this.state.isxingyong ? 'block' : 'none' } },
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
                                    { className: 'xinyong-pay' },
                                    React.createElement(
                                        'div',
                                        { className: 'note' },
                                        '短信验证码已发送到您的手机'
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'phone' },
                                        this.state.starPhone
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'yzm' },
                                        React.createElement(
                                            'div',
                                            null,
                                            React.createElement('input', { type: 'text', value: this.state.smsCode,
                                                onChange: this.handleChange.bind(this), placeholder: '请输入短信验证码' })
                                        ),
                                        React.createElement(
                                            'div',
                                            { ref: 'info', onClick: this.handleClick.bind(this),
                                                disabled: this.state.disabled },
                                            this.state.text
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        null,
                                        React.createElement(
                                            'div',
                                            { className: '_btn', onClick: this.userOrder.bind(this),
                                                style: {
                                                    borderRadius: '0',
                                                    padding: '8px 0',
                                                    fontSize: '14px',
                                                    width: '210px'
                                                } },
                                            '确定并信用支付'
                                        )
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'knowing-agreeing' },
                            React.createElement('img', { src: '../static/images/kown.png', alt: '' }),
                            React.createElement(
                                'div',
                                null,
                                '确认支付即表示您已阅读并同意 ',
                                React.createElement(
                                    'span',
                                    null,
                                    '分期服务协议'
                                ),
                                '、',
                                React.createElement(
                                    'span',
                                    null,
                                    '借款协议'
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return R_MyOrderDetail;
}(React.Component);