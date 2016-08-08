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

            length: '-1',

            index: 1, //上传所需

            blockOrnone: false

        };

        _this.config = {
            width: '400px',
            height: '400px',
            position: 'fixed',
            zIndex: 10,
            marginLeft: '-200px',
            left: '50%',
            top: '50%',
            marginTop: '-200px'
        };

        _this.content = {
            position: 'relative',
            backgroundColor: '#FFFFff',
            minHeight: 100,
            textAlign: 'left'
        };

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
                    console.log(data);
                    _this2.setState({
                        data: data,
                        myOrderResponse: data.data.myOrderResponse,
                        paid_number: data.data.paid_number,
                        completed_number: data.data.completed_number,
                        using_number: data.data.using_number,
                        cancel_number: data.data.cancel_number,
                        refund_number: data.data.refund_number,
                        length: data.data.myOrderResponse.length
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

        /*取消订单*/

    }, {
        key: 'cancel_order',
        value: function cancel_order(id) {

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
                btn2: function (index, layero) {
                    var jsonData = {
                        orderId: id

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

        /*确定*/
        //
        // yescb() {
        //     var jsonData = {
        //         orderId: this.state.id,
        //     };
        //
        //     $.ajax({
        //         url: '/pc/computer/cancel_order',
        //         type: 'post',
        //         data: jsonData,
        //         dataType: 'json',
        //         success: function (res) {
        //             console.log(res);
        //             if (res.result == '0') {
        //
        //
        //                 this.setState({
        //                     blockOrnone:false
        //                 });
        //                 window.location.reload();
        //             }
        //         }.bind(this)
        //     });
        // }

    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            console.log(this.state.pic_img);

            console.log(this.state.blockOrnone);
            var length = this.state.length;
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
                                        { className: 'color_fd', onClick: this.loadComments.bind(this, '-1') },
                                        '所有订单'
                                    ),
                                    React.createElement(
                                        'li',
                                        { onClick: this.loadComments.bind(this, '1') },
                                        '待支付 ',
                                        React.createElement(
                                            'span',
                                            {
                                                style: { display: this.state.paid_number == 0 ? 'none' : 'inline-block' } },
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
                                            {
                                                style: { display: this.state.completed_number == 0 ? 'none' : 'inline-block' } },
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
                                            {
                                                style: { display: this.state.using_number == 0 ? 'none' : 'inline-block' } },
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
                                            {
                                                style: { display: this.state.cancel_number == 0 ? 'none' : 'inline-block' } },
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
                                            {
                                                style: { display: this.state.refund_number == 0 ? 'none' : 'inline-block' } },
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
                                length == -1 ? React.createElement('div', null) : length == 0 ? React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        'div',
                                        { style: { width: '150px', float: 'left', 'minHeight': 500 } },
                                        React.createElement(
                                            'ul',
                                            null,
                                            React.createElement(
                                                'li',
                                                { style: { 'paddingTop': 10 } },
                                                '亲，暂还没有订单哦！'
                                            )
                                        )
                                    )
                                ) : React.createElement(
                                    'div',
                                    null,
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
                                                                    data.hospital
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
                                                            _this3.getType(data.orderStatus)
                                                        ),
                                                        React.createElement(
                                                            'li',
                                                            { className: 'color_999',
                                                                onClick: _this3.detail.bind(_this3, data.orderId) },
                                                            '订单详情'
                                                        )
                                                    ),
                                                    React.createElement(
                                                        'td',
                                                        null,
                                                        React.createElement(
                                                            'li',
                                                            { className: data.orderStatus == '2' },
                                                            React.createElement(R_Upload, { projectReviewStatus: data.projectReviewStatus, orderId: data.orderId }),
                                                            React.createElement(
                                                                'a',
                                                                { href: '#', className: '',
                                                                    style: { display: data.projectReviewStatus == 1 ? 'inline' : 'none' } },
                                                                '知情同意书待审核'
                                                            ),
                                                            React.createElement(
                                                                'a',
                                                                { href: '#', className: '',
                                                                    style: { display: data.projectReviewStatus == 3 ? 'inline' : 'none' } },
                                                                '知情同意书审核不通过'
                                                            ),
                                                            React.createElement(
                                                                'a',
                                                                { href: '#', className: '',
                                                                    style: { display: data.projectReviewStatus == 2 ? 'inline' : 'none' } },
                                                                '知情同意书审核通过'
                                                            )
                                                        ),
                                                        React.createElement(
                                                            'li',
                                                            { className: data.orderStatus == '3' && data.isCanBuy == true },
                                                            React.createElement(
                                                                'a',
                                                                { href: "goods-detail.html?goodsId=" + data.goodsId,
                                                                    target: '_blank' },
                                                                '再去购买'
                                                            )
                                                        ),
                                                        React.createElement(
                                                            'li',
                                                            { className: data.orderStatus == '4' && data.isCanBy == true },
                                                            React.createElement(
                                                                'a',
                                                                { href: "goods-detail.html?goodsId=" + data.goodsId,
                                                                    target: '_blank' },
                                                                '重新购买'
                                                            )
                                                        ),
                                                        React.createElement(
                                                            'li',
                                                            { className: data.orderStatus == '1' },
                                                            React.createElement(
                                                                'a',
                                                                { href: '#', className: 'pay',
                                                                    onClick: _this3.toPay.bind(_this3, data.orderId) },
                                                                '去支付'
                                                            )
                                                        ),
                                                        React.createElement(
                                                            'li',
                                                            { className: data.orderStatus == '1' },
                                                            React.createElement(
                                                                'a',
                                                                { href: '#',
                                                                    onClick: _this3.cancel_order.bind(_this3, data.orderId) },
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