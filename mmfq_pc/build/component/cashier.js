/**
 * Created by sheldon on 2016/7/8.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_Cashier = function (_React$Component) {
    _inherits(R_Cashier, _React$Component);

    function R_Cashier(props) {
        _classCallCheck(this, R_Cashier);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(R_Cashier).call(this, props));
    }

    _createClass(R_Cashier, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { style: { borderBottom: '1px solid #fd657a' } },
                React.createElement(
                    'div',
                    { style: { width: 1200, margin: '0px auto' } },
                    React.createElement(
                        'div',
                        { style: { padding: '20px 100px' } },
                        React.createElement(
                            'a',
                            { href: 'index.html' },
                            React.createElement('img', { src: '../static/images/common/logo.png', alt: '' })
                        ),
                        React.createElement(
                            'div',
                            { style: { width: 96, display: 'inline-block' } },
                            React.createElement('div', { style: { display: this.props.one == '1' ? 'inline-block' : 'none', width: 2, height: 24, backgroundColor: '#e8e8e8', margin: '0 47px' } })
                        ),
                        React.createElement(
                            'div',
                            { style: { width: 82, display: 'inline-block' } },
                            React.createElement('img', { src: '../static/images/cashier/cashier.png', style: { display: this.props.two == '2' ? 'inline-block' : 'none' } })
                        ),
                        React.createElement(
                            'div',
                            { style: { display: 'inline-block', textAlign: 'right', width: 541 } },
                            React.createElement('img', { src: '../static/images/cashier/step1.png', alt: '', style: { display: this.props.three == '3' ? 'inline-block' : 'none' } }),
                            React.createElement('img', { src: '../static/images/cashier/step2.png', alt: '', style: { display: this.props.four == '4' ? 'inline-block' : 'none' } }),
                            React.createElement('img', { src: '../static/images/cashier/step3.png', alt: '', style: { display: this.props.five == '5' ? 'inline-block' : 'none' } })
                        )
                    )
                )
            );
        }
    }]);

    return R_Cashier;
}(React.Component);