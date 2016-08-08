'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_regSucc = function (_React$Component) {
    _inherits(R_regSucc, _React$Component);

    function R_regSucc() {
        _classCallCheck(this, R_regSucc);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(R_regSucc).apply(this, arguments));
    }

    _createClass(R_regSucc, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { style: { width: 1200, margin: '0 auto' } },
                React.createElement(
                    'div',
                    { className: 'wrap-content' },
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'a',
                            { href: 'my-credit.html' },
                            React.createElement(
                                'div',
                                { className: '_btn foot_btn' },
                                '立刻申请'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return R_regSucc;
}(React.Component);