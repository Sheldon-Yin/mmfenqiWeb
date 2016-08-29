/**
 * Created by ChinaHp on 2016/7/8.
 */
angular.module('app')
    .service('commonService', ['$resource', '$state', function ($resource, $state) {
        return {
            init: function () {
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


                var getDefaultTime = function (intNumber) {
                    var date = new Date(), start, end;
                    end = date.Format("yyyy-MM-dd");
                    date.setMonth(date.getMonth() - intNumber);
                    start = date.Format("yyyy-MM-dd");
                    return {
                        start: start,
                        end: end
                    }
                };

                var datetime = {
                    time_start: getDefaultTime(1).start,
                    time_end: getDefaultTime(1).end
                };

                return datetime;
            },
            _layer:function (msg,cb) {

                    layer.open({
                        title: '提示',
                        type: 1,
                        shade: 0.3,
                        skin: 'sure', //样式类名
                        closeBtn: 1, //不显示关闭按钮
                        btn: ['确定'],
                        area: ['350px', '200px'],
                        content: msg,
                        btn1:function (index,layero) {
                            cb();
                            layer.closeAll();


                        }

                    });
                },
            _layer2:function (cb) {
                layer.open({
                    title: '请填写取消原因',
                    type: 1,
                    shade: 0.3,
                    closeBtn: 1, //不显示关闭按钮
                    btn: ['取消', '确认'],
                    area: ['400px', '400px'],
                    content: $("#stuNo").html(),
                    btn1: function (index, layero) {
                        layer.closeAll();
                    },
                    btn2: function () {
                        cb();
                        layer.closeAll();
                    }
                })

            },

            _layer3:function (cb) {
                layer.open({
                    title: '请填写取消原因',
                    type: 1,
                    shade: 0.3,
                    closeBtn: 1, //不显示关闭按钮
                    btn: ['取消', '确认'],
                    area: ['400px', '400px'],
                    content: $("#whitecollarNo").html(),
                    btn1: function (index, layero) {
                        layer.closeAll();
                    },
                    btn2: function () {
                        cb();
                        layer.closeAll();
                    }
                })

            },
            layer_policyNo:function (cb) {
                layer.open({
                    title: '添加保单号',
                    type: 1,
                    shade: 0.3,
                    closeBtn: 1, //不显示关闭按钮
                    btn: ['取消', '确认'],
                    area: ['400px', 'auto'],
                    content: $("#policyNo").html(),
                    btn1: function (index, layero) {
                        layer.closeAll();
                    },
                    btn2: function () {
                        cb();
                        layer.closeAll();
                    },
                    success:function () {
                        $("#policyNo_contnet").css('padding','20px 30px');
                       $(".layui-layer-content").css('height','68px');
                    }
                })

            },
            layer_refund:function (msg,cb) {
                layer.open({
                    title: '提示',
                    type: 1,
                    shade: 0.3,
                    closeBtn: 1, //不显示关闭按钮
                    btn: ['取消', '确定'],
                    area: ['400px', 'auto'],
                    content: msg,
                    btn1: function (index, layero) {
                        layer.closeAll();
                    },
                    btn2: function () {
                        cb();
                        layer.closeAll();
                    }
                })

            }


        }
    }]);
