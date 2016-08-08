/**
 * Created by sheldon on 2016/7/19.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_MyBar = function (_React$Component) {
    _inherits(R_MyBar, _React$Component);

    function R_MyBar() {
        _classCallCheck(this, R_MyBar);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(R_MyBar).call(this));

        _this.state = {
            creditStatus: '',
            imgUrl: '',
            nickName: '',
            realloanMoney: '',
            remainMoney: '',
            telePhone: ''
        };
        return _this;
    }

    _createClass(R_MyBar, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            $.ajax({
                type: 'post',
                url: '/pc/computer/user_info',
                dataType: 'json',
                success: function success(res) {
                    if (res.result == 0) {
                        _this2.setState(res.data);
                    }
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var creditType = '实名认证';
            switch (this.state.creditStatus) {
                case '0':
                    creditType = '初始状态';
                    break;
                case '1':
                    creditType = '已实名认证';
                    break;
                case '2':
                    creditType = '实名认证失败';
                    break;
                case '3':
                    creditType = '实名审核中';
                    break;
                default:
                    break;
            }

            return React.createElement(
                'div',
                { style: { float: 'left' } },
                React.createElement(
                    'div',
                    {
                        style: { width: '239px', height: '273px', backgroundImage: 'url("../static/images/mine/bar.png")', marginTop: -10, color: '#fff', backgroundRepeat: 'no-repeat' } },
                    React.createElement(
                        'div',
                        { style: { width: '230px', paddingLeft: 15, paddingRight: 15 } },
                        React.createElement('img', { src: this.state.imgUrl,
                            style: { width: 80, height: 80, marginLeft: 60, marginTop: 10 } }),
                        React.createElement(
                            'div',
                            { style: { textAlign: 'center', marginTop: 3, marginLeft: -30 } },
                            this.state.nickName == '' ? this.state.telePhone : this.state.telePhone
                        ),
                        React.createElement(
                            'div',
                            { style: { marginTop: 12 } },
                            creditType
                        ),
                        React.createElement('div', { style: { height: 1, backgroundColor: '#fd8190', margin: '12px 0', width: 200 } }),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'span',
                                { style: { color: '#fdc3c3' } },
                                '授信额度: '
                            ),
                            React.createElement(
                                'span',
                                { style: { color: '#fff' } },
                                ' ',
                                this.state.realloanMoney,
                                '元'
                            )
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'span',
                                { style: { color: '#fdc3c3' } },
                                '可用额度: '
                            ),
                            React.createElement(
                                'span',
                                { style: { color: '#fff' } },
                                ' ',
                                this.state.remainMoney,
                                '元'
                            )
                        ),
                        React.createElement(
                            'div',
                            { style: { marginTop: 16, textAlign: 'center' } },
                            React.createElement(
                                'span',
                                { style: { color: '#fdc3c3' } },
                                '额度不够？'
                            ),
                            React.createElement(
                                'a',
                                { href: 'my-credit.html', style: { color: 'white' } },
                                '去提额!'
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    {
                        style: { backgroundColor: '#313131', height: '560px', width: '230px', marginTop: '-10px', color: '#a7a7a7', textAlign: 'center' } },
                    this.props.status == 'order' ? React.createElement(
                        'a',
                        {
                            style: { height: 48, lineHeight: '48px', borderBottom: '1px solid #222', backgroundColor: '#3e3e3e', display: 'block', color: '#a7a7a7' } },
                        React.createElement(
                            'span',
                            null,
                            '我的订单'
                        ),
                        React.createElement('div', { style: { backgroundColor: '#3a3a3a', height: 1 } })
                    ) : React.createElement(
                        'a',
                        { href: 'my-order.html',
                            style: { height: 48, lineHeight: '48px', borderBottom: '1px solid #222', display: 'block', color: '#a7a7a7' } },
                        React.createElement(
                            'span',
                            null,
                            '我的订单'
                        ),
                        React.createElement('div', { style: { backgroundColor: '#3a3a3a', height: 1 } })
                    ),
                    this.props.status == 'bill' ? React.createElement(
                        'a',
                        {
                            style: { height: 48, lineHeight: '48px', borderBottom: '1px solid #222', backgroundColor: '#3e3e3e', display: 'block', color: '#a7a7a7' } },
                        React.createElement(
                            'span',
                            null,
                            '我的账单'
                        ),
                        React.createElement('div', { style: { backgroundColor: '#3a3a3a', height: 1 } })
                    ) : React.createElement(
                        'a',
                        { href: 'my-bill.html',
                            style: { height: 48, lineHeight: '48px', borderBottom: '1px solid #222', display: 'block', color: '#a7a7a7' } },
                        React.createElement(
                            'span',
                            null,
                            '我的账单'
                        ),
                        React.createElement('div', { style: { backgroundColor: '#3a3a3a', height: 1 } })
                    ),
                    this.props.status == 'credit' ? React.createElement(
                        'a',
                        {
                            style: { height: 48, lineHeight: '48px', borderBottom: '1px solid #222', backgroundColor: '#3e3e3e', display: 'block', color: '#a7a7a7' } },
                        React.createElement(
                            'span',
                            null,
                            '我的信用'
                        ),
                        React.createElement('div', { style: { backgroundColor: '#3a3a3a', height: 1 } })
                    ) : React.createElement(
                        'a',
                        { href: 'my-credit.html',
                            style: { height: 48, lineHeight: '48px', borderBottom: '1px solid #222', display: 'block', color: '#a7a7a7' } },
                        React.createElement(
                            'span',
                            null,
                            '我的信用'
                        ),
                        React.createElement('div', { style: { backgroundColor: '#3a3a3a', height: 1 } })
                    ),
                    this.props.status == 'setting' ? React.createElement(
                        'a',
                        {
                            style: { height: 48, lineHeight: '48px', borderBottom: '1px solid #222', backgroundColor: '#3e3e3e', display: 'block', color: '#a7a7a7' } },
                        React.createElement(
                            'span',
                            null,
                            '账号设置'
                        ),
                        React.createElement('div', { style: { backgroundColor: '#3a3a3a', height: 1 } })
                    ) : React.createElement(
                        'a',
                        { href: 'my-setting.html',
                            style: { height: 48, lineHeight: '48px', borderBottom: '1px solid #222', display: 'block', color: '#a7a7a7' } },
                        React.createElement(
                            'span',
                            null,
                            '账号设置'
                        ),
                        React.createElement('div', { style: { backgroundColor: '#3a3a3a', height: 1 } })
                    )
                )
            );
        }
    }]);

    return R_MyBar;
}(React.Component);