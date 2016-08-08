
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
            orderDetailResponse: [],
            pic_img: [],
            combination: []
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
                    console.log(data);

                    _this2.setState({
                        data: data,
                        orderDetailResponse: data.data.orderDetailResponse,
                        combination: data.data.orderDetailResponse.combination
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

            this.look_informed_consent(orderId);

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
        /*上传知情同意书*/

    }, {
        key: '_uploadBtn',
        value: function _uploadBtn() {}
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

                        this.setState({
                            pic_img: res.data.informedConsent

                        });
                    }
                }.bind(this)
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var json = this.state.orderDetailResponse;

            console.log(json);

            var content = '';
            if (!!this.state.combination) {
                content = this.state.combination.map(function (item, index) {
                    return React.createElement(
                        'div',
                        { key: index },
                        React.createElement(
                            'span',
                            null,
                            '类型:',
                            item.combinationName
                        ),
                        '     ',
                        React.createElement(
                            'span',
                            null,
                            '属性:',
                            item.combinationValue
                        )
                    );
                });
            }

            console.log(this.state.combination);

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
                                            { className: 'two' },
                                            '1.你还可以购买该项目',
                                            React.createElement(
                                                'div',
                                                { className: '_btn btn_btn', style: { marginLeft: '10px' } },
                                                React.createElement(
                                                    'a',
                                                    { href: "goods-detail.html?goodsId=" + json.goodsId, target: '_blank' },
                                                    '去购买'
                                                )
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
                                        React.createElement(R_Upload, { projectReviewStatus: json.projectReviewStatus, orderId: json.orderId }),
                                        React.createElement(
                                            'div',
                                            { className: '', style: { display: json.projectReviewStatus == 1 ? 'inline' : 'none' } },
                                            React.createElement(
                                                'div',
                                                null,
                                                '审核状态:待审核'
                                            ),
                                            React.createElement(
                                                'div',
                                                null,
                                                this.state.pic_img.map(function (json) {
                                                    return React.createElement('img', { src: json, alt: '', style: { width: '150px', height: '160px', margin: '5px' } });
                                                })
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: '', style: { display: json.projectReviewStatus == 3 ? 'inline' : 'none' } },
                                            React.createElement(
                                                'div',
                                                null,
                                                '知情同意书审核不通过'
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: '', style: { display: json.projectReviewStatus == 2 ? 'inline' : 'none' } },
                                            React.createElement(
                                                'div',
                                                null,
                                                '审核状态:审核通过'
                                            ),
                                            React.createElement(
                                                'div',
                                                null,
                                                this.state.pic_img.map(function (json) {
                                                    return React.createElement('img', { src: json, alt: '', style: { width: '150px', height: '160px' } });
                                                })
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'right' },
                                        React.createElement(
                                            'div',
                                            null,
                                            React.createElement('img', { src: '../static/images/app.jpg', alt: '' })
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
                                            '请在1小时内完成支付，否则该订单将会取消'
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: '_btn btn_btn', onClick: this.toPay.bind(this, json.orderId) },
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
                                            '1.该订单已经进入退款流程，退款金额：',
                                            json.downpay_amount,
                                            '，信用额度：',
                                            json.credit_payment,
                                            ' ',
                                            React.createElement('br', null),
                                            '2.如有支付保险费用，则不能退还，如有疑问请致电：400-2635-599'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'order-info-content',
                                        style: { display: json.orderStatus == '5' ? 'block' : 'none' } },
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
                                            '1.退款金额：',
                                            json.downpay_amount,
                                            '，信用额度：',
                                            json.credit_payment
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
                                                    '所属医院'
                                                ),
                                                React.createElement(
                                                    'th',
                                                    { style: { width: 150 } },
                                                    '规格'
                                                ),
                                                React.createElement(
                                                    'th',
                                                    { style: { width: 185 } },
                                                    '项目价格(元)'
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
                                                            )
                                                        )
                                                    )
                                                ),
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    React.createElement(
                                                        'li',
                                                        { style: { color: '#999999' } },
                                                        json.hospital
                                                    )
                                                ),
                                                React.createElement(
                                                    'td',
                                                    null,
                                                    React.createElement(
                                                        'li',
                                                        { style: { color: '#999999' } },
                                                        content
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