/**
 * Created by sheldon on 2016/7/8.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_Logo = function (_React$Component) {
    _inherits(R_Logo, _React$Component);

    function R_Logo(props) {
        _classCallCheck(this, R_Logo);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(R_Logo).call(this, props));

        _this.state = {
            searchValue: ''
        };
        return _this;
    }

    _createClass(R_Logo, [{
        key: 'changeValue',
        value: function changeValue(event) {
            this.setState({
                searchValue: event.target.value
            });
        }
    }, {
        key: 'search',
        value: function search(e) {
            e.preventDefault();
            console.log(this.state.searchValue);
            window.open('goods-list.html?search=' + this.state.searchValue);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'bg-logo' },
                React.createElement(
                    'div',
                    { className: 'head-wrap' },
                    React.createElement(
                        'div',
                        { className: 'city' },
                        React.createElement('a', { title: '美眉分期', href: 'index.html',
                            style: { background: 'url("../static/images/common/logo.png") no-repeat' },
                            className: 'logo' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'ym-search' },
                        React.createElement(
                            'div',
                            { className: 'search-box' },
                            React.createElement(
                                'form',
                                { onSubmit: this.search.bind(this) },
                                React.createElement('input', { id: 'searchWd', style: { color: 'black' }, className: 'search', 'data-type': 'tao', onChange: this.changeValue.bind(this), value: this.state.searchValue,
                                    type: 'text', placeholder: '轮廓锁的美 还能巨补水' }),
                                React.createElement('input', { value: '搜索', type: 'submit', id: 'YMsearch',
                                    className: 'search-btn' })
                            )
                        ),
                        React.createElement(
                            'ul',
                            { className: 'search-list' },
                            React.createElement(
                                'li',
                                { 'data-type': '' },
                                React.createElement(
                                    'a',
                                    { href: 'http://so.yuemei.com/reviewsall//',
                                        target: '_blank' },
                                    React.createElement('span', null)
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'hotItem clearfix' },
                            React.createElement(
                                'a',
                                { target: '_blank', href: 'goods-list.html?search=玻尿酸' },
                                '玻尿酸'
                            ),
                            React.createElement(
                                'a',
                                { target: '_blank', href: 'goods-list.html?search=美白针' },
                                '美白针'
                            ),
                            React.createElement(
                                'a',
                                { target: '_blank', href: 'goods-list.html?search=双眼皮' },
                                '双眼皮'
                            ),
                            React.createElement(
                                'a',
                                { target: '_blank', href: 'goods-list.html?search=吸脂' },
                                '吸脂'
                            ),
                            React.createElement(
                                'a',
                                { target: '_blank', href: 'goods-list.html?search=水光针' },
                                '水光针'
                            ),
                            React.createElement(
                                'a',
                                { target: '_blank', href: 'goods-list.html?search=瘦脸针' },
                                '瘦脸针'
                            )
                        )
                    ),
                    React.createElement(
                        'a',
                        { className: 'App', href: 'my-bill.html', target: '_blank' },
                        React.createElement('img', { src: '../static/images/money.png', style: { position: 'absolute' } }),
                        React.createElement('div', { style: { marginTop: '40px', marginLeft: '90px' }, className: 'money-tips' })
                    )
                )
            );
        }
    }]);

    return R_Logo;
}(React.Component);