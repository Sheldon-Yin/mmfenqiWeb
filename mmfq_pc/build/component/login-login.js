/**
 * Created by sheldon on 2016/7/22.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_Login = function (_React$Component) {
    _inherits(R_Login, _React$Component);

    function R_Login(props) {
        _classCallCheck(this, R_Login);

        console.log('登陆页面');

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(R_Login).call(this, props));

        _this.state = {
            password: '',
            telephone: '',
            phoneBool: false,
            pwdBool: false,
            phone_error: '',
            pwd_error: ''
        };
        return _this;
    }

    _createClass(R_Login, [{
        key: 'componentDidMount',
        value: function componentDidMount() {

            setTimeout(function () {
                this.setState({
                    password: ''
                });
            }.bind(this), 0);
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {

            setTimeout(function () {
                this.setState({
                    password: ''
                });
            }.bind(this), 0);
        }
    }, {
        key: 'MD5',
        value: function MD5(s) {
            var hexcase = 0;
            var b64pad = "";
            var chrsz = 8;
            return binl2hex(core_md5(str2binl(s), s.length * chrsz));
            function b64_md5(s) {
                return binl2b64(core_md5(str2binl(s), s.length * chrsz));
            }

            function hex_hmac_md5(key, data) {
                return binl2hex(core_hmac_md5(key, data));
            }

            function b64_hmac_md5(key, data) {
                return binl2b64(core_hmac_md5(key, data));
            }

            function calcMD5(s) {
                return binl2hex(core_md5(str2binl(s), s.length * chrsz));
            }

            function md5_vm_test() {
                return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
            }

            function core_md5(x, len) {
                x[len >> 5] |= 0x80 << len % 32;
                x[(len + 64 >>> 9 << 4) + 14] = len;

                var a = 1732584193;
                var b = -271733879;
                var c = -1732584194;
                var d = 271733878;

                for (var i = 0; i < x.length; i += 16) {
                    var olda = a;
                    var oldb = b;
                    var oldc = c;
                    var oldd = d;
                    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
                    d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
                    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
                    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
                    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
                    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
                    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
                    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
                    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
                    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
                    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
                    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
                    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
                    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
                    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
                    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
                    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
                    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
                    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
                    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
                    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
                    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
                    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
                    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
                    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
                    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
                    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
                    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
                    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
                    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
                    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
                    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
                    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
                    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
                    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
                    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
                    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
                    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
                    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
                    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
                    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
                    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
                    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
                    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
                    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
                    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
                    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
                    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
                    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
                    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
                    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
                    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
                    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
                    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
                    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
                    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
                    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
                    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
                    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
                    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
                    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
                    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
                    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
                    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
                    a = safe_add(a, olda);
                    b = safe_add(b, oldb);
                    c = safe_add(c, oldc);
                    d = safe_add(d, oldd);
                }
                return Array(a, b, c, d);
            }

            function md5_cmn(q, a, b, x, s, t) {
                return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
            }

            function md5_ff(a, b, c, d, x, s, t) {
                return md5_cmn(b & c | ~b & d, a, b, x, s, t);
            }

            function md5_gg(a, b, c, d, x, s, t) {
                return md5_cmn(b & d | c & ~d, a, b, x, s, t);
            }

            function md5_hh(a, b, c, d, x, s, t) {
                return md5_cmn(b ^ c ^ d, a, b, x, s, t);
            }

            function md5_ii(a, b, c, d, x, s, t) {
                return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
            }

            function core_hmac_md5(key, data) {
                var bkey = str2binl(key);
                if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

                var ipad = Array(16),
                    opad = Array(16);
                for (var i = 0; i < 16; i++) {
                    ipad[i] = bkey[i] ^ 0x36363636;
                    opad[i] = bkey[i] ^ 0x5C5C5C5C;
                }

                var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
                return core_md5(opad.concat(hash), 512 + 128);
            }

            function safe_add(x, y) {
                var lsw = (x & 0xFFFF) + (y & 0xFFFF);
                var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
                return msw << 16 | lsw & 0xFFFF;
            }

            function bit_rol(num, cnt) {
                return num << cnt | num >>> 32 - cnt;
            }

            function str2binl(str) {
                var bin = Array();
                var mask = (1 << chrsz) - 1;
                for (var i = 0; i < str.length * chrsz; i += chrsz) {
                    bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << i % 32;
                }return bin;
            }

            function binl2hex(binarray) {
                var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
                var str = "";
                for (var i = 0; i < binarray.length * 4; i++) {
                    str += hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 0xF) + hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 & 0xF);
                }
                return str;
            }

            function binl2b64(binarray) {
                var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                var str = "";
                for (var i = 0; i < binarray.length * 4; i += 3) {
                    var triplet = (binarray[i >> 2] >> 8 * (i % 4) & 0xFF) << 16 | (binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4) & 0xFF) << 8 | binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4) & 0xFF;
                    for (var j = 0; j < 4; j++) {
                        if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;else str += tab.charAt(triplet >> 6 * (3 - j) & 0x3F);
                    }
                }
                return str;
            }
        }
    }, {
        key: 'handlePhone',
        value: function handlePhone(e) {

            var patt = this.props.phone_regex; // 这里直接获取正则表达式
            var val = e.target.value;
            console.log('----------');
            console.log('正则：' + patt + ' 输入值：' + val);
            console.log('匹配结果：' + patt.test(val));

            this.check_phone(e.target.value);
            // this.setState({
            //     phoneNumber: event.target.value
            // })
        }
    }, {
        key: 'handlePhone2',
        value: function handlePhone2(e) {

            var patt = this.props.phone_regex; // 这里直接获取正则表达式
            var val = e.target.value;
            console.log('----------');
            console.log('正则：' + patt + ' 输入值：' + val);
            console.log('匹配结果：' + patt.test(val));

            this.setState({
                telephone: val
            });

            //this.check_phone2(e.target.value)
        }
    }, {
        key: 'handlePassword',
        value: function handlePassword(e) {
            var patt = this.props.pwd_regex; // 这里直接获取正则表达式
            var val = e.target.value;
            console.log('----------');
            console.log('正则：' + patt + ' 输入值：' + val);
            console.log('匹配结果：' + patt.test(val));

            this.check_pwd(val);
        }
    }, {
        key: 'handlePassword2',
        value: function handlePassword2(e) {
            var patt = this.props.pwd_regex; // 这里直接获取正则表达式
            var val = e.target.value;
            console.log('----------');
            console.log('正则：' + patt + ' 输入值：' + val);
            console.log('匹配结果：' + patt.test(val));
            this.setState({
                password: val
            });
            // this.check_pwd2(val)
        }
    }, {
        key: 'check_phone',
        value: function check_phone(phone) {
            var patt = this.props.phone_regex;
            console.log(patt);
            if (phone == '') {
                this.setState({
                    phone_error: '手机号不能为空',
                    pe_img: React.createElement('img', { src: '../static/images/register/r_er.png', style: { verticalAlign: 'middle' }, alt: '' }),
                    telephone: phone,
                    phoneBool: true
                });

                return false;
            } else if (!patt.test(phone)) {
                this.setState({
                    phone_error: '手机号格式错误,请重新输入',
                    pe_img: React.createElement('img', { src: '../static/images/register/r_er.png', style: { verticalAlign: 'middle' }, alt: '' }),
                    telephone: phone,
                    phoneBool: true
                });
                return false;
            } else {
                this.setState({
                    phone_error: '',
                    pe_img: React.createElement('img', { src: '../static/images/register/r_su.png', style: { verticalAlign: 'middle' }, alt: '' }),
                    telephone: phone,
                    phoneBool: false
                });
            }

            return true;
        }
    }, {
        key: 'check_pwd',
        value: function check_pwd(val) {
            var patt = this.props.pwd_regex;

            if (val == '') {
                this.setState({
                    pwd_error: '密码不能为空，请重新输入',
                    pwde_img: React.createElement('img', { src: '../static/images/register/r_er.png', style: { verticalAlign: 'middle' }, alt: '' }),
                    password: '',
                    pwdBool: true
                });
                return false;
            } else if (!patt.test(val)) {
                this.setState({
                    pwd_error: '密码长度6-16，请重新输入',
                    pwde_img: React.createElement('img', { src: '../static/images/register/r_er.png', style: { verticalAlign: 'middle' }, alt: '' }),
                    password: val,
                    pwdBool: true
                });
                return false;
            } else {
                this.setState({
                    pwd_error: '',
                    pwde_img: React.createElement('img', { src: '../static/images/register/r_su.png', style: { verticalAlign: 'middle' }, alt: '' }),
                    password: val,
                    pwdBool: false
                });
            }

            return true;
        }
    }, {
        key: 'goToLogin',
        value: function goToLogin(phone, pwd, e) {
            var _this2 = this;

            e.preventDefault();

            if (!this.check_phone(phone) || !this.check_pwd(pwd)) {
                return;
            }

            $.ajax({
                type: 'post',
                url: '/pc/computer/user_login',
                data: { userName: this.state.telephone, password: this.MD5(this.state.password) },
                dataType: 'json',
                success: function success(data) {
                    if (data.result == 0) {
                        $.cookie('name', data.data.baseUserDomain.user.telphone, { expires: 30, path: "/" });
                        if (!!window.localStorage.referer) {
                            window.location.href = window.localStorage.referer;
                        } else {
                            window.location.href = 'index.html';
                        }
                    } else {
                        _this2.setState({
                            phone_error: data.msg
                        });
                    }
                    console.log(data);
                    console.log(document.cookie);
                }
            });

            // event.preventDefault();

            //  });
        }
    }, {
        key: 'render',
        value: function render() {
            var phoneBool = this.state.phoneBool;
            var pwdBool = this.state.pwdBool;
            var phone = this.state.telephone;
            var pwd = this.state.password;
            console.log(pwd);
            return React.createElement(
                'div',
                {
                    style: {
                        flexGrow: '1',
                        width: '100%',
                        backgroundImage: 'url(../static/images/login-background.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100% 100%',
                        minHeight: 640,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    } },
                React.createElement(
                    'form',
                    { onSubmit: this.goToLogin.bind(this, phone, pwd) },
                    React.createElement(
                        'div',
                        { className: 'wrap' },
                        React.createElement(
                            'div',
                            { style: { height: 580, width: 980, marginLeft: 110, backgroundColor: '#fff' } },
                            React.createElement(
                                'div',
                                { className: 'img' },
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement('img', { src: '../static/images/leaft.jpg', alt: '' })
                                )
                            ),
                            React.createElement(
                                'div',
                                {
                                    style: {
                                        width: 422,
                                        marginRight: 40,
                                        marginTop: 69,
                                        height: 437,
                                        border: '1px solid #e2e2e2',
                                        float: 'right'
                                    } },
                                React.createElement(
                                    'div',
                                    {
                                        style: {
                                            height: 40,
                                            borderBottom: '1px solid #e2e2e2',
                                            width: '100%',
                                            lineHeight: '40px',
                                            backgroundColor: '#FCFCFC'
                                        } },
                                    React.createElement(
                                        'div',
                                        { style: { paddingLeft: 16 } },
                                        '账号登陆'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { style: { marginTop: 25 } },
                                    React.createElement(
                                        'div',
                                        { style: { width: 342, marginLeft: 40 } },
                                        React.createElement(
                                            'div',
                                            null,
                                            React.createElement(
                                                'div',
                                                { className: 'phone_error' },
                                                this.state.phone_error
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'img_input' },
                                                React.createElement(
                                                    'div',
                                                    null,
                                                    React.createElement('img', { src: '../static/images/login/iconfont-wo.png', alt: '' })
                                                ),
                                                React.createElement('input', { type: 'text', placeholder: '请输入手机号', name: 'text',
                                                    onBlur: this.handlePhone.bind(this),
                                                    onChange: this.handlePhone2.bind(this),
                                                    style: { border: phoneBool == true ? '1px solid #fd7083' : '1px solid #e8e8e8' } })
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { style: { marginTop: 9 } },
                                    React.createElement(
                                        'div',
                                        { style: { width: 342, marginLeft: 40 } },
                                        React.createElement(
                                            'div',
                                            null,
                                            React.createElement(
                                                'div',
                                                { className: 'pwd_error' },
                                                this.state.pwd_error
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'img_input' },
                                                React.createElement(
                                                    'div',
                                                    null,
                                                    React.createElement('img', { src: '../static/images/login/suo.png', alt: '' })
                                                ),
                                                React.createElement('input', { type: 'password', placeholder: '请输入密码', value: pwd,
                                                    onBlur: this.handlePassword.bind(this),
                                                    onChange: this.handlePassword2.bind(this),
                                                    style: { border: pwdBool == true ? '1px solid #fd7083' : '1px solid #e8e8e8' } })
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { style: { marginTop: 25 } },
                                    React.createElement(
                                        'p',
                                        null,
                                        React.createElement(
                                            'a',
                                            { href: 'forget.html',
                                                style: {
                                                    float: 'right',
                                                    marginRight: 40,
                                                    color: '#FD647A',
                                                    textDecoration: 'underline'
                                                } },
                                            '忘记密码？'
                                        )
                                    )
                                ),
                                React.createElement('input', { type: 'submit', value: '登录', readOnly: 'true',
                                    style: {
                                        display: 'inline-block',
                                        marginTop: 35,
                                        backgroundColor: '#FD657A',
                                        height: 45,
                                        width: 342,
                                        marginLeft: 40,
                                        lineHeight: '45px',
                                        color: '#fff',
                                        textAlign: 'center',
                                        border: '0'
                                    } }),
                                React.createElement(
                                    'div',
                                    { style: { marginTop: 40, marginLeft: 40 } },
                                    '还没有账号？',
                                    React.createElement(
                                        'a',
                                        { style: { color: '#FD647A', textDecoration: 'underline' },
                                            href: 'register.html' },
                                        '立即注册'
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return R_Login;
}(React.Component);