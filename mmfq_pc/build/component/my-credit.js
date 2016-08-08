'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RMy_credit = function (_React$Component) {
    _inherits(RMy_credit, _React$Component);

    function RMy_credit() {
        _classCallCheck(this, RMy_credit);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RMy_credit).call(this));

        _this.state = {
            data: {}
        };
        return _this;
    }

    _createClass(RMy_credit, [{
        key: 'user_info',
        value: function user_info() {
            var _this2 = this;

            $.ajax({
                type: 'post',
                url: '/pc/computer/user_info',
                data: '',
                dataType: 'json',
                success: function success(res) {
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
                                    { className: '_a' },
                                    React.createElement(
                                        'li',
                                        null,
                                        '可用额度(元)'
                                    ),
                                    React.createElement(
                                        'li',
                                        { style: { textAlign: 'right' } },
                                        '总信用额度(元)'
                                    )
                                ),
                                React.createElement(
                                    'ul',
                                    { className: '_money' },
                                    React.createElement(
                                        'li',
                                        null,
                                        '￥',
                                        this.state.data.remainMoney
                                    ),
                                    React.createElement(
                                        'li',
                                        null,
                                        '￥',
                                        this.state.data.realloanMoney
                                    )
                                ),
                                React.createElement(
                                    'ul',
                                    { className: '_pg' },
                                    React.createElement('li', null),
                                    React.createElement('li', null)
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'pseudo' },
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
                                                React.createElement('img', { src: '../static/images/credit/credit_p.png', alt: '' })
                                            )
                                        ),
                                        React.createElement(
                                            'div',
                                            { className: 'right' },
                                            React.createElement(
                                                'p',
                                                null,
                                                React.createElement('img', { src: '../static/images/credit/credit_t.png', alt: '' })
                                            ),
                                            React.createElement(
                                                'p',
                                                { className: 'two-dimension' },
                                                React.createElement(
                                                    'div',
                                                    null,
                                                    React.createElement('img', { src: '../static/images/credit/gong.jpg', alt: '' })
                                                ),
                                                React.createElement(
                                                    'div',
                                                    null,
                                                    React.createElement('img', { src: '../static/images/credit/app.jpg', alt: '' })
                                                )
                                            ),
                                            React.createElement(
                                                'p',
                                                { className: 'two_btn' },
                                                React.createElement('img', { src: '../static/images/credit/credit_g.png', alt: '' }),
                                                React.createElement('img', { src: '../static/images/credit/app.png', alt: '' })
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'li',
                                        { style: { marginTop: '50px', marginLeft: '40px' } },
                                        React.createElement('img', { src: '../static/images/credit/credit_step.png', alt: '' })
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return RMy_credit;
}(React.Component);