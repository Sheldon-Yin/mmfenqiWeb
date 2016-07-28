
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_MyDetail = function (_React$Component) {
    _inherits(R_MyDetail, _React$Component);

    function R_MyDetail() {
        _classCallCheck(this, R_MyDetail);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(R_MyDetail).call(this));

        _this.state = {
            data: [],
            orderDetailResponse: []
        };
        return _this;
    }

    _createClass(R_MyDetail, [{
        key: 'getDetail',
        value: function getDetail(orderId) {
            var _this2 = this;

            var jsonData = {
                orderId: orderId
            };
            $.ajax({
                type: 'post',
                url: '/pc/computer/query_order_detail',
                data: jsonData,
                dataType: 'json',
                success: function success(data) {
                    _this2.setState({
                        data: data,
                        orderDetailResponse: data.data.orderDetailResponse
                    });
                }

            });
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
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {

            var orderId = this.getUrl('id');

            this.getDetail(orderId);
        }
    }, {
        key: 'getUrl',
        value: function getUrl(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);return null;
        }
    }, {
        key: 'doUpload',
        value: function doUpload() {
            var formData = new FormData($("#uploadForm")[0]);
            var jsonData = {
                informedConsentPic: formData
            };

            $.ajax({
                url: '/pc/computer/upload_informed_consent',
                type: 'POST',
                data: jsonData,
                async: false,

                success: function success(returndata) {
                    alert(returndata);
                },
                error: function error(returndata) {
                    alert(returndata);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var json = this.state.orderDetailResponse;

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
                                        null,
                                        '订单详情'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'top-content' },
                                React.createElement(
                                    'div',
                                    { className: 'order-info' },
                                    '订单信息'
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'order-info-content',
                                        style: { display: json.orderStatus == '3' ? 'block' : 'none' } },
                                    React.createElement(
                                        'div',
                                        { className: 'left' },
                                        React.createElement(
                                            'div',
                                            { style: { paddingTop: '0' } },
                                            React.createElement(
                                                'ul',
                                                { style: { padding: '0', margin: '0' } },
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    json.orderId
                                                ),
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    '订单状态:',
                                                    React.createElement(
                                                        'span',
                                                        {
                                                            style: { color: '#3399eb' } },
                                                        this.getType(json.orderStatus)
                                                    )
                                                ),
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    '订单号:',
                                                    React.createElement(
                                                        'span',
                                                        null,
                                                        json.orderNo
                                                    )
                                                ),
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    '下单时间:',
                                                    React.createElement(
                                                        'span',
                                                        null,
                                                        json.createTime
                                                    )
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'one' },
                                            '1.你已消费完成，可以选择评价，让更多人了解该项目效果',
                                            React.createElement(
                                                'div',
                                                { className: '_btn', style: { marginLeft: '10px' } },
                                                '去支付'
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'two' },
                                            '2.你还可以购买该项目',
                                            React.createElement(
                                                'div',
                                                { className: '_btn', style: { marginLeft: '10px' } },
                                                '去支付'
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'order-info-content',
                                        style: { display: json.orderStatus == '4' ? 'block' : 'none' } },
                                    React.createElement(
                                        'div',
                                        { className: 'left' },
                                        React.createElement(
                                            'div',
                                            { style: { paddingTop: '0' } },
                                            React.createElement(
                                                'ul',
                                                { style: { padding: '0', margin: '0' } },
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    '订单状态:',
                                                    React.createElement(
                                                        'span',
                                                        {
                                                            style: { color: '#ff802c' } },
                                                        this.getType(json.orderStatus)
                                                    )
                                                ),
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    '订单号: ',
                                                    React.createElement(
                                                        'span',
                                                        null,
                                                        json.orderNo
                                                    )
                                                ),
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    '下单时间:',
                                                    React.createElement(
                                                        'span',
                                                        null,
                                                        json.createTime
                                                    )
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'one' },
                                            '1.你已取消该订单，如有什么疑问，请致电美眉分期电话：400-2635-599'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'two' },
                                            '2.如果误操作该订单，你仍可以支付该订单',
                                            React.createElement(
                                                'div',
                                                { className: '_btn', style: { marginLeft: '10px' } },
                                                '去支付'
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'order-info-content',
                                        style: { display: json.orderStatus == '2' ? 'block' : 'none' } },
                                    React.createElement(
                                        'div',
                                        { className: 'left' },
                                        React.createElement(
                                            'div',
                                            { style: { paddingTop: '0' } },
                                            React.createElement(
                                                'ul',
                                                { style: { padding: '0', margin: '0' } },
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    '订单状态:',
                                                    React.createElement(
                                                        'span',
                                                        {
                                                            style: { color: '#3399eb' } },
                                                        this.getType(json.orderStatus)
                                                    )
                                                ),
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    '订单号:',
                                                    React.createElement(
                                                        'span',
                                                        null,
                                                        json.orderNo
                                                    )
                                                ),
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    '下单时间:',
                                                    React.createElement(
                                                        'span',
                                                        null,
                                                        json.createTime
                                                    )
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'one' },
                                            '1.您已成功支付该订单，扫描美眉分期公众号或者下载美眉分期APP ',
                                            React.createElement('br', null),
                                            '2.到医院签署知情同意书，并通过公众号或者APP上传 ',
                                            React.createElement('br', null),
                                            '3.审核通过即可做该项目，如有疑问请致电：400-2635-599 ',
                                            React.createElement('br', null),
                                            '4.为防止医院价格变动，请在一周之内尽快去消费该项目 ',
                                            React.createElement('br', null)
                                        ),
                                        React.createElement(
                                            'div',
                                            { style: { padding: '10px 0' } },
                                            '查看该医院: ',
                                            React.createElement(
                                                'span',
                                                null,
                                                json.hospital
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: '_btn' },
                                            '上传知情同意书'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'right' },
                                        React.createElement(
                                            'div',
                                            null,
                                            React.createElement(
                                                'div',
                                                { className: '_dy' },
                                                React.createElement(
                                                    'p',
                                                    { style: { textAlign: 'center' } },
                                                    React.createElement('img', {
                                                        src: '../static/images/evaluate/conmon.jpg', alt: '' })
                                                ),
                                                React.createElement(
                                                    'p',
                                                    null,
                                                    '关注美眉分期订阅号'
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: '_gz' },
                                                React.createElement(
                                                    'p',
                                                    { style: { textAlign: 'center' } },
                                                    React.createElement('img', {
                                                        src: '../static/images/evaluate/conmon.jpg', alt: '' })
                                                ),
                                                React.createElement(
                                                    'p',
                                                    null,
                                                    '关注美眉分期订阅号'
                                                )
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'order-info-content',
                                        style: { display: json.orderStatus == '1' ? 'block' : 'none' } },
                                    React.createElement(
                                        'div',
                                        { className: 'left' },
                                        React.createElement(
                                            'div',
                                            { style: { paddingTop: '0' } },
                                            React.createElement(
                                                'ul',
                                                { style: { padding: '0', margin: '0' } },
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    '订单状态:',
                                                    React.createElement(
                                                        'span',
                                                        {
                                                            style: { color: '#3399eb' } },
                                                        this.getType(json.orderStatus)
                                                    )
                                                ),
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    '订单号:',
                                                    React.createElement(
                                                        'span',
                                                        null,
                                                        json.orderNo
                                                    )
                                                ),
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    '下单时间:',
                                                    React.createElement(
                                                        'span',
                                                        null,
                                                        json.createTime
                                                    )
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { style: { padding: '10px 0' } },
                                            '请在30：00分钟内完成支付，否则该订单将会取消'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: '_btn' },
                                            '去支付'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'order-info-content',
                                        style: { display: json.orderStatus == '6' ? 'block' : 'none' } },
                                    React.createElement(
                                        'div',
                                        { className: 'left' },
                                        React.createElement(
                                            'div',
                                            { style: { paddingTop: '0' } },
                                            React.createElement(
                                                'ul',
                                                { style: { padding: '0', margin: '0' } },
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    '订单状态: ',
                                                    React.createElement(
                                                        'span',
                                                        {
                                                            style: { color: '#2ca8fe' } },
                                                        this.getType(json.orderStatus)
                                                    )
                                                ),
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    '订单号: ',
                                                    React.createElement(
                                                        'span',
                                                        null,
                                                        json.orderNo
                                                    )
                                                ),
                                                React.createElement(
                                                    'li',
                                                    null,
                                                    '下单时间: ',
                                                    React.createElement(
                                                        'span',
                                                        null,
                                                        json.createTime
                                                    )
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { style: { padding: '10px 0' } },
                                            '1.该订单已经进入退款流程，退款金额：0.00，信用额度：2300.00 ',
                                            React.createElement('br', null),
                                            '2.如有支付保险费用，则不能退还，如有疑问请致电：400-2635-599'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'project-info' },
                                    '项目信息'
                                ),
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        'table',
                                        { cellSpacing: '0', cellPadding: '0', width: '100%' },
                                        React.createElement(
                                            'thead',
                                            null,
                                            React.createElement(
                                                'tr',
                                                null,
                                                React.createElement(
                                                    'th',
                                                    { style: { width: 350 } },
                                                    '项目名称'
                                                ),
                                                React.createElement(
                                                    'th',
                                                    { style: { width: 230 } },
                                                    '价格'
                                                ),
                                                React.createElement(
                                                    'th',
                                                    { style: { width: 150 } },
                                                    '数量'
                                                ),
                                                React.createElement(
                                                    'th',
                                                    { style: { width: 185 } },
                                                    '总价(元)'
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            'tbody',
                                            null,
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
                                                            React.createElement('img', { src: json.goodsPic, width: '100%',
                                                                height: '100%' })
                                                        ),
                                                        React.createElement(
                                                            'div',
                                                            { className: 'goods-info-right' },
                                                            React.createElement(
                                                                'li',
                                                                null,
                                                                json.goodsName
                                                            ),
                                                            React.createElement(
                                                                'li',
                                                                null,
                                                                json.hospital
                                                            )
                                                        )
                                                    )
                                                ),
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    React.createElement('li', null),
                                                    React.createElement(
                                                        'li',
                                                        { style: { color: '#999999' } },
                                                        json.insuranceOrderAmount
                                                    )
                                                ),
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    React.createElement(
                                                        'li',
                                                        null,
                                                        '12'
                                                    )
                                                ),
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    React.createElement(
                                                        'li',
                                                        { style: { color: '#fc657a', fontSize: '20px' } },
                                                        json.orderPrice
                                                    )
                                                )
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'information' },
                                    '分期信息'
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
                                                    { className: 'width-20' },
                                                    '首付比例'
                                                ),
                                                React.createElement(
                                                    'th',
                                                    { className: 'width-20' },
                                                    '首付金额'
                                                ),
                                                React.createElement(
                                                    'th',
                                                    { className: 'width-20' },
                                                    '信用支付'
                                                ),
                                                React.createElement(
                                                    'th',
                                                    { className: 'width-20' },
                                                    '分期数'
                                                ),
                                                React.createElement(
                                                    'th',
                                                    { className: 'width-20' },
                                                    '月供'
                                                )
                                            )
                                        ),
                                        React.createElement(
                                            'tbody',
                                            null,
                                            React.createElement(
                                                'tr',
                                                { className: 'bg_bd' },
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    React.createElement(
                                                        'li',
                                                        null,
                                                        json.downpayPercentage
                                                    )
                                                ),
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    React.createElement(
                                                        'li',
                                                        null,
                                                        json.downpay_amount
                                                    )
                                                ),
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    React.createElement(
                                                        'li',
                                                        null,
                                                        json.credit_payment
                                                    )
                                                ),
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    React.createElement(
                                                        'li',
                                                        null,
                                                        json.stating
                                                    )
                                                ),
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    React.createElement(
                                                        'li',
                                                        { style: { color: '#fc657a', fontSize: '20px' } },
                                                        json.monthPay
                                                    ),
                                                    React.createElement(
                                                        'li',
                                                        { style: { color: '#999999' } },
                                                        '(每月包含服务费',
                                                        json.monthServicePay,
                                                        '元)'
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return R_MyDetail;
}(React.Component);