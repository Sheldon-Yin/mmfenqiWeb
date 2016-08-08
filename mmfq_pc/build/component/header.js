'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_Header = function (_React$Component) {
    _inherits(R_Header, _React$Component);

    function R_Header() {
        _classCallCheck(this, R_Header);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(R_Header).apply(this, arguments));
    }

    _createClass(R_Header, [{
        key: 'render',
        value: function render() {

            var name = $.cookie("name");

            return React.createElement(
                'div',
                null,
                React.createElement('a', { href: '#top', name: 'top' }),
                React.createElement(
                    'div',
                    { className: 'headNew-bg' },
                    React.createElement(
                        'div',
                        { className: 'head-wrap' },
                        React.createElement(
                            'div',
                            { className: 'phone' },
                            React.createElement(
                                'a',
                                null,
                                '美眉分期整形APP'
                            ),
                            React.createElement('em', { className: 'download' })
                        ),
                        React.createElement(
                            'div',
                            { className: 'box-xx box_xx-line left' },
                            '|'
                        ),
                        React.createElement(
                            'div',
                            { className: 'weixin' },
                            React.createElement(
                                'a',
                                { href: 'javascript:;' },
                                '美眉分期微信号'
                            ),
                            React.createElement('em', { className: 'download' })
                        ),
                        !name ? React.createElement(
                            'div',
                            { id: 'notLogin', className: 'sign-box to-sign' },
                            React.createElement(
                                'div',
                                { className: 'sign-right' },
                                React.createElement(
                                    'span',
                                    null,
                                    React.createElement(
                                        'a',
                                        { href: 'login.html',
                                            rel: 'nofollow' },
                                        '登录'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'box-xx box_xx-line' },
                                '|'
                            ),
                            React.createElement(
                                'div',
                                { className: 'sign-right' },
                                React.createElement(
                                    'span',
                                    null,
                                    React.createElement(
                                        'a',
                                        { href: 'register.html',
                                            rel: 'nofollow' },
                                        '免费注册'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'box-xx box_xx-line' },
                                '|'
                            ),
                            React.createElement(
                                'div',
                                { className: 'sign-right' },
                                React.createElement(
                                    'span',
                                    {
                                        className: 'sign-right' },
                                    React.createElement(
                                        'a',
                                        { href: 'business.html',
                                            rel: 'nofollow' },
                                        '商务合作'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'box-xx box_xx-line' },
                                '|'
                            ),
                            React.createElement(
                                'div',
                                { className: 'sign-right' },
                                React.createElement(
                                    'span',
                                    {
                                        className: 'callUs' },
                                    '联系客服',
                                    React.createElement(
                                        'em',
                                        null,
                                        '400-711-8898'
                                    )
                                )
                            )
                        ) : React.createElement(
                            'div',
                            { className: 'sign-box to-sign' },
                            React.createElement(
                                'div',
                                { className: 'sign-right' },
                                React.createElement(
                                    'span',
                                    null,
                                    React.createElement(
                                        'a',
                                        { href: 'my-order.html',
                                            rel: 'nofollow' },
                                        name
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'box-xx box_xx-line' },
                                '|'
                            ),
                            React.createElement(
                                'div',
                                { className: 'sign-right' },
                                React.createElement(
                                    'span',
                                    null,
                                    React.createElement(
                                        'a',
                                        { href: 'javascript:void(0)', onClick: R_Header.logOut,
                                            rel: 'nofollow' },
                                        '安全退出'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'box-xx box_xx-line' },
                                '|'
                            ),
                            React.createElement(
                                'div',
                                { className: 'sign-right' },
                                React.createElement(
                                    'span',
                                    {
                                        className: 'sign-right' },
                                    React.createElement(
                                        'a',
                                        { href: 'business.html',
                                            rel: 'nofollow' },
                                        '商务合作'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'box-xx box_xx-line' },
                                '|'
                            ),
                            React.createElement(
                                'div',
                                { className: 'sign-right' },
                                React.createElement(
                                    'span',
                                    {
                                        className: 'callUs' },
                                    '联系客服',
                                    React.createElement(
                                        'em',
                                        null,
                                        '400-711-8898'
                                    )
                                )
                            )
                        ),
                        React.createElement('div', { id: 'isLogin', className: 'sign-box sign-on', style: { display: 'none' } })
                    )
                ),
                React.createElement('div', { className: 'clear' })
            );
        }
    }], [{
        key: 'logOut',
        value: function logOut() {
            $.cookie('name', '', { expires: -1, path: '/' });
            $.cookie('appToken', '', { expires: -1, path: '/' });
            $.ajax({
                type: 'post',
                url: '/pc/computer/logout',
                dataType: 'json'
            });
            window.location.href = 'index.html';
        }
    }]);

    return R_Header;
}(React.Component);