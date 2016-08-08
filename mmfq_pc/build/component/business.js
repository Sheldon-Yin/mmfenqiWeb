/**
 * Created by ChinaHp on 2016/8/3.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_Business = function (_React$Component) {
    _inherits(R_Business, _React$Component);

    function R_Business() {
        _classCallCheck(this, R_Business);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(R_Business).apply(this, arguments));
    }

    _createClass(R_Business, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'wrap-business', style: { background: '#ffffff' } },
                React.createElement(
                    'div',
                    { className: 'business-wrap-top2' },
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'a',
                            { href: 'commerce-add.html' },
                            React.createElement(
                                'div',
                                { className: 'btn submit-btn', style: { backgroundColor: '#ff5a53', padding: 10 } },
                                '立即申请入驻'
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'partTit' },
                    React.createElement(
                        'p',
                        null,
                        React.createElement(
                            'span',
                            null,
                            React.createElement(
                                'em',
                                { className: 'ft31' },
                                React.createElement(
                                    'i',
                                    { className: 'pink' },
                                    '城市合作代表'
                                )
                            ),
                            React.createElement(
                                'i',
                                { className: 'eng' },
                                'City Cooperation Representative'
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'business-wrap-content2' },
                    React.createElement(
                        'ul',
                        null,
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'div',
                                null,
                                React.createElement('img', { src: '../static/images/commerce/hos1.jpg', alt: '' })
                            ),
                            React.createElement(
                                'div',
                                null,
                                '杭州格莱美整形美容医院'
                            )
                        ),
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'div',
                                null,
                                React.createElement('img', { src: '../static/images/commerce/hos2.jpg', alt: '' })
                            ),
                            React.createElement(
                                'div',
                                null,
                                '杭州美莱医疗美容医院'
                            )
                        ),
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'div',
                                null,
                                React.createElement('img', { src: '../static/images/commerce/hos3.jpg', alt: '' })
                            ),
                            React.createElement(
                                'div',
                                null,
                                '杭州时光医疗美容医院'
                            )
                        ),
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'div',
                                null,
                                React.createElement('img', { src: '../static/images/commerce/hos4.jpg', alt: '' })
                            ),
                            React.createElement(
                                'div',
                                null,
                                '杭州同欣整形美容医院'
                            )
                        ),
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'div',
                                null,
                                React.createElement('img', { src: '../static/images/commerce/hos5.jpg', alt: '' })
                            ),
                            React.createElement(
                                'div',
                                null,
                                '杭州维多利亚医疗美容医院'
                            )
                        ),
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'div',
                                null,
                                React.createElement('img', { src: '../static/images/commerce/hos6.jpg', alt: '' })
                            ),
                            React.createElement(
                                'div',
                                null,
                                '杭州整形医院'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return R_Business;
}(React.Component);