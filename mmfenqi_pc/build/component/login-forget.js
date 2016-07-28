/**
 * Created by sheldon on 2016/7/22.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_Forget = function (_React$Component) {
    _inherits(R_Forget, _React$Component);

    function R_Forget() {
        _classCallCheck(this, R_Forget);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(R_Forget).call(this));

        _this.state = {
            phone: ''
        };
        _this.getVerifyCode = _this.getVerifyCode.bind(_this);
        return _this;
    }

    _createClass(R_Forget, [{
        key: 'getVerifyCode',
        value: function getVerifyCode(phone) {
            console.log(phone);
        }
    }, {
        key: 'handlePhone',
        value: function handlePhone(event) {
            this.setState({ phone: event.target.value });
        }
    }, {
        key: 'render',
        value: function render() {
            console.log(2);
            var phone = this.state.phone;
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
                                        '手机号码'
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { marginTop: 47 } },
                                        '短信验证码'
                                    )
                                )
                            ),
                            React.createElement(
                                'form',
                                null,
                                React.createElement(
                                    'div',
                                    { style: { height: 589, width: 750, float: 'left' } },
                                    React.createElement(
                                        'div',
                                        { style: { marginTop: 110 } },
                                        React.createElement('input', { placeholder: '请输入有效手机号', value: phone, onChange: this.handlePhone,
                                            style: { width: 340, height: 44, border: '1px solid #e2e2e2', textIndent: '24px' } })
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { marginTop: 25 } },
                                        React.createElement('input', { placeholder: '请输入短信验证码', value: this.verifyCode,
                                            style: { width: 188, height: 44, border: '1px solid #e2e2e2', textIndent: '24px' } }),
                                        React.createElement(
                                            'span',
                                            { onClick: this.getVerifyCode.bind(this, phone),
                                                style: { display: 'inline-block', backgroundColor: '#FD657A', height: 45, width: 140, marginLeft: '12px', lineHeight: '45px', color: '#fff', textAlign: 'center' } },
                                            '获取验证码'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        {
                                            style: { marginTop: 25, backgroundColor: '#FD657A', height: 45, width: 342, lineHeight: '45px', color: '#fff', textAlign: 'center' } },
                                        '下一步'
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return R_Forget;
}(React.Component);