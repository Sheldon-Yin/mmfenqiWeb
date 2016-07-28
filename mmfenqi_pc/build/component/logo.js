/**
 * Created by sheldon on 2016/7/8.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_Logo = function (_React$Component) {
    _inherits(R_Logo, _React$Component);

    function R_Logo() {
        _classCallCheck(this, R_Logo);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(R_Logo).apply(this, arguments));
    }

    _createClass(R_Logo, [{
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
                    React.createElement(
                        "div",
                        { className: "ym-search" },
                        React.createElement(
                            "div",
                            { className: "search-box" },
                            React.createElement("input", { id: "searchWd", className: "search", "data-type": "tao", type: "text", value: "" }),
                            React.createElement(
                                "label",
                                { htmlFor: "searchWd", className: "hot-searchWd", style: { display: 'inline' } },
                                "轮廓雕的美 还能巨补水"
                            ),
                            React.createElement(
                                "a",
                                { id: "YMsearch", href: "javascript:", className: "search-btn" },
                                "搜索"
                            )
                        ),
                        React.createElement(
                            "ul",
                            { className: "search-list" },
                            React.createElement(
                                "li",
                                { "data-type": "" },
                                React.createElement(
                                    "a",
                                    { href: "http://so.yuemei.com/reviewsall//", target: "_blank" },
                                    React.createElement("span", null)
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "hotItem clearfix" },
                            React.createElement(
                                "a",
                                { target: "_blank", href: "http://so.yuemei.com/tao/%E7%8E%BB%E5%B0%BF%E9%85%B8/" },
                                "玻尿酸"
                            ),
                            React.createElement(
                                "a",
                                { target: "_blank", href: "http://so.yuemei.com/tao/%E7%BE%8E%E7%99%BD%E9%92%88/" },
                                "美白针"
                            ),
                            React.createElement(
                                "a",
                                { target: "_blank", href: "http://so.yuemei.com/tao/%E5%8F%8C%E7%9C%BC%E7%9A%AE/" },
                                "双眼皮"
                            ),
                            React.createElement(
                                "a",
                                { target: "_blank", href: "http://so.yuemei.com/tao/%E5%90%B8%E8%84%82/" },
                                "吸脂"
                            ),
                            React.createElement(
                                "a",
                                { target: "_blank", href: "http://so.yuemei.com/tao/%E6%B0%B4%E5%85%89%E9%92%88/" },
                                "水光针"
                            ),
                            React.createElement(
                                "a",
                                { target: "_blank", href: "http://so.yuemei.com/tao/%E7%98%A6%E8%84%B8%E9%92%88/" },
                                "瘦脸针"
                            )
                        )
                    ),
                    React.createElement(
                        "a",
                        { className: "App", href: "my-bill.html" },
                        React.createElement("img", { src: "../static/images/money.png", style: { position: 'absolute' } }),
                        React.createElement("div", { style: { marginTop: '40px', marginLeft: '90px' }, className: "money-tips" })
                    )
                )
            );
        }
    }]);

    return R_Logo;
}(React.Component);