
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_MySetting = function (_React$Component) {
    _inherits(R_MySetting, _React$Component);

    function R_MySetting() {
        _classCallCheck(this, R_MySetting);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(R_MySetting).call(this));

        _this.state = {
            data: []
        };
        return _this;
    }

    _createClass(R_MySetting, [{
        key: 'user_info',
        value: function user_info() {
            var _this2 = this;

            $.ajax({
                type: 'post',
                url: '/pc/computer/user_info',
                data: '',
                dataType: 'json',
                success: function success(res) {
                    console.log(res);
                    if (res.result == 1013) {
                        window.location.href = 'login.html';
                    }
                    console.log(res);
                    _this2.setState({
                        data: res.data
                    });
                }
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.user_info();
        }
    }, {
        key: 'render',
        value: function render() {
            var creditType = '实名认证';
            switch (this.state.data.creditStatus) {
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
                                        React.createElement(
                                            'h3',
                                            null,
                                            '账户设置'
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'phone' },
                                React.createElement(
                                    'ul',
                                    null,
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement(
                                            'p',
                                            { className: 'left' },
                                            React.createElement(
                                                'div',
                                                null,
                                                React.createElement('img', { src: '../static/images/phone.png', alt: '' })
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'right' },
                                            React.createElement(
                                                'p',
                                                null,
                                                React.createElement(
                                                    'b',
                                                    { style: { fontSize: '16px' } },
                                                    '手机号码'
                                                ),
                                                ' ',
                                                React.createElement(
                                                    'span',
                                                    { className: 'bg_b8' },
                                                    creditType
                                                )
                                            ),
                                            React.createElement(
                                                'p',
                                                { className: 'bg_b8' },
                                                '你绑定的手机号码是:',
                                                this.state.data.telePhone
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'pwd' },
                                React.createElement(
                                    'ul',
                                    null,
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement(
                                            'p',
                                            { className: 'left' },
                                            React.createElement(
                                                'div',
                                                null,
                                                React.createElement('img', { src: '../static/images/pwd.png', alt: '' })
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'right' },
                                            React.createElement(
                                                'p',
                                                null,
                                                React.createElement(
                                                    'b',
                                                    { style: { fontSize: '16px' } },
                                                    '登录密码'
                                                )
                                            ),
                                            React.createElement(
                                                'p',
                                                { className: 'bg_b8' },
                                                '如账号出现异常，请及时修改密码'
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        React.createElement(
                                            'p',
                                            null,
                                            React.createElement(
                                                'span',
                                                null,
                                                '修改'
                                            ),
                                            React.createElement('img', { src: '../static/images/pwd-right.png', alt: '' })
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

    return R_MySetting;
}(React.Component);