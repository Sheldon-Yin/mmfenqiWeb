
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_MyEvaluate = function (_React$Component) {
    _inherits(R_MyEvaluate, _React$Component);

    function R_MyEvaluate() {
        _classCallCheck(this, R_MyEvaluate);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(R_MyEvaluate).apply(this, arguments));
    }

    _createClass(R_MyEvaluate, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "wrap-content" },
                React.createElement(
                    "div",
                    { className: "title" },
                    React.createElement(
                        "p",
                        null,
                        React.createElement(
                            "b",
                            null,
                            "评价该项目"
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "_main" },
                    React.createElement(
                        "div",
                        { className: "evaluate-info" },
                        React.createElement(
                            "div",
                            { className: "left-info" },
                            React.createElement(
                                "div",
                                { className: "left-info-goods" },
                                React.createElement("img", { src: "../static/images/money.png", alt: "" }),
                                React.createElement(
                                    "div",
                                    null,
                                    "李建极李建极李建极李建极李建极李建极李建极"
                                ),
                                React.createElement(
                                    "div",
                                    { style: { color: '#999' } },
                                    "杭州时光医疗美容医院"
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "right-info" },
                            React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    "div",
                                    { className: "info1" },
                                    React.createElement(
                                        "ul",
                                        null,
                                        React.createElement(
                                            "li",
                                            null,
                                            React.createElement(
                                                "div",
                                                null,
                                                "手术效果"
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "info2" },
                                    React.createElement(
                                        "ul",
                                        null,
                                        React.createElement(
                                            "li",
                                            null,
                                            React.createElement(
                                                "div",
                                                null,
                                                "服务满意度"
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "info3" },
                                    React.createElement(
                                        "ul",
                                        null,
                                        React.createElement(
                                            "li",
                                            null,
                                            React.createElement(
                                                "div",
                                                null,
                                                "手术效果"
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "main-title" },
                                "评价爆照"
                            ),
                            React.createElement(
                                "div",
                                { className: "main-input" },
                                React.createElement("textarea", { name: "textarea", id: "textarea", cols: "110", rows: "8" })
                            ),
                            React.createElement(
                                "div",
                                { className: "upload" },
                                React.createElement("img", { src: "../static/images/evaluate/conmon.jpg" })
                            ),
                            React.createElement(
                                "div",
                                { className: "btn" },
                                React.createElement(
                                    "div",
                                    { className: "upload_btn" },
                                    "上传"
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return R_MyEvaluate;
}(React.Component);