/**
 * Created by sheldon on 2016/7/22.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_LoginLogo = function (_React$Component) {
    _inherits(R_LoginLogo, _React$Component);

    function R_LoginLogo() {
        _classCallCheck(this, R_LoginLogo);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(R_LoginLogo).apply(this, arguments));
    }

    _createClass(R_LoginLogo, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "bg-logo" },
                React.createElement(
                    "div",
                    { className: "head-wrap" },
                    React.createElement(
                        "div",
                        { className: "city" },
                        React.createElement("a", { title: "悦美网", href: "index.html", style: { background: 'url("../static/images/common/logo.png") no-repeat' }, className: "logo" })
                    ),
                    this.props.login == 1 ? React.createElement(
                        "div",
                        { style: { float: 'right', lineHeight: '75px' } },
                        "已有账号，",
                        React.createElement(
                            "a",
                            { href: "login.html", style: { color: '#FD657A' } },
                            "立即登录"
                        )
                    ) : ''
                )
            );
        }
    }]);

    return R_LoginLogo;
}(React.Component);