/**
 * Created by sheldon on 2016/7/11.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_Footer = function (_React$Component) {
    _inherits(R_Footer, _React$Component);

    function R_Footer() {
        _classCallCheck(this, R_Footer);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(R_Footer).apply(this, arguments));
    }

    _createClass(R_Footer, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "faith" },
                    React.createElement(
                        "div",
                        { className: "ym-wrap" },
                        React.createElement("img", { src: "../static/images/common/sub-logo.png" })
                    )
                ),
                React.createElement(
                    "div",
                    { className: "ym-footer" },
                    React.createElement(
                        "div",
                        { className: "ym-info" },
                        React.createElement(
                            "div",
                            { className: "foot-wrap" },
                            React.createElement(
                                "div",
                                { className: "ym-logo" },
                                React.createElement(
                                    "div",
                                    null,
                                    React.createElement(
                                        "span",
                                        null,
                                        "美眉分期"
                                    )
                                ),
                                React.createElement(
                                    "p",
                                    null,
                                    "美眉分期是杭州优呗网络科技有限公司旗下网站，国内首家 女性消费金融平台，公司成立于2015年5月，总部位于杭州 市 西湖区文三路金融圈，是面向在校女大学生提供微整形的服务平台"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "ym-about" },
                                React.createElement(
                                    "dl",
                                    null,
                                    React.createElement(
                                        "dt",
                                        { style: { marginLeft: 5 } },
                                        "公司"
                                    ),
                                    React.createElement(
                                        "dd",
                                        null,
                                        React.createElement(
                                            "a",
                                            { href: "about.html?state=3", rel: "nofollow" },
                                            "联系我们"
                                        )
                                    ),
                                    React.createElement(
                                        "dd",
                                        { style: { borderRight: '1px solid #999' } },
                                        React.createElement(
                                            "a",
                                            { href: "about.html?state=4",
                                                rel: "nofollow" },
                                            "加入我们"
                                        )
                                    ),
                                    React.createElement(
                                        "dd",
                                        null,
                                        React.createElement(
                                            "a",
                                            { href: "about.html?state=1", rel: "nofollow" },
                                            "关于我们"
                                        )
                                    )
                                ),
                                React.createElement(
                                    "dl",
                                    { style: { marginLeft: 70 } },
                                    React.createElement(
                                        "dt",
                                        { style: { marginLeft: -6 } },
                                        "商务合作"
                                    ),
                                    React.createElement(
                                        "dd",
                                        null,
                                        React.createElement(
                                            "a",
                                            { href: "business.html" },
                                            "合作方式"
                                        )
                                    ),
                                    React.createElement(
                                        "dd",
                                        { style: { marginTop: 40 } },
                                        React.createElement(
                                            "a",
                                            null,
                                            "合作医院"
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "ym-public" },
                                React.createElement(
                                    "div",
                                    { className: "ym-wx" },
                                    React.createElement(
                                        "div",
                                        { style: { marginLeft: 2, marginBottom: 10 } },
                                        "美眉分期APP"
                                    ),
                                    React.createElement("img", {
                                        src: "../static/images/common/mmfqapp.jpg", title: "关注美眉分期官方APP" })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "ym-public", style: { marginLeft: 70 } },
                                React.createElement(
                                    "div",
                                    { className: "ym-wx" },
                                    React.createElement(
                                        "div",
                                        { style: { marginLeft: 0, marginBottom: 10 } },
                                        "美眉分期公众号"
                                    ),
                                    React.createElement("img", { style: { marginLeft: 8 },
                                        src: "../static/images/common/mmfqwx.jpg", title: "关注美眉分期官方微信" })
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "warp", style: { textAlign: 'center', color: '#999', marginBottom: 10 } },
                        React.createElement("img", { src: "../static/images/common/partners.jpg" })
                    ),
                    React.createElement(
                        "div",
                        { className: "wrap", style: { textAlign: 'center', color: '#999' } },
                        "2015-2016 © 杭州优呗网络科技有限公司 浙ICP备15021758号"
                    ),
                    React.createElement(
                        "div",
                        { className: "wrap", style: { textAlign: 'center', marginTop: 20, color: '#999', paddingBottom: 40 } },
                        "客服电话: 400-711-8898 (工作时间:9点-21点)"
                    )
                )
            );
        }
    }]);

    return R_Footer;
}(React.Component);