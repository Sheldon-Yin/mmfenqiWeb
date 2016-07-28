/**
 * Created by sheldon on 2016/7/25.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_LoginGetpwd = function (_React$Component) {
    _inherits(R_LoginGetpwd, _React$Component);

    function R_LoginGetpwd() {
        _classCallCheck(this, R_LoginGetpwd);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(R_LoginGetpwd).apply(this, arguments));
    }

    _createClass(R_LoginGetpwd, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                {
                    style: { flexGrow: '1', width: '100%', backgroundImage: 'url(../static/images/login-background.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', minHeight: 680, display: 'flex', flexDirection: 'column', justifyContent: 'center' } },
                React.createElement(
                    'div',
                    { className: 'wrap' },
                    React.createElement(
                        'div',
                        { style: { backgroundColor: '#fff', height: 638, width: 1198, border: '1px solid #e2e2e2' } },
                        React.createElement(
                            'div',
                            {
                                style: { height: 48, borderBottom: '1px solid #e2e2e2', backgroundColor: '#FCFCFC', textIndent: '24px', lineHeight: '48px', fontSize: '16px' } },
                            '找回密码'
                        ),
                        React.createElement(
                            'div',
                            { style: { height: 589, width: 1198 } },
                            React.createElement(
                                'div',
                                { style: { height: 589, width: 448, float: 'left' } },
                                React.createElement(
                                    'div',
                                    { style: { textAlign: 'right', marginRight: 10 } },
                                    React.createElement(
                                        'div',
                                        { style: { marginTop: 124 } },
                                        '新密码'
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { marginTop: 47 } },
                                        '确认密码'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { style: { height: 589, width: 750, float: 'left' } },
                                React.createElement(
                                    'div',
                                    { style: { marginTop: 110 } },
                                    React.createElement('input', { placeholder: '请输入6-16位字符或数字',
                                        style: { width: 340, height: 44, border: '1px solid #e2e2e2', textIndent: '24px' } })
                                ),
                                React.createElement(
                                    'div',
                                    { style: { marginTop: 25 } },
                                    React.createElement('input', { placeholder: '请重新输入',
                                        style: { width: 340, height: 44, border: '1px solid #e2e2e2', textIndent: '24px' } })
                                ),
                                React.createElement(
                                    'div',
                                    {
                                        style: { marginTop: 25, backgroundColor: '#FD657A', height: 45, width: 342, lineHeight: '45px', color: '#fff', textAlign: 'center' } },
                                    '确认更改'
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return R_LoginGetpwd;
}(React.Component);