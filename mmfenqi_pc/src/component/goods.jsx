'use strict';

class R_Goods extends React.Component {

    constructor() {
        super();
        this.state = {
            json: [],
            t_startTime: '',
            t_endTime: '',

            text: '',
            h: '',
            m: '',
            s: '',
            leftOrRight: '0',

        }
    }


    http(url, jsonData, cb) {
        $.ajax({
            type: 'post',
            url: url,
            data: jsonData,
            dataType: 'json',
            success: function (res) {
                if (res.result == 0) {
                    return cb(res)
                } else if (res.result == 1013) {
                    alert(333)
                }
            }
        })
    }

    today_fast(start, end) {

        this.setState({
            leftOrRight:'0'
        });


        var jsonData = {
            index: '1',
            startTime: start,
            endTime: end
        };
        this.http('/pc/computer/query_flashSaleGoodsList_pc', jsonData, function (res) {
            this.setState({
                json: res.data.flashSaleGoodsItemList
            })
        }.bind(this));

    }

    more() {
        var jsonData = {
            index: '2',
            startTime: this.state.t_startTime,
            endTime: this.state.t_endTime
        };
        this.http('/pc/computer/query_flashSaleGoodsList_pc', jsonData, function (res) {
            this.setState({
                json: res.data.flashSaleGoodsItemList
            })
        }.bind(this));
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

                // console.log(data)

                this.setState({
                    h: data[1],
                    m: data[2],
                    s: data[3]
                });

            }.bind(this),
            callback: function () {
                // window.location.reload()
            }
        })


    }

    compareTime() {
        var compareTime = new Date();


        if (compareTime.getHours() >= 10) {
            var before = compareTime.Format('yyyy-MM-dd 23:59:59');
            this.init(before);
            this.setState({
                text: '结束'
            });

            return;
        }

        var after = compareTime.Format('yyyy-MM-dd 10:00:00');
        this.init(after);
        this.setState({
            text: '开始'
        });
    }

    tm_fast() {


        this.setState({
            leftOrRight:'1'
        });




        // $('.activity-title >div > div:nth-child(2)').eq(1).addClass('_cb').siblings('div').removeClass('_cb')
        var compareTime = new Date(), start, end, tm;


        tm = compareTime.setDate(compareTime.getDate() + 1);

        start = this.timeStamp2String(tm);

        end = this.timeStamp3String(tm);
        var jsonData = {
            index: '1',
            startTime: start,
            endTime: end
        };
        this.http('/pc/computer/query_flashSaleGoodsList_pc', jsonData, function (res) {
            this.setState({
                json: res.data.flashSaleGoodsItemList
            })
        }.bind(this));
    }


    timeStamp2String(time) {
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

    timeStamp3String(time) {
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

    timeStamp4String(time) {
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


    componentDidMount() {

        Date.prototype.Format = function (fmt) { //author: meizz
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
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        };

        var startTime = new Date(), start, end;

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

        this.compareTime()

    }

    render() {



        return (
            <div className="goods-main">
                <div className="main">
                    <img src="../static/images/goods/xianshi_banner.jpg"/>
                </div>
                <div className="goods-date">
                    <div className="_main">
                        <div className="left">
                            {/*今日限时抢*/}
                            {/*<div id="time2"></div>*/}

                            {/*/!*<div>12</div>*!/*/}
                            {/*/!*时*!/*/}
                            {/*/!*<div>12</div>*!/*/}
                            {/*/!*分*!/*/}
                            {/*/!*<div>12</div>*!/*/}

                        </div>
                        <div className="right">
                            <img src="../static/images/goods/three.png" alt=""/>
                        </div>

                    </div>

                </div>

                <div className="activity-main">
                    <div className="activity-title">




                            {this.state.leftOrRight == 0 ?

                                <div className="left _bg"
                                     onClick={this.today_fast.bind(this, this.state.t_startTime, this.state.t_endTime)}>
                                    <div className="t-content">
                                        <div className="today-seckilling">
                                            <p style={{color:'#fff'}}>今日秒杀</p>

                                            <p>14:00-16:00</p>

                                        </div>

                                        <div className="today-time">
                                            <div style={{background: 'none'}}>{this.state.text}</div>

                                            <div>{this.state.h}</div>
                                            时
                                            <div>{this.state.m}</div>
                                            分
                                            <div>{this.state.s}</div>
                                        </div>
                                    </div>


                                </div>

                                :

                                <div className="left"
                                     onClick={this.today_fast.bind(this, this.state.t_startTime, this.state.t_endTime)}>
                                    <div className="t-content bd2">
                                        <div className="today-seckilling">
                                            <p style={{color: '#000'}}>今日秒杀</p>

                                            <p>14:00-16:00</p>

                                        </div>

                                        <div className="today-time">
                                            <div style={{background: 'none'}}>{this.state.text}</div>

                                            <div>{this.state.h}</div>
                                            时
                                            <div>{this.state.m}</div>
                                            分
                                            <div>{this.state.s}</div>
                                        </div>
                                    </div>


                                </div>
                            }


                            {this.state.leftOrRight == 1 ?

                                <div className="right _bg" onClick={this.tm_fast.bind(this)}>

                                    <div className="tm">
                                        <div className="tm-seckilling">
                                            <p>明日秒杀</p>
                                            <p>14:00-16:00</p>
                                        </div>
                                    </div>

                                </div>

                                :

                                <div className="right" onClick={this.tm_fast.bind(this)}>

                                    <div className="tm bd">
                                        <div className="tm-seckilling">
                                            <p>明日秒杀</p>
                                            <p>14:00-16:00</p>
                                        </div>
                                    </div>

                                </div>
                            }


                    </div>
                    <div className="activity-content">

                        {
                            this.state.json.map(json=> {


                                return <div className="one" key={json.hotItemName}>
                                    <ul>
                                        <li>
                                            <a href={json.goodsHerf}>
                                                <div className="top-img">
                                                    <img src="../static/images/goods/bit.png" alt=""/>
                                                </div>

                                                <div className="img">
                                                    <img src={json.goodsHerPic} alt=""/>
                                                </div>
                                                <div className="goods-info">
                                                    <p>{json.hotItemName}</p>
                                                    <div>仅剩:{json.lastNumber}</div>
                                                    <p style={{padding: '10px'}}>
                                                        <span
                                                            style={{marginRight: '30px'}}>限时价: <b>￥{json.temporaryPrice}</b> </span>
                                                        <del>原价:￥{json.marketPrice}</del>

                                                    </p>
                                                    <div className="bg-img">
                                                        <div className="month-pay">
                                                            月供:￥{json.monthlyPrice}
                                                            <spna>x12</spna>
                                                        </div>


                                                        <div className="active"
                                                             style={{display: (Date.parse(new Date()) < json.teamEndTime) && ( Date.parse(new Date()) >= json.teamBeginTime) ? 'inline-block' : 'none'}}>

                                                            立即抢购
                                                        </div>

                                                        <div className="active"
                                                             style={{display: Date.parse(new Date()) < json.teamEndTime ? 'inline-block' : 'none'}}>

                                                            已结束
                                                        </div>

                                                        <div className="active"
                                                             style={{dispaly: Date.parse(new Date()) < json.teamBeginTime ? 'inline-block' : 'none'}}>
                                                            开始抢购
                                                        </div>


                                                    </div>


                                                </div>
                                                    </a>
                                                </li>
                                                </ul>

                                </div>

                            })
                        }









                    </div>
                </div>
            </div>
        )

    }



}
