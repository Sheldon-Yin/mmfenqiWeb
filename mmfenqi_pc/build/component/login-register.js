/**
 * Created by sheldon on 2016/7/22.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_Register = function (_React$Component) {
    _inherits(R_Register, _React$Component);

    function R_Register(props) {
        _classCallCheck(this, R_Register);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(R_Register).call(this, props));

        _this.state = { userType: 1 };
        return _this;
    }

    _createClass(R_Register, [{
        key: 'changeType',
        value: function changeType(x) {
            this.setState({ userType: x });
        }
    }, {
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
                            '账号注册'
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
                                        { style: { marginTop: 48 } },
                                        '身份选择'
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { marginTop: 79 } },
                                        '手机号码'
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { marginTop: 49 } },
                                        '短信验证码'
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { marginTop: 49 } },
                                        '登录密码'
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { marginTop: 49 } },
                                        '确认密码'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { style: { height: 589, width: 750, float: 'left' } },
                                this.state.userType ? React.createElement(
                                    'div',
                                    { style: { marginTop: 24, display: 'flex' } },
                                    React.createElement(
                                        'div',
                                        { style: { marginLeft: 16 } },
                                        React.createElement('img', { src: '../static/images/login/student-checked.png',
                                            style: { width: 58, height: 65 } }),
                                        React.createElement('br', null),
                                        React.createElement(
                                            'div',
                                            { style: { color: '#FD6F83' } },
                                            '我是学生'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { marginLeft: 180 } },
                                        React.createElement('img', { src: '../static/images/login/white-unchecked.png',
                                            style: { width: 58, height: 65 },
                                            onClick: this.changeType.bind(this, 0) }),
                                        React.createElement('br', null),
                                        React.createElement(
                                            'div',
                                            null,
                                            '我是白领'
                                        )
                                    )
                                ) : React.createElement(
                                    'div',
                                    { style: { marginTop: 24, display: 'flex' } },
                                    React.createElement(
                                        'div',
                                        { style: { marginLeft: 16 } },
                                        React.createElement('img', { src: '../static/images/login/student-unchecked.png',
                                            style: { width: 58, height: 65 },
                                            onClick: this.changeType.bind(this, 1) }),
                                        React.createElement(
                                            'div',
                                            null,
                                            '我是学生'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { marginLeft: 180 } },
                                        React.createElement('img', { src: '../static/images/login/white-checked.png',
                                            style: { width: 58, height: 65 } }),
                                        React.createElement(
                                            'div',
                                            { style: { color: '#FD6F83' } },
                                            '我是白领'
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { style: { marginTop: 25 } },
                                    React.createElement('input', { placeholder: '请输入有效手机号',
                                        style: { width: 340, height: 44, border: '1px solid #e2e2e2', textIndent: '24px' } })
                                ),
                                React.createElement(
                                    'div',
                                    { style: { marginTop: 25 } },
                                    React.createElement('input', { placeholder: '请输入短信验证码', value: this.verifyCode,
                                        style: { width: 188, height: 44, border: '1px solid #e2e2e2', textIndent: '24px' } }),
                                    React.createElement(
                                        'span',
                                        {
                                            style: { display: 'inline-block', backgroundColor: '#FD657A', height: 45, width: 140, marginLeft: '12px', lineHeight: '45px', color: '#fff', textAlign: 'center' } },
                                        '获取验证码'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { style: { marginTop: 25 } },
                                    React.createElement('input', { placeholder: '请输入6-16位字符或数字',
                                        style: { width: 340, height: 44, border: '1px solid #e2e2e2', textIndent: '24px' } })
                                ),
                                React.createElement(
                                    'div',
                                    { style: { marginTop: 25 } },
                                    React.createElement('input', { placeholder: '请保持两次密码一致',
                                        style: { width: 340, height: 44, border: '1px solid #e2e2e2', textIndent: '24px' } })
                                ),
                                React.createElement(
                                    'div',
                                    {
                                        style: { marginTop: 25, backgroundColor: '#FD657A', height: 45, width: 342, lineHeight: '45px', color: '#fff', textAlign: 'center' } },
                                    '注册'
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return R_Register;
}(React.Component);