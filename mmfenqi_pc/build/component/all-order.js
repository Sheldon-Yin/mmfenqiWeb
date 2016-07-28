/**
 * Created by sheldon on 2016/7/19.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_AllOrder = function (_React$Component) {
    _inherits(R_AllOrder, _React$Component);

    function R_AllOrder(props) {
        _classCallCheck(this, R_AllOrder);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(R_AllOrder).call(this, props));

        _this.state = {
            data: [],
            myOrderResponse: [],
            abc: [],
            paid_number: '', // 待支付数量
            completed_number: '', // 已支付数量
            using_number: '', //已完成数量
            cancel_number: '', //已取消数量
            refund_number: '', //refund_number
            id: '',
            pic_img: [],

            index: 1 };
        return _this;
    }

    _createClass(R_AllOrder, [{
        key: 'loadComments',
        value: function loadComments(orderStatus) {
            var _this2 = this;

            if (orderStatus == '-1') {
                $('.top ul li').eq(0).addClass('color_fd').siblings('li').removeClass('color_fd');
            } else {

                $('.top ul li').eq(orderStatus).addClass('color_fd').siblings('li').removeClass('color_fd');
            }

            var jsonData = {
                orderStatus: orderStatus
            };
            $.ajax({
                type: 'post',
                url: '/pc/computer/query_my_order',
                data: jsonData,
                dataType: 'json',
                success: function success(data) {
                    _this2.setState({
                        data: data,
                        myOrderResponse: data.data.myOrderResponse,
                        paid_number: data.data.paid_number,
                        completed_number: data.data.completed_number,
                        using_number: data.data.using_number,
                        cancel_number: data.data.cancel_number,
                        refund_number: data.data.refund_number
                    });
                }

            });
        }
    }, {
        key: 'detail',
        value: function detail(id) {
            window.open('my-detail.html?id=' + id + '');
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.loadComments('-1');
        }
    }, {
        key: 'getType',
        value: function getType(orderStatus) {
            switch (orderStatus) {
                case '1':
                    return '待支付';
                    break;
                case '2':
                    return '已支付';
                    break;
                case '3':
                    return '已完成';
                    break;
                case '4':
                    return '已取消';
                case '5':
                    return '退款审核中';
                case '6':
                    return '退款成功';
            }
        }

        /*上传按钮*/

    }, {
        key: '_uploadBtn',
        value: function _uploadBtn(id) {

            this.setState({
                id: id
            });

            $('._layer').css('display', 'block');

            this.look_informed_consent(id);
        }

        /*删除知情同意书*/

    }, {
        key: 'delete_img',
        value: function delete_img(i) {
            console.log(i);
            var jsonData = {
                index: i + 1,
                orderId: this.state.id
            };
            $.ajax({
                type: 'post',
                url: '/pc/computer/del_informed_consent',
                data: jsonData,
                dataType: 'json',
                success: function (res) {

                    if (res.result == '0') {

                        console.log(this.state.pic_img);

                        // this.setState({
                        //     pic_img: this.state.pic_img.splice(i,i+1)
                        // })

                        $("#" + i).remove();

                        this.look_informed_consent(this.state.id);
                    }
                }.bind(this)
            });
        }

        /*确定上传*/

    }, {
        key: 'confirm_upload',
        value: function confirm_upload() {
            var _this3 = this;

            var jsonData = {
                orderId: this.state.id
            };

            $.ajax({
                type: 'post',
                url: '/pc/computer/confirm_upload',
                data: jsonData,
                dataType: 'json',
                success: function success(data) {

                    if (data.result == '0') {

                        _this3.setState({
                            pic_img: []
                        });

                        $('._layer').css('display', 'none');

                        window.location.reload();
                    }
                }
            });
        }

        /*查看知情同意书*/

    }, {
        key: 'look_informed_consent',
        value: function look_informed_consent(id) {
            var jsonData = {
                orderId: id

            };

            $.ajax({
                url: '/pc/computer/query_informed_consent',
                type: 'post',
                data: jsonData,
                dataType: 'json',
                success: function (res) {
                    if (res.result == '0') {
                        var index_l = res.data.informedConsent.length;

                        this.setState({
                            pic_img: res.data.informedConsent,
                            index: ++index_l
                        });
                    }
                }.bind(this)
            });
        }
    }, {
        key: 'cancle',
        value: function cancle() {
            $('._layer').css('display', 'none');
        }
        /*选择图片上传*/

    }, {
        key: '_upload',
        value: function _upload() {

            var data = new FormData();
            data.append('orderId', this.state.id);
            data.append('index', this.state.index);
            data.append('informedConsentPic', $("#_file")[0].files[0]);

            console.log($("#_file")[0].files[0]);
            //console.log(new FormData($('#uploadForm')[0]));
            var json = {
                informedConsentPic: $("#_file")[0].files[0],
                orderId: this.state.id,
                index: 1

            };

            console.log(this.state);

            $.ajax({
                url: '/pc/computer/upload_informed_consent',
                type: 'post',
                data: data,
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res.result == '0') {
                        this.setState({
                            pic_img: this.state.pic_img.concat(res.data.informedConsentPicUrl)
                        });

                        this.look_informed_consent(this.state.id);
                    }
                }.bind(this)
            });
        }

        /*取消订单*/

    }, {
        key: 'cancel_order',
        value: function cancel_order(id) {

            this.setState({
                id: id
            });

            layer.open({
                title: '请填写取消原因',
                type: 1,
                shade: 0.3,
                closeBtn: 1, //不显示关闭按钮
                btn: ['取消', '确认'],
                area: ['400px', '180'],
                content: '<div><p><img src="../../build/static/images/ca_od.jpg" alt="" style="vertical-align: middle;"> 确认取消该订单？</p></div>',
                btn1: function btn1(index, layero) {
                    layer.closeAll();
                },
                btn2: function () {
                    var jsonData = {
                        orderId: this.state.id

                    };

                    $.ajax({
                        url: '/pc/computer/cancel_order',
                        type: 'post',
                        data: jsonData,
                        dataType: 'json',
                        success: function (res) {
                            console.log(res);
                            if (res.result == '0') {

                                layer.closeAll();

                                window.location.reload();
                            }
                        }.bind(this)
                    });
                }.bind(this),
                success: function success() {

                    $('.layui-layer').css({

                        'width': '400px',
                        'height': '180px',
                        'top': '50%',
                        'left': '50%',
                        'marginLeft': '-200px',
                        'marginTop': '-90px'
                    });
                }
            });
        }
        /*去支付*/

    }, {
        key: 'toPay',
        value: function toPay(id) {
            $.ajax({
                url: '/pc/computer/to_pay_order',
                type: 'post',
                data: { orderId: id },
                dataType: 'json',
                success: function (res) {
                    if (res.result == '0') {
                        console.log(res);

                        window.open('my-order-detail.html?orderId=' + res.data.orderInfo.orderId + '&orderNo=' + res.data.orderInfo.orderNo + '&orderName=' + res.data.orderInfo.orderName + '&downpayAmount=' + res.data.orderInfo.downpayAmount + '&creditPay=' + res.data.orderInfo.creditPay + '&telephone=' + res.data.orderInfo.telephone + '&starPhone=' + res.data.orderInfo.starPhone + '');
                    }
                }.bind(this)
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            console.log(this.state.pic_img);
            return React.createElement(
                'div',
                { style: { float: 'left' } },
                React.createElement(
                    'div',
                    { className: '_layer' },
                    React.createElement('div', { className: '_z' }),
                    React.createElement(
                        'div',
                        { className: 'aaa' },
                        React.createElement(
                            'div',
                            { className: 'header' },
                            React.createElement(
                                'div',
                                { className: 'title' },
                                '提示'
                            ),
                            React.createElement(
                                'div',
                                { className: 'cance', onClick: this.cancle.bind(this) },
                                'x'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'content' },
                            React.createElement(
                                'div',
                                null,
                                this.state.pic_img.map(function (img, i) {
                                    return React.createElement(
                                        'div',
                                        { className: 'img', key: i, id: i },
                                        React.createElement('img', { src: img }),
                                        React.createElement(
                                            'div',
                                            { className: 'delete-img', onClick: _this4.delete_img.bind(_this4, i) },
                                            'x'
                                        )
                                    );
                                }),
                                React.createElement(
                                    'div',
                                    { className: 'img' },
                                    React.createElement('img', { src: '../static/images/upload/upload.png', style: { position: 'relative' } }),
                                    React.createElement(
                                        'form',
                                        { action: '#', id: 'uploadForm' },
                                        React.createElement('input', { type: 'file', id: '_file', onChange: this._upload.bind(this) })
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'foot' },
                            React.createElement(
                                'div',
                                { className: 'btn', onClick: this.confirm_upload.bind(this) },
                                React.createElement('img', { src: '../static/images/upload/uplaod_btn.png' })
                            )
                        )
                    )
                ),
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
                                        { className: 'color_fd', onClick: this.loadComments.bind(this, '-1') },
                                        '所有订单'
                                    ),
                                    React.createElement(
                                        'li',
                                        { onClick: this.loadComments.bind(this, '1') },
                                        '待支付 ',
                                        React.createElement(
                                            'span',
                                            { style: { display: this.state.paid_number == 0 ? 'none' : 'inline-block' } },
                                            '(',
                                            this.state.paid_number,
                                            ')'
                                        )
                                    ),
                                    React.createElement(
                                        'li',
                                        { onClick: this.loadComments.bind(this, '2') },
                                        '已支付 ',
                                        React.createElement(
                                            'span',
                                            { style: { display: this.state.completed_number == 0 ? 'none' : 'inline-block' } },
                                            '(',
                                            this.state.completed_number,
                                            ')'
                                        )
                                    ),
                                    React.createElement(
                                        'li',
                                        { onClick: this.loadComments.bind(this, '3') },
                                        '已完成 ',
                                        React.createElement(
                                            'span',
                                            { style: { display: this.state.using_number == 0 ? 'none' : 'inline-block' } },
                                            '(',
                                            this.state.using_number,
                                            ')'
                                        )
                                    ),
                                    React.createElement(
                                        'li',
                                        { onClick: this.loadComments.bind(this, '4') },
                                        '已取消 ',
                                        React.createElement(
                                            'span',
                                            { style: { display: this.state.cancel_number == 0 ? 'none' : 'inline-block' } },
                                            '(',
                                            this.state.cancel_number,
                                            ')'
                                        )
                                    ),
                                    React.createElement(
                                        'li',
                                        { onClick: this.loadComments.bind(this, '5') },
                                        '退款/售后 ',
                                        React.createElement(
                                            'span',
                                            { style: { display: this.state.refund_number == 0 ? 'none' : 'inline-block' } },
                                            '(',
                                            this.state.refund_number,
                                            ')'
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'top-content' },
                                React.createElement(
                                    'div',
                                    { id: 'tab1' },
                                    React.createElement(
                                        'table',
                                        { cellSpacing: '0', cellPadding: '0', width: '100%', style: { border: '0' } },
                                        React.createElement(
                                            'thead',
                                            null,
                                            React.createElement(
                                                'tr',
                                                null,
                                                React.createElement(
                                                    'th',
                                                    { style: { width: 346 } },
                                                    '商品'
                                                ),
                                                React.createElement(
                                                    'th',
                                                    { style: { width: 108 } },
                                                    '首付金额(元)'
                                                ),
                                                React.createElement(
                                                    'th',
                                                    { style: { width: 80 } },
                                                    '分期数'
                                                ),
                                                React.createElement(
                                                    'th',
                                                    { style: { width: 128 } },
                                                    '信用支付(元)'
                                                ),
                                                React.createElement(
                                                    'th',
                                                    { style: { width: 123 } },
                                                    '订单状态'
                                                ),
                                                React.createElement(
                                                    'th',
                                                    { style: { width: 133 } },
                                                    '操作'
                                                )
                                            )
                                        ),
                                        this.state.myOrderResponse.map(function (data) {
                                            return React.createElement(
                                                'tbody',
                                                { key: data.orderId },
                                                React.createElement(
                                                    'tr',
                                                    null,
                                                    React.createElement(
                                                        'td',
                                                        { style: { collapse: 6 }, className: '_order' },
                                                        React.createElement(
                                                            'div',
                                                            { className: 'order-no' },
                                                            '订单号:',
                                                            data.orderNo
                                                        )
                                                    )
                                                ),
                                                React.createElement(
                                                    'tr',
                                                    { className: 'bg_bd' },
                                                    React.createElement(
                                                        'td',
                                                        null,
                                                        React.createElement(
                                                            'div',
                                                            { className: 'goods-info' },
                                                            React.createElement(
                                                                'div',
                                                                { className: 'goods-info-left' },
                                                                React.createElement('img', { src: data.goodsPic, width: '100%',
                                                                    height: '100%' })
                                                            ),
                                                            React.createElement(
                                                                'div',
                                                                { className: 'goods-info-right' },
                                                                React.createElement(
                                                                    'li',
                                                                    null,
                                                                    data.goodsName
                                                                ),
                                                                React.createElement(
                                                                    'li',
                                                                    null,
                                                                    '杭州杭州杭州杭州'
                                                                ),
                                                                React.createElement(
                                                                    'li',
                                                                    null,
                                                                    '单价:￥',
                                                                    data.orderPrice
                                                                )
                                                            )
                                                        )
                                                    ),
                                                    React.createElement(
                                                        'td',
                                                        null,
                                                        React.createElement(
                                                            'li',
                                                            null,
                                                            data.downpayAmount
                                                        )
                                                    ),
                                                    React.createElement(
                                                        'td',
                                                        null,
                                                        React.createElement(
                                                            'li',
                                                            null,
                                                            data.staging
                                                        )
                                                    ),
                                                    React.createElement(
                                                        'td',
                                                        null,
                                                        React.createElement(
                                                            'li',
                                                            null,
                                                            data.creditPay
                                                        )
                                                    ),
                                                    React.createElement(
                                                        'td',
                                                        null,
                                                        React.createElement(
                                                            'li',
                                                            null,
                                                            _this4.getType(data.orderStatus)
                                                        ),
                                                        React.createElement(
                                                            'li',
                                                            { className: 'color_999',
                                                                onClick: _this4.detail.bind(_this4, data.orderId) },
                                                            '订单详情'
                                                        )
                                                    ),
                                                    React.createElement(
                                                        'td',
                                                        null,
                                                        React.createElement(
                                                            'li',
                                                            { className: data.orderStatus == '2' },
                                                            React.createElement(
                                                                'a',
                                                                { href: '#', className: 'pay', style: { display: data.projectReviewStatus == 0 ? 'inline' : 'none' }, onClick: _this4._uploadBtn.bind(_this4, data.orderId) },
                                                                '上传知情同意书'
                                                            ),
                                                            React.createElement(
                                                                'a',
                                                                { href: '#', className: '', style: { display: data.projectReviewStatus == 1 ? 'inline' : 'none' } },
                                                                '知情同意书待审核'
                                                            ),
                                                            React.createElement(
                                                                'a',
                                                                { href: '#', className: '', style: { display: data.projectReviewStatus == 2 ? 'inline' : 'none' } },
                                                                '知情同意书审核不通过'
                                                            ),
                                                            React.createElement(
                                                                'a',
                                                                { href: '#', className: '', style: { display: data.projectReviewStatus == 3 ? 'inline' : 'none' } },
                                                                '知情同意书审核通过'
                                                            )
                                                        ),
                                                        React.createElement(
                                                            'li',
                                                            { className: data.orderStatus == '3' },
                                                            React.createElement(
                                                                'a',
                                                                { href: "goods-detail.html?goodsId=" + data.goodsId, target: '_blank' },
                                                                '再去购买'
                                                            )
                                                        ),
                                                        React.createElement(
                                                            'li',
                                                            { className: data.orderStatus == '4' },
                                                            React.createElement(
                                                                'a',
                                                                { href: 'goods-detail.html?goodsId=\'++\'' },
                                                                '重新购买'
                                                            )
                                                        ),
                                                        React.createElement(
                                                            'li',
                                                            { className: data.orderStatus == '1' },
                                                            React.createElement(
                                                                'a',
                                                                { href: '#', className: 'pay', onClick: _this4.toPay.bind(_this4, data.orderId) },
                                                                '去支付'
                                                            )
                                                        ),
                                                        React.createElement(
                                                            'li',
                                                            { className: data.orderStatus == '1' },
                                                            React.createElement(
                                                                'a',
                                                                { href: '#', onClick: _this4.cancel_order.bind(_this4, data.orderId) },
                                                                '取消订单'
                                                            )
                                                        )
                                                    )
                                                )
                                            );
                                        })
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return R_AllOrder;
}(React.Component);