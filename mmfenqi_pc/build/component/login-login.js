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

    function R_Login() {
        _classCallCheck(this, R_Login);

        console.log('登陆页面');

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(R_Login).call(this));

        _this.state = {
            password: '',
            phoneNumber: '',
            phoneBool: false,
            pwdBool: false
        };
        return _this;
    }

    _createClass(R_Login, [{
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
        value: function handlePhone(event) {
            this.setState({
                phoneNumber: event.target.value
            });
        }
    }, {
        key: 'handlePassword',
        value: function handlePassword(event) {
            this.setState({
                password: event.target.value
            });
        }
    }, {
        key: 'goToLogin',
        value: function goToLogin(event) {
            event.preventDefault();
            $.ajax({
                type: 'post',
                url: '/pc/computer/user_login',
                data: { userName: this.state.phoneNumber, password: this.MD5(this.state.password) },
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
                        alert(data.message);
                    }
                    console.log(data);
                    console.log(document.cookie);
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            this.phoneBool = this.state.phoneBool;
            this.pwdBool = this.state.pwdBool;
            return React.createElement(
                'div',
                {
                    style: { flexGrow: '1', width: '100%', backgroundImage: 'url(../static/images/login-background.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', minHeight: 640, display: 'flex', flexDirection: 'column', justifyContent: 'center' } },
                React.createElement(
                    'div',
                    { className: 'wrap' },
                    React.createElement(
                        'div',
                        { style: { height: 580, width: 980, marginLeft: 110, backgroundColor: '#fff' } },
                        React.createElement('div', null),
                        React.createElement(
                            'div',
                            {
                                style: { width: 422, marginRight: 40, marginTop: 69, height: 437, border: '1px solid #e2e2e2', float: 'right' } },
                            React.createElement(
                                'div',
                                {
                                    style: { height: 40, borderBottom: '1px solid #e2e2e2', width: '100%', lineHeight: '40px', backgroundColor: '#FCFCFC', paddingLeft: '16px' } },
                                '账号登陆'
                            ),
                            React.createElement(
                                'div',
                                { style: { marginTop: 25 } },
                                React.createElement(
                                    'div',
                                    { style: { width: 342, marginLeft: 40 } },
                                    this.phoneBool ? React.createElement(
                                        'div',
                                        null,
                                        React.createElement(
                                            'span',
                                            { style: { color: '#FD647A' } },
                                            '手机号格式错误'
                                        ),
                                        React.createElement('input', { placeholder: '请输入手机号', value: this.state.phoneNumber,
                                            onChange: this.handlePhone.bind(this),
                                            style: { width: 340, height: 44, border: '1px solid #FD647A', textIndent: 40 } })
                                    ) : React.createElement('input', { placeholder: '请输入手机号', value: this.state.phoneNumber,
                                        onChange: this.handlePhone.bind(this),
                                        style: { width: 340, height: 44, border: '1px solid #e2e2e2', textIndent: 40 } })
                                )
                            ),
                            React.createElement(
                                'div',
                                { style: { marginTop: 25 } },
                                React.createElement(
                                    'div',
                                    { style: { width: 342, marginLeft: 40 } },
                                    this.pwdBool ? React.createElement(
                                        'div',
                                        null,
                                        React.createElement(
                                            'span',
                                            { style: { color: '#FD647A' } },
                                            '密码长度在6-16位之间'
                                        ),
                                        React.createElement('input', { type: 'password', placeholder: '请输入密码',
                                            value: this.state.password,
                                            onChange: this.handlePassword.bind(this),
                                            style: { width: 340, height: 44, border: '1px solid #e2e2e2', textIndent: 40 } })
                                    ) : React.createElement('input', { type: 'password', placeholder: '请输入密码', value: this.state.password,
                                        onChange: this.handlePassword.bind(this),
                                        style: { width: 340, height: 44, border: '1px solid #e2e2e2', textIndent: 40 } })
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
                                            style: { float: 'right', marginRight: 40, color: '#FD647A', textDecoration: 'underline' } },
                                        '忘记密码？'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { onClick: this.goToLogin.bind(this), value: '登陆',
                                    style: { display: 'inline-block', marginTop: 77, backgroundColor: '#FD657A', height: 45, width: 342, marginLeft: 40, lineHeight: '45px', color: '#fff', textAlign: 'center' } },
                                '登陆'
                            ),
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
            );
        }
    }]);

    return R_Login;
}(React.Component);