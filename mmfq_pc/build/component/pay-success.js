/**
 * Created by sheldon on 2016/7/11.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_PaySuccess = function (_React$Component) {
    _inherits(R_PaySuccess, _React$Component);

    function R_PaySuccess(props) {
        _classCallCheck(this, R_PaySuccess);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(R_PaySuccess).call(this, props));

        _this.state = {
            orderId: ''
        };
        return _this;
    }

    _createClass(R_PaySuccess, [{
        key: 'getUrl',
        value: function getUrl(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);return null;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var orderId = this.getUrl('orderId');
            this.setState({
                orderId: orderId
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'wrap-content' },
                React.createElement(
                    'div',
                    { className: 'main' },
                    React.createElement('img', { src: '../static/images/pay-success.jpg', alt: '' })
                ),
                React.createElement(
                    'div',
                    { className: '_foot' },
                    React.createElement(
                        'a',
                        { href: 'index.html' },
                        React.createElement(
                            'div',
                            { className: '_btn btn_btn', style: { padding: '10px', borderRadius: '0' } },
                            '返回首页'
                        )
                    ),
                    React.createElement(
                        'a',
                        { href: 'my-order.html' },
                        React.createElement(
                            'div',
                            { className: '_btn btn_btn', style: { padding: '10px', borderRadius: '0' } },
                            '查看订单'
                        )
                    )
                )
            );
        }
    }]);

    return R_PaySuccess;
}(React.Component);