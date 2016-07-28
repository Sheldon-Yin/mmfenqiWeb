/**
 * Created by sheldon on 2016/7/11.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_Nav = function (_React$Component) {
    _inherits(R_Nav, _React$Component);

    function R_Nav() {
        _classCallCheck(this, R_Nav);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(R_Nav).apply(this, arguments));
    }

    _createClass(R_Nav, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "mainNav" },
                React.createElement(
                    "div",
                    { className: "wrap pos_rel" },
                    React.createElement(
                        "div",
                        { className: "navCont" },
                        React.createElement(
                            "a",
                            { href: "index.html", className: "now" },
                            "首页"
                        ),
                        React.createElement(
                            "a",
                            { href: "combo.html" },
                            "网红套餐"
                        ),
                        React.createElement(
                            "a",
                            { href: "goods.html" },
                            "限时秒杀"
                        )
                    ),
                    React.createElement("span", { className: "hoverLine" })
                )
            );
        }
    }]);

    return R_Nav;
}(React.Component);