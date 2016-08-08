/**
 * Created by sheldon on 2016/7/8.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_Swiper = function (_React$Component) {
    _inherits(R_Swiper, _React$Component);

    function R_Swiper() {
        _classCallCheck(this, R_Swiper);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(R_Swiper).apply(this, arguments));
    }

    _createClass(R_Swiper, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            console.log(2);
            var mySwiper = new Swiper('.swiper-container', {
                loop: true,

                // 如果需要分页器
                pagination: '.swiper-pagination',
                height: 300

            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'swiper-container', style: { height: 300 } },
                React.createElement(
                    'div',
                    { className: 'swiper-wrapper' },
                    React.createElement(
                        'div',
                        { className: 'swiper-slide' },
                        React.createElement('img', { style: { width: '100%' },
                            src: 'http://static.oschina.net/uploads/img/201307/04075541_TMjm.jpg' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'swiper-slide' },
                        React.createElement('img', { style: { width: '100%' },
                            src: 'http://image82.360doc.com/DownloadImg/2015/02/1918/50315705_14.jpg' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'swiper-slide' },
                        React.createElement('img', { style: { width: '100%' },
                            src: 'http://i93.photobucket.com/albums/l69/jamlei/5cm/504.jpg' })
                    )
                ),
                React.createElement('div', { className: 'swiper-pagination' })
            );
        }
    }]);

    return R_Swiper;
}(React.Component);