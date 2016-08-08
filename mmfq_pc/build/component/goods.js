'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_Goods = function (_React$Component) {
    _inherits(R_Goods, _React$Component);

    function R_Goods() {
        _classCallCheck(this, R_Goods);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(R_Goods).call(this));

        _this2.state = {
            json: [],
            t_startTime: '',
            t_endTime: '',

            text: '',
            h: '',
            m: '',
            s: '',
            leftOrRight: '0'

        };
        return _this2;
    }

    _createClass(R_Goods, [{
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
        key: 'today_fast',
        value: function today_fast(start, end) {

            this.setState({
                leftOrRight: '0'
            });

            var jsonData = {
                index: '1',
                startTime: start,
                endTime: end
            };
            this.http('/pc/computer/query_flashSaleGoodsList_pc', jsonData, function (res) {

                console.log(res);
                this.setState({
                    json: res.data.flashSaleGoodsItemList
                });
            }.bind(this));
        }
    }, {
        key: 'more',
        value: function more() {
            var jsonData = {
                index: '2',
                startTime: this.state.t_startTime,
                endTime: this.state.t_endTime
            };
            this.http('/pc/computer/query_flashSaleGoodsList_pc', jsonData, function (res) {
                this.setState({
                    json: res.data.flashSaleGoodsItemList
                });
            }.bind(this));
        }
    }, {
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
                done: function (data) {

                    // console.log(data)

                    this.setState({
                        h: data[1],
                        m: data[2],
                        s: data[3]
                    });
                }.bind(this),
                callback: function callback() {
                    // window.location.reload()
                }
            });
        }
    }, {
        key: 'compareTime',
        value: function compareTime() {
            var compareTime = new Date();

            if (compareTime.getHours() >= 10) {
                var before = compareTime.Format('yyyy-MM-dd 23:59:59');
                this.init(before);
                this.setState({
                    text: '距离结束仅剩'
                });

                return;
            }

            var after = compareTime.Format('yyyy-MM-dd 10:00:00');
            this.init(after);
            this.setState({
                text: '距离开始仅剩'
            });
        }
    }, {
        key: 'tm_fast',
        value: function tm_fast() {

            this.setState({
                leftOrRight: '1'
            });

            // $('.activity-title >div > div:nth-child(2)').eq(1).addClass('_cb').siblings('div').removeClass('_cb')
            var compareTime = new Date(),
                start,
                end,
                tm;

            tm = compareTime.setDate(compareTime.getDate() + 1);

            start = this.timeStamp2String(tm);

            end = this.timeStamp3String(tm);
            var jsonData = {
                index: '1',
                startTime: start,
                endTime: end
            };
            this.http('/pc/computer/query_flashSaleGoodsList_pc', jsonData, function (res) {

                console.log(res);
                this.setState({
                    json: res.data.flashSaleGoodsItemList
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
            var hour = '00';
            var minute = '00';
            var second = '00';
            return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
        }
    }, {
        key: 'timeStamp3String',
        value: function timeStamp3String(time) {
            var datetime = new Date();
            datetime.setTime(time);
            var year = datetime.getFullYear();
            var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
            var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
            var hour = '23';
            var minute = '59';
            var second = '59';
            return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
        }
    }, {
        key: 'timeStamp4String',
        value: function timeStamp4String(time) {
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

            Date.prototype.Format = function (fmt) {
                //author: meizz
                var o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "h+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds(), //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o) {
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }return fmt;
            };

            var startTime = new Date(),
                start,
                end;

            console.log(startTime);

            var timestamp = Date.parse(new Date()),
                timestamp = timestamp / 1000;

            console.log("当前时间戳为：" + timestamp - 123);

            start = startTime.Format('yyyy-MM-dd 00:00:00');
            end = startTime.Format('yyyy-MM-dd 23:59:59');
            this.setState({
                t_startTime: start,
                t_endTime: end
            });

            this.today_fast(start, end);

            this.compareTime();
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                { className: 'goods-main' },
                React.createElement(
                    'div',
                    { className: 'main' },
                    React.createElement('img', { src: '../static/images/goods/xianshi_banner.jpg' })
                ),
                React.createElement(
                    'div',
                    { className: 'goods-date' },
                    React.createElement(
                        'div',
                        { className: '_main' },
                        React.createElement(
                            'div',
                            { className: 'left' },
                            React.createElement(
                                'div',
                                { className: 'today-time' },
                                React.createElement(
                                    'div',
                                    { style: { background: 'none', marginRight: '0' } },
                                    this.state.text
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'ooo', style: { color: '#fd657a' } },
                                    this.state.h
                                ),
                                '时',
                                React.createElement(
                                    'div',
                                    { className: 'ooo', style: { color: '#fd657a' } },
                                    this.state.m
                                ),
                                '分',
                                React.createElement(
                                    'div',
                                    { className: 'ooo' },
                                    this.state.s
                                )
                            ),
                            React.createElement(
                                'div',
                                { style: { color: '#999' } },
                                '每日10：00-24：00 开抢'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'right' },
                            React.createElement('img', { src: '../static/images/goods/three.png', alt: '' })
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'activity-main' },
                    React.createElement(
                        'div',
                        { className: 'activity-title' },
                        this.state.leftOrRight == 0 ? React.createElement(
                            'div',
                            { className: 'left',
                                onClick: this.today_fast.bind(this, this.state.t_startTime, this.state.t_endTime) },
                            React.createElement(
                                'div',
                                { style: { height: '66px' } },
                                React.createElement(
                                    'div',
                                    { className: 't-content bg' },
                                    React.createElement(
                                        'div',
                                        { className: 'today-seckilling' },
                                        React.createElement(
                                            'p',
                                            { style: { color: '#fff' } },
                                            '今日秒杀'
                                        )
                                    )
                                ),
                                React.createElement('div', { className: '_cb' })
                            )
                        ) : React.createElement(
                            'div',
                            { className: 'left',
                                onClick: this.today_fast.bind(this, this.state.t_startTime, this.state.t_endTime) },
                            React.createElement(
                                'div',
                                { style: { height: '66px' } },
                                React.createElement(
                                    'div',
                                    { className: 't-content bd2' },
                                    React.createElement(
                                        'div',
                                        { className: 'today-seckilling' },
                                        React.createElement(
                                            'p',
                                            { style: { color: '#000' } },
                                            '今日秒杀'
                                        )
                                    )
                                )
                            )
                        ),
                        this.state.leftOrRight == 1 ? React.createElement(
                            'div',
                            { className: 'right', onClick: this.tm_fast.bind(this) },
                            React.createElement(
                                'div',
                                { style: { height: '66px' } },
                                React.createElement(
                                    'div',
                                    { className: 'tm bg' },
                                    React.createElement(
                                        'div',
                                        { className: 'tm-seckilling' },
                                        React.createElement(
                                            'p',
                                            { style: { color: '#fff' } },
                                            '明日秒杀'
                                        )
                                    )
                                ),
                                React.createElement('div', { className: '_cb' })
                            )
                        ) : React.createElement(
                            'div',
                            { className: 'right', onClick: this.tm_fast.bind(this) },
                            React.createElement(
                                'div',
                                { style: { height: '66px' } },
                                React.createElement(
                                    'div',
                                    { className: 'tm bd' },
                                    React.createElement(
                                        'div',
                                        { className: 'tm-seckilling' },
                                        React.createElement(
                                            'p',
                                            null,
                                            '明日秒杀'
                                        )
                                    )
                                ),
                                React.createElement('div', null)
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'activity-content' },
                        this.state.json.map(function (json) {

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
                )
            );
        }
    }]);

    return R_Goods;
}(React.Component);