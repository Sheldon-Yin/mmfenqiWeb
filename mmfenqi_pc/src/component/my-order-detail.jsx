'use strict';
class R_MyOrderDetail extends React.Component {


    constructor(props) {
        super(props);


        this.state = {
            isxingyong: false,
            orderId: '',
            orderNo: '',
            downpayAmount: '',
            orderName: '',
            creditPay: '',
            url: '',
            smsCode: '',//验证码

            telephone:'',
            starPhone:'',

            disabled: false,
            text: '获取验证码',
            timer: 60,



        }
    }

    init(time) {


        var setCountDown = {
            timer: null,
            init: function (opt) {
                var _this = this;
                this.setShowTime(opt.endtime, opt.done);
                this.timer = setInterval(function () {
                    _this.setShowTime(opt.endtime, opt.done, opt.callback)
                }, 1000);

                console.log(this.timer)
            },
            getCountdown: function (time) {
                var curShowTimeSecondsVal = this.getSecond(time) - this.getSecond();
                if (curShowTimeSecondsVal < 0) return [0, '00', '00', '00'];
                // console.log(curShowTimeSecondsVal)
                // 剩余秒数
                var curShowTimeSeconds = parseInt(curShowTimeSecondsVal % 60);
                // 计算剩余天数
                var curShowTimeDays = parseInt(curShowTimeSecondsVal / 3600 / 24);
                // 计算剩余小时
                var curShowTimeHours = parseInt((curShowTimeSecondsVal / 3600)) - curShowTimeDays * 24;
                // 计算剩余分钟
                var curShowTimeMinutes = parseInt((curShowTimeSecondsVal - parseInt((curShowTimeSecondsVal / 3600)) * 3600) / 60);
                curShowTimeHours = curShowTimeHours > 9 ? curShowTimeHours : '0' + curShowTimeHours;
                curShowTimeSeconds = curShowTimeSeconds > 9 ? curShowTimeSeconds : '0' + curShowTimeSeconds;
                curShowTimeMinutes = curShowTimeMinutes > 9 ? curShowTimeMinutes : '0' + curShowTimeMinutes;
                return [curShowTimeDays, curShowTimeHours, curShowTimeMinutes, curShowTimeSeconds];
            },
            getSecond: function (times) {
                if (times) {
                    var year = parseInt(times.slice(0, 4)),
                        month = parseInt(times.match(/-\d*/gi)[0].replace('-', '') - 1),
                        day = parseInt(times.match(/-\d*/gi)[1].replace('-', '')),
                        hour = parseInt(times.match(/\d*:/)[0].replace(':', '')),
                        minute = parseInt(times.match(/:\d*/)[0].replace(':', ''));
                    return (new Date(year, month, day, hour, minute, 0)).getTime() / 1000;
                }
                return (new Date()).getTime() / 1000;
            },
            setShowTime: function (endtime, done, callback) {
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
            done: function (data) {

                console.log(data);
                // console.log(data)
                document.getElementById('time2').innerHTML = '剩余时间：' + data[0] + '天' + data[1] + '小时' + data[2] + '分' + data[3] + '秒';
            },
            callback: function () {
                // window.location.reload()
            }
        })


    }

