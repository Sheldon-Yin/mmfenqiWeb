'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_Capthca = function (_React$Component) {
    _inherits(R_Capthca, _React$Component);

    function R_Capthca(props) {
        _classCallCheck(this, R_Capthca);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(R_Capthca).call(this, props));

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

            verifyCode: ''
        };
        return _this;
    }

    _createClass(R_Capthca, [{
        key: 'check_phone',
        value: function check_phone() {
            if (this.state.telephone == '') {
                this.setState({
                    phone_error: '手机号不能为空',
                    pe_img: React.createElement('img', { src: '../static/images/register/r_er.png', style: { verticalAlign: 'middle' }, alt: '' })
                });
                return false;
            }

            return true;
        }
    }, {
        key: 'handleClick',
        value: function handleClick() {

            console.log(this.props.phone);

            if (!this.check_phone()) {
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
                    smsFmtId: this.props.smsFmtId,
                    telephone: this.props.phone
                },
                error: function error() {},
                timeout: 60000,
                success: function (data) {
                    console.log(data);

                    if (data.result == '10') {
                        this.setState({
                            phone_error: '手机号已注册',
                            pe_img: React.createElement('img', { src: '../static/images/register/r_er.png', style: { verticalAlign: 'middle' }, alt: '' })
                        });

                        return;
                    } else {
                        this.setState({
                            disabled: true,
                            text: '59s后重新获取',
                            timer: 59
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

            return React.createElement(
                'span',
                { onClick: this.handleClick.bind(this),
                    style: { display: 'inline-block', backgroundColor: '#FD657A', height: 45, width: 140, marginLeft: '12px', lineHeight: '45px', color: '#fff', textAlign: 'center' } },
                this.state.text
            );
        }
    }]);

    return R_Capthca;
}(React.Component);

var Input = function (_React$Component2) {
    _inherits(Input, _React$Component2);

    function Input(props) {
        _classCallCheck(this, Input);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Input).call(this, props));

        _this2.state = {
            phone: ''
        };
        // this.getVerifyCode = this.getVerifyCode.bind(this);
        return _this2;
    }

    _createClass(Input, [{
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
            var phone = this.state.phone;
            return React.createElement(
                'div',
                null,
                React.createElement('input', { placeholder: '请输入有效手机号', value: phone, onChange: this.handlePhone.bind(this),
                    style: { width: 340, height: 44, border: '1px solid #e2e2e2', textIndent: '24px' } }),
                React.createElement(
                    'div',
                    { style: { marginLeft: '10px', 'display': 'inline' } },
                    ' ',
                    React.createElement('span', { style: { verticalAlign: 'middle' } })
                )
            );
        }
    }]);

    return Input;
}(React.Component);