/**
 * Created by sheldon on 2016/7/22.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_LoginHeader = function (_React$Component) {
    _inherits(R_LoginHeader, _React$Component);

    function R_LoginHeader() {
        _classCallCheck(this, R_LoginHeader);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(R_LoginHeader).apply(this, arguments));
    }

    _createClass(R_LoginHeader, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "headNew-bg" },
                    React.createElement(
                        "div",
                        { className: "head-wrap" },
                        React.createElement(
                            "div",
                            { className: "index left" },
                            React.createElement(
                                "a",
                                { href: "index.html", target: "_blank" },
                                "美眉分期首页"
                            ),
                            React.createElement(
                                "em",
                                { className: "download" },
                                React.createElement("img", { alt: "",
                                    src: "http://icon.yuemei.com/front/common/images/erweimaHead.png" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "box-xx box_xx-line left" },
                            "|"
                        ),
                        React.createElement(
                            "div",
                            { className: "phone" },
                            React.createElement(
                                "a",
                                { href: "http://www.yuemei.com/app/kuaiwen.html", target: "_blank" },
                                "美眉分期整形APP"
                            ),
                            React.createElement("em", { className: "download" })
                        ),
                        React.createElement(
                            "div",
                            { className: "box-xx box_xx-line left" },
                            "|"
                        ),
                        React.createElement(
                            "div",
                            { className: "weixin" },
                            React.createElement(
                                "a",
                                { href: "javascript:;" },
                                "美眉分期微信号"
                            ),
                            React.createElement("em", { className: "download" })
                        ),
                        React.createElement(
                            "div",
                            { id: "notLogin", className: "sign-box to-sign" },
                            React.createElement(
                                "div",
                                { className: "sign-right" },
                                React.createElement(
                                    "span",
                                    null,
                                    React.createElement(
                                        "a",
                                        { href: "http://user.yuemei.com/user/login/",
                                            rel: "nofollow" },
                                        "商务合作"
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "box-xx box_xx-line" },
                                "|"
                            ),
                            React.createElement(
                                "div",
                                { className: "sign-right" },
                                React.createElement(
                                    "span",
                                    { className: "callUs" },
                                    "联系客服",
                                    React.createElement(
                                        "em",
                                        null,
                                        "400-711-8898"
                                    )
                                )
                            )
                        ),
                        React.createElement("div", { id: "isLogin", className: "sign-box sign-on", style: { display: 'none' } })
                    )
                ),
                React.createElement("div", { className: "clear" })
            );
        }
    }]);

    return R_LoginHeader;
}(React.Component);