    timeStamp2String(time) {
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


    handleClick() {


        if (this.state.disabled) {
            return
        }

        $.ajax({
            type: "post",
            url: '/pc/computer/user_getcode',
            dataType: "json",
            data: {
                smsFmtId: 'payCredit',
                telephone: this.state.telephone
            },
            error: function () {
            },
            timeout: 60000,
            success: function (data) {


            }
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
                    timer: 60,
                });
                clearInterval(tm);
                return;
            }
            self.setState({
                disabled: true,
                text: tt + 's后重新获取',
                timer: tt
            })
        }, 1000);

    }


    weixinMchPay(downpayAmount, orderId) {
        let jsonData = {
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
                })

            }.bind(this)

        })
    }


    alipayTrade() {
        let downpayAmount = this.getUrl('downpayAmount');
        let orderId = this.getUrl('orderId');
        window.location.href = '/pc/alipayWeb/alipayTrade?downpayAmount=' + downpayAmount + '&orderId=' + orderId + '&type=' + 0 + '';
    }


    getUrl(key) {
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }


    componentDidMount() {

        var c = new Date();
        c.setHours(c.getHours() + 1);
        var a = this.timeStamp2String(c);
        this.init(a);

        let orderId = this.getUrl('orderId');
        let orderNo = this.getUrl('orderNo');
        let downpayAmount = this.getUrl('downpayAmount');
        let orderName = decodeURIComponent(this.getUrl('orderName'));
        let creditPay = this.getUrl('creditPay');
        let telephone = this.getUrl('telephone');
        let starPhone = this.getUrl('starPhone');

        if (downpayAmount == 0) {
            this.setState({
                isxingyong: true,
                orderId: orderId,
                orderNo: orderNo,
                downpayAmount: downpayAmount,
                orderName: orderName,
                creditPay: creditPay,
                telephone:telephone,
                starPhone:starPhone
            })
        } else {


            this.setState({
                isxingyong: false,
                orderId: orderId,
                orderNo: orderNo,
                downpayAmount: downpayAmount,
                orderName: orderName,
                creditPay: creditPay,
                telephone:telephone,
                starPhone:starPhone
            });


            this.weixinMchPay(downpayAmount, orderId)
        }


    }

    handleChange(e) {
        this.setState({smsCode: e.target.value});
    }

    userOrder(yzm) {
        $.ajax({
            type: "post",
            url: '/pc/computer/user_Order_Confirm_Pay',
            dataType: "json",
            data: {
                smsCode: this.state.smsCode,
                orderId: this.state.orderId
            },
            error: function () {
            },
            timeout: 60000,
            success: function (res) {

                console.log(res);

                if (res.result == '0') {
                    window.location.href = 'my-order.html';
                }

            }
        })

    }

    render() {
        return (
            <div className="order-detail-main">
                <div className="main">
                    <div className="order-content">
                        <div className="o-t">订单详情</div>
                        <div className="o-info">
                            <div>商品名称:{this.state.orderName}</div>
                            <div>订单号:{this.state.orderNo}</div>
                            <div className="info-pay">
                                <div className="left">
                                    <div>&nbsp;</div>
                                    <div>请在<span style={{color: '#fd657a', fontSize: '20px'}}><span
                                        id="time2"></span></span> 完成支付 <span
                                        style={{color: '#c6c6c6'}}>(逾期将会取消订单)</span></div>
                                </div>
                                <div className="right">
                                    <div>本次自付金额:<span
                                        style={{color: '#fd657a', fontSize: '20px'}}>{this.state.downpayAmount}</span>元
                                    </div>
                                    <div>本次信用支付: <span
                                        style={{color: '#25a9f4', fontSize: '20px'}}>{this.state.creditPay}</span>元
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="_sub" style={{display: this.state.isxingyong ? 'none' : 'block'}}>
                            <div className="pay-method">
                                选择支付方式
                            </div>
                            <div className="pay-content">
                                <div className="weChatPay">
                                    <div className="good">
                                        <img src="../static/images/my-pay/my-pay.png" alt=""/>
                                    </div>
                                    <div className="we-title">
                                        <div><img src="../static/images/my-pay/pay2.png" alt=""/></div>
                                        {/*<p>微信钱包支付</p>*/}
                                        {/*<p>银行卡，信用卡都可以使用哦!</p>*/}
                                    </div>
                                    <div className="weixinma">
                                        <div>
                                            <img src={this.state.url} style={{width: '100%', height: '100%'}}/>
                                        </div>
                                        <p>请使用微信扫描下方的二维码完成支付</p>
                                    </div>
                                </div>
                                <div className="alipay">
                                    <div style={{paddingLeft: '40px', width: '778px'}}>
                                        <img src="../static/images/my-pay/pay1.png" alt=""/>
                                        {/*<p>支付宝支付</p>*/}
                                        {/*<p>银行卡，信用卡都可以使用哦!</p>*/}
                                    </div>
                                    <div className="_btn" onClick={this.alipayTrade.bind(this)}
                                         style={{padding: '7px', borderRadius: '0'}}>去支付
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="_sub" style={{display: this.state.isxingyong ? 'block' : 'none'}}>
                            <div className="pay-method">
                                选择支付方式
                            </div>
                            <div className="pay-content">
                                <div className="xinyong-pay">
                                    <div className="note">短信验证码已发送到您的手机</div>
                                    <div className="phone">{this.state.starPhone}</div>
                                    <div className="yzm">
                                        <div><input type="text" value={this.state.smsCode}
                                                    onChange={this.handleChange.bind(this)} placeholder="请输入短信验证码"/>
                                        </div>
                                        <div ref="info" onClick={this.handleClick.bind(this)}
                                             disabled={this.state.disabled}>{this.state.text}</div>
                                    </div>
                                    <div>
                                        <div className="_btn" onClick={this.userOrder.bind(this)}
                                             style={{
                                                 borderRadius: '0',
                                                 padding: '8px 0',
                                                 fontSize: '14px',
                                                 width: '210px'
                                             }}>
                                            确定并信用支付
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="knowing-agreeing">
                            <img src="../static/images/kown.png" alt=""/>

                            <div>确认支付即表示您已阅读并同意 <span>分期服务协议</span>、<span>借款协议</span></div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}
