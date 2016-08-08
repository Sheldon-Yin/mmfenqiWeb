'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_MyCollects = function (_React$Component) {
    _inherits(R_MyCollects, _React$Component);

    function R_MyCollects() {
        _classCallCheck(this, R_MyCollects);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(R_MyCollects).apply(this, arguments));
    }

    _createClass(R_MyCollects, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { style: { float: 'left' } },
                React.createElement(
                    'div',
                    { className: 'wrap-content' },
                    React.createElement(
                        'div',
                        { className: 'wrap-content-right' },
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                { className: 'top' },
                                React.createElement(
                                    'ul',
                                    null,
                                    React.createElement(
                                        'li',
                                        null,
                                        '本期账单'
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'top-content' },
                                React.createElement(
                                    'div',
                                    { className: 'goods-collect' },
                                    React.createElement(
                                        'ul',
                                        null,
                                        React.createElement(
                                            'li',
                                            null,
                                            React.createElement(
                                                'a',
                                                { href: 'http://tao.yuemei.com/17759/', target: '_blank', className: 'infoImg' },
                                                React.createElement('img', { src: 'http://p35.yuemei.com/tao/211_144/2015/1126/151126111825_1b6d65.jpg', alt: '' }),
                                                React.createElement(
                                                    'i',
                                                    { className: 'lastDays' },
                                                    React.createElement(
                                                        'b',
                                                        null,
                                                        '仅剩15天'
                                                    )
                                                ),
                                                ' '
                                            ),
                                            React.createElement(
                                                'a',
                                                { href: 'http://tao.yuemei.com/17759/', target: '_blank', className: 'infoTxt' },
                                                React.createElement(
                                                    'div',
                                                    { className: 'babyInfo' },
                                                    React.createElement(
                                                        'p',
                                                        { className: 'infoTit1' },
                                                        '[ 广州全切双眼皮 ]公立三甲 专业医师 全切双眼皮 重睑同时去皮去脂 美丽双眼不臃肿'
                                                    ),
                                                    React.createElement(
                                                        'p',
                                                        { className: 'infoTit2' },
                                                        React.createElement(
                                                            'span',
                                                            { className: 'pink' },
                                                            React.createElement(
                                                                'i',
                                                                null,
                                                                '￥'
                                                            ),
                                                            '280x10'
                                                        ),
                                                        React.createElement(
                                                            'del',
                                                            null,
                                                            '￥4250'
                                                        ),
                                                        React.createElement(
                                                            'b',
                                                            { className: 'info-lab return-lab' },
                                                            '返现'
                                                        )
                                                    ),
                                                    React.createElement(
                                                        'p',
                                                        { className: 'infoTit3' },
                                                        React.createElement(
                                                            'a',
                                                            { href: '#' },
                                                            '去购买'
                                                        )
                                                    )
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

    return R_MyCollects;
}(React.Component);