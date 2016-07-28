'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_Combo = function (_React$Component) {
    _inherits(R_Combo, _React$Component);

    function R_Combo() {
        _classCallCheck(this, R_Combo);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(R_Combo).apply(this, arguments));
    }

    _createClass(R_Combo, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "combo-main" },
                React.createElement("div", { className: "main" }),
                React.createElement(
                    "div",
                    { className: "one-g" },
                    React.createElement(
                        "div",
                        { className: "one-main" },
                        React.createElement(
                            "div",
                            { className: "main-content" },
                            React.createElement(
                                "div",
                                { className: "goods-info" },
                                React.createElement(
                                    "ul",
                                    null,
                                    React.createElement(
                                        "li",
                                        { style: { marginBottom: '20px' } },
                                        React.createElement(
                                            "div",
                                            { className: "infoImg" },
                                            React.createElement("img", { src: "http://p35.yuemei.com/tao/211_144/2015/1126/151126111825_1b6d65.jpg",
                                                alt: "" })
                                        ),
                                        React.createElement(
                                            "a",
                                            { href: "http://tao.yuemei.com/17759/", target: "_blank", className: "infoTxt" },
                                            React.createElement(
                                                "div",
                                                { className: "babyInfo" },
                                                React.createElement(
                                                    "p",
                                                    { className: "infoTit1" },
                                                    "[ 广州全切双眼皮 ]公立三甲 专业医师 全切双眼皮 重睑同时去皮去脂 美丽双眼不臃肿"
                                                ),
                                                React.createElement(
                                                    "p",
                                                    { className: "infoTit2" },
                                                    React.createElement(
                                                        "b",
                                                        { className: "pink" },
                                                        React.createElement(
                                                            "i",
                                                            null,
                                                            "￥"
                                                        ),
                                                        React.createElement(
                                                            "span",
                                                            null,
                                                            "2000"
                                                        )
                                                    ),
                                                    React.createElement(
                                                        "del",
                                                        null,
                                                        "市场价￥4250"
                                                    )
                                                )
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        "li",
                                        { style: { marginBottom: '20px' } },
                                        React.createElement(
                                            "div",
                                            { className: "infoImg" },
                                            React.createElement("img", { src: "http://p35.yuemei.com/tao/211_144/2015/1126/151126111825_1b6d65.jpg",
                                                alt: "" })
                                        ),
                                        React.createElement(
                                            "a",
                                            { href: "http://tao.yuemei.com/17759/", target: "_blank", className: "infoTxt" },
                                            React.createElement(
                                                "div",
                                                { className: "babyInfo" },
                                                React.createElement(
                                                    "p",
                                                    { className: "infoTit1" },
                                                    "[ 广州全切双眼皮 ]公立三甲 专业医师 全切双眼皮 重睑同时去皮去脂 美丽双眼不臃肿"
                                                ),
                                                React.createElement(
                                                    "p",
                                                    { className: "infoTit2" },
                                                    React.createElement(
                                                        "b",
                                                        { className: "pink" },
                                                        React.createElement(
                                                            "i",
                                                            null,
                                                            "￥"
                                                        ),
                                                        React.createElement(
                                                            "span",
                                                            null,
                                                            "2000"
                                                        )
                                                    ),
                                                    React.createElement(
                                                        "del",
                                                        null,
                                                        "市场价￥4250"
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "one-pay" },
                                React.createElement(
                                    "div",
                                    { style: { width: '150px' } },
                                    React.createElement(
                                        "del",
                                        null,
                                        "￥55456"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { style: { width: '382px' } },
                                    "美眉专享价: ",
                                    React.createElement(
                                        "i",
                                        null,
                                        "￥"
                                    ),
                                    " ",
                                    React.createElement(
                                        "b",
                                        null,
                                        "451211.00"
                                    ),
                                    " ",
                                    React.createElement(
                                        "span",
                                        null,
                                        "x12"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "_btn", style: { padding: '9px' } },
                                    "立刻分期"
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "two-g one-g" },
                    React.createElement(
                        "div",
                        { className: "one-main", style: { paddingTop: '0', paddingLeft: '824px' } },
                        React.createElement(
                            "div",
                            { className: "main-content" },
                            React.createElement(
                                "div",
                                { className: "goods-info" },
                                React.createElement(
                                    "ul",
                                    null,
                                    React.createElement(
                                        "li",
                                        { style: { marginBottom: '20px' } },
                                        React.createElement(
                                            "div",
                                            { className: "infoImg" },
                                            React.createElement("img", { src: "http://p35.yuemei.com/tao/211_144/2015/1126/151126111825_1b6d65.jpg",
                                                alt: "" })
                                        ),
                                        React.createElement(
                                            "a",
                                            { href: "http://tao.yuemei.com/17759/", target: "_blank", className: "infoTxt" },
                                            React.createElement(
                                                "div",
                                                { className: "babyInfo" },
                                                React.createElement(
                                                    "p",
                                                    { className: "infoTit1" },
                                                    "[ 广州全切双眼皮 ]公立三甲 专业医师 全切双眼皮 重睑同时去皮去脂 美丽双眼不臃肿"
                                                ),
                                                React.createElement(
                                                    "p",
                                                    { className: "infoTit2" },
                                                    React.createElement(
                                                        "b",
                                                        { className: "pink" },
                                                        React.createElement(
                                                            "i",
                                                            null,
                                                            "￥"
                                                        ),
                                                        React.createElement(
                                                            "span",
                                                            null,
                                                            "2000"
                                                        )
                                                    ),
                                                    React.createElement(
                                                        "del",
                                                        null,
                                                        "￥4250"
                                                    )
                                                )
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        "li",
                                        { style: { marginBottom: '20px' } },
                                        React.createElement(
                                            "div",
                                            { className: "infoImg" },
                                            React.createElement("img", { src: "http://p35.yuemei.com/tao/211_144/2015/1126/151126111825_1b6d65.jpg",
                                                alt: "" })
                                        ),
                                        React.createElement(
                                            "a",
                                            { href: "http://tao.yuemei.com/17759/", target: "_blank", className: "infoTxt" },
                                            React.createElement(
                                                "div",
                                                { className: "babyInfo" },
                                                React.createElement(
                                                    "p",
                                                    { className: "infoTit1" },
                                                    "[ 广州全切双眼皮 ]公立三甲 专业医师 全切双眼皮 重睑同时去皮去脂 美丽双眼不臃肿"
                                                ),
                                                React.createElement(
                                                    "p",
                                                    { className: "infoTit2" },
                                                    React.createElement(
                                                        "b",
                                                        { className: "pink" },
                                                        React.createElement(
                                                            "i",
                                                            null,
                                                            "￥"
                                                        ),
                                                        React.createElement(
                                                            "span",
                                                            null,
                                                            "2000"
                                                        )
                                                    ),
                                                    React.createElement(
                                                        "del",
                                                        null,
                                                        "￥4250"
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "one-pay" },
                                React.createElement(
                                    "div",
                                    { style: { width: '150px' } },
                                    React.createElement(
                                        "del",
                                        null,
                                        "￥55456"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { style: { width: '382px' } },
                                    "美眉专享价: ",
                                    React.createElement(
                                        "i",
                                        null,
                                        "￥"
                                    ),
                                    " ",
                                    React.createElement(
                                        "b",
                                        null,
                                        "451211.00"
                                    ),
                                    " ",
                                    React.createElement(
                                        "span",
                                        null,
                                        "x12"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "_btn", style: { padding: '9px' } },
                                    "立刻分期"
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "three-g one-g" },
                    React.createElement(
                        "div",
                        { className: "one-main", style: { paddingTop: '0', paddingLeft: '288px' } },
                        React.createElement(
                            "div",
                            { className: "main-content" },
                            React.createElement(
                                "div",
                                { className: "goods-info" },
                                React.createElement(
                                    "ul",
                                    null,
                                    React.createElement(
                                        "li",
                                        { style: { marginBottom: '20px' } },
                                        React.createElement(
                                            "div",
                                            { className: "infoImg" },
                                            React.createElement("img", { src: "http://p35.yuemei.com/tao/211_144/2015/1126/151126111825_1b6d65.jpg",
                                                alt: "" })
                                        ),
                                        React.createElement(
                                            "a",
                                            { href: "http://tao.yuemei.com/17759/", target: "_blank", className: "infoTxt" },
                                            React.createElement(
                                                "div",
                                                { className: "babyInfo" },
                                                React.createElement(
                                                    "p",
                                                    { className: "infoTit1" },
                                                    "[ 广州全切双眼皮 ]公立三甲 专业医师 全切双眼皮 重睑同时去皮去脂 美丽双眼不臃肿"
                                                ),
                                                React.createElement(
                                                    "p",
                                                    { className: "infoTit2" },
                                                    React.createElement(
                                                        "b",
                                                        { className: "pink" },
                                                        React.createElement(
                                                            "i",
                                                            null,
                                                            "￥"
                                                        ),
                                                        React.createElement(
                                                            "span",
                                                            null,
                                                            "2000"
                                                        )
                                                    ),
                                                    React.createElement(
                                                        "del",
                                                        null,
                                                        "￥4250"
                                                    )
                                                )
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        "li",
                                        { style: { marginBottom: '20px' } },
                                        React.createElement(
                                            "div",
                                            { className: "infoImg" },
                                            React.createElement("img", { src: "http://p35.yuemei.com/tao/211_144/2015/1126/151126111825_1b6d65.jpg",
                                                alt: "" })
                                        ),
                                        React.createElement(
                                            "a",
                                            { href: "http://tao.yuemei.com/17759/", target: "_blank", className: "infoTxt" },
                                            React.createElement(
                                                "div",
                                                { className: "babyInfo" },
                                                React.createElement(
                                                    "p",
                                                    { className: "infoTit1" },
                                                    "[ 广州全切双眼皮 ]公立三甲 专业医师 全切双眼皮 重睑同时去皮去脂 美丽双眼不臃肿"
                                                ),
                                                React.createElement(
                                                    "p",
                                                    { className: "infoTit2" },
                                                    React.createElement(
                                                        "b",
                                                        { className: "pink" },
                                                        React.createElement(
                                                            "i",
                                                            null,
                                                            "￥"
                                                        ),
                                                        React.createElement(
                                                            "span",
                                                            null,
                                                            "2000"
                                                        )
                                                    ),
                                                    React.createElement(
                                                        "del",
                                                        null,
                                                        "￥4250"
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "one-pay" },
                                React.createElement(
                                    "div",
                                    { style: { width: '150px' } },
                                    React.createElement(
                                        "del",
                                        null,
                                        "￥55456"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { style: { width: '382px' } },
                                    "美眉专享价: ",
                                    React.createElement(
                                        "i",
                                        null,
                                        "￥"
                                    ),
                                    " ",
                                    React.createElement(
                                        "b",
                                        null,
                                        "451211.00"
                                    ),
                                    " ",
                                    React.createElement(
                                        "span",
                                        null,
                                        "x12"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "_btn", style: { padding: '9px' } },
                                    "立刻分期"
                                )
                            )
                        )
                    )
                ),
                React.createElement("div", { className: "f-g" }),
                React.createElement("div", { className: "five-g" }),
                React.createElement("div", { className: "s-g" }),
                React.createElement("div", { className: "sv-g" }),
                React.createElement(
                    "div",
                    { className: "e-g" },
                    React.createElement(
                        "div",
                        { className: "e-main" },
                        React.createElement(
                            "div",
                            { className: "e-content" },
                            React.createElement(
                                "div",
                                { className: "e-t" },
                                React.createElement("div", null),
                                React.createElement(
                                    "p",
                                    { style: { display: 'inline-block' } },
                                    "她们正在变美"
                                ),
                                React.createElement("div", null)
                            ),
                            React.createElement(
                                "div",
                                { className: "tab-list" },
                                React.createElement(
                                    "table",
                                    null,
                                    React.createElement(
                                        "tbody",
                                        null,
                                        React.createElement(
                                            "tr",
                                            null,
                                            React.createElement(
                                                "td",
                                                { className: "wid-10" },
                                                React.createElement(
                                                    "div",
                                                    null,
                                                    React.createElement("img", { src: "../static/images/combo/.jpg", alt: "" })
                                                )
                                            ),
                                            React.createElement(
                                                "td",
                                                { className: "wid-30" },
                                                React.createElement(
                                                    "div",
                                                    null,
                                                    "13657086451"
                                                )
                                            ),
                                            React.createElement(
                                                "td",
                                                { className: "wid-10" },
                                                React.createElement(
                                                    "div",
                                                    null,
                                                    "已预约"
                                                )
                                            ),
                                            React.createElement(
                                                "td",
                                                { className: "wid-20" },
                                                React.createElement(
                                                    "div",
                                                    null,
                                                    "木"
                                                )
                                            ),
                                            React.createElement(
                                                "td",
                                                { className: "wid-30" },
                                                React.createElement(
                                                    "div",
                                                    null,
                                                    "201001111110"
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return R_Combo;
}(React.Component);