/**
 * Created by sheldon on 2016/7/11.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_Advertisement = function (_React$Component) {
    _inherits(R_Advertisement, _React$Component);

    function R_Advertisement() {
        _classCallCheck(this, R_Advertisement);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(R_Advertisement).apply(this, arguments));
    }

    _createClass(R_Advertisement, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "wrap linkApp clearfix" },
                React.createElement(
                    "a",
                    { target: "_blank", href: "http://www.yuemei.com/z/20150402.html", className: "left" },
                    React.createElement("img", { alt: "", src: "http://icon.yuemei.com/front/index/images/pei2.jpg" })
                ),
                React.createElement(
                    "a",
                    { target: "_blank", href: "http://www.yuemei.com/app/kuaiwen.html", className: "right" },
                    React.createElement("img", { alt: "", src: "http://icon.yuemei.com/front/index/images/APP2.jpg" })
                )
            );
        }
    }]);

    return R_Advertisement;
}(React.Component);