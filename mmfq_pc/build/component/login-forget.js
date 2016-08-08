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

            userType: 0,
            pe_img: '',
            pwde_img: '',
            phone_error: '',
            pwd_error: '',
            disabled: false,
            text: '获取验证码',
            timer: 60,

            telephone: '',
            pwd: '',
            repwd_error: '',
            repwd_img: '',

            verifyCode: '',
            phone: ''
        };
        // this.getVerifyCode = this.getVerifyCode.bind(this);
        return _this;
    }

    _createClass(R_Forget, [{
        key: 'handlePhone',
        value: function handlePhone(e) {
            var patt = this.props.phone_regex; // 这里直接获取正则表达式
            var val = e.target.value;
            console.log('----------');
            console.log('正则：' + patt + ' 输入值：' + val);
            console.log('匹配结果：' + patt.test(val));

            this.check_phone(e.target.value);
        }
    }, {
        key: 'handleCode',
        value: function handleCode(e) {
            this.setState({ verifyCode: e.target.value });
        }
    }, {
        key: 'step',
        value: function step(phone, code) {

            if (!this.check_phone(phone)) {
                return;
            }

            $.ajax({
                type: "post",
                url: '/pc/computer/valid_CodeByResetPwd',
                dataType: "json",
                data: {
                    telephone: phone,
                    verifyCode: code
                },
                error: function error() {},
                timeout: 60000,
                success: function success(data) {

                    if (data.result == 0) {

                        window.localStorage.telephone = phone;
                        window.localStorage.verifyCode = code;
                        window.location.href = 'getpwd.html';
                    }
                }
            });
        }
    }, {
        key: 'check_phone',
        value: function check_phone(phone) {

            var patt = this.props.phone_regex;

            if (phone == '') {
                this.setState({
                    phone_error: '手机号不能为空',
                    pe_img: React.createElement('img', { src: '../static/images/register/r_er.png', style: { verticalAlign: 'middle' }, alt: '' }),
                    phone: ''
                });
                return false;
            } else if (!patt.test(phone)) {
                this.setState({
                    phone_error: '手机号格式错误,请重新输入',
                    pe_img: React.createElement('img', { src: '../static/images/register/r_er.png', style: { verticalAlign: 'middle' }, alt: '' }),
                    phone: phone
                });
                return false;
            } else {
                this.setState({
                    phone_error: '',
                    phone: phone
                });
            }

            return true;
        }
    }, {
        key: 'handleClick',
        value: function handleClick(phone) {

            if (!this.check_phone(phone)) {
                return;
            }

            if (this.state.disabled) {
                return;
            }

            $.ajax({
                type: "post",
                url: '/pc/computer/user_getcode',
                dataType: "json",
                data: {
                    smsFmtId: 'resetPwd',
                    telephone: phone
                },
                error: function error() {},
                timeout: 60000,
                success: function (data) {
                    console.log(data);

                    if (data.result != '0') {
                        this.setState({
                            phone_error: data.msg,
                            pe_img: React.createElement('img', { src: '../static/images/register/r_er.png', style: { verticalAlign: 'middle' }, alt: '' })
                        });

                        return;
                    } else {
                        this.setState({
                            disabled: true,
                            text: '59s后重新获取',
                            timer: 59,
                            pe_img: React.createElement('img', { src: '../static/images/register/r_su.png', style: { verticalAlign: 'middle' }, alt: '' })
                        });
                        var self = this;
                        var tm = setInterval(function () {
                            var tt = self.state.timer - 1;
                            if (tt <= 0) {
                                self.setState({
                                    disabled: false,
                                    text: '获取验证码',
                                    timer: 60
                                });
                                clearInterval(tm);
                                return;
                            }
                            self.setState({
                                disabled: true,
                                text: tt + 's后重新获取',
                                timer: tt
                            });
                        }, 1000);
                    }
                }.bind(this)
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var phone = this.state.phone;
            var phone_error = this.state.phone_error;
            var pe_img = this.state.pe_img;
            var verifyCode = this.state.verifyCode;
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
                                        React.createElement(
                                            'div',
                                            null,
                                            React.createElement('input', { placeholder: '请输入有效手机号', onBlur: this.handlePhone.bind(this),
                                                style: { width: 340, height: 44, border: '1px solid #e2e2e2', textIndent: '24px' } }),
                                            React.createElement(
                                                'div',
                                                { style: { marginLeft: '10px', 'display': 'inline' } },
                                                pe_img,
                                                ' ',
                                                React.createElement(
                                                    'span',
                                                    { style: { verticalAlign: 'middle' } },
                                                    phone_error
                                                )
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { style: { marginTop: 25 } },
                                        React.createElement('input', { placeholder: '请输入短信验证码', onBlur: this.handleCode.bind(this),
                                            style: { width: 188, height: 44, border: '1px solid #e2e2e2', textIndent: '24px' } }),
                                        React.createElement(
                                            'span',
                                            { onClick: this.handleClick.bind(this, phone),
                                                style: { display: 'inline-block', backgroundColor: '#FD657A', height: 45, width: 140, marginLeft: '12px', lineHeight: '45px', color: '#fff', textAlign: 'center' } },
                                            this.state.text
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { onClick: this.step.bind(this, phone, verifyCode),
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