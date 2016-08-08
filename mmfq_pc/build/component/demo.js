'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dr2 = function (_React$Component) {
    _inherits(Dr2, _React$Component);

    function Dr2(props) {
        _classCallCheck(this, Dr2);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dr2).call(this, props));

        _this.state = {
            temp2: _this.props.temp
        };

        return _this;
    }

    _createClass(Dr2, [{
        key: 'change',
        value: function change() {
            var temp3 = 'ljb';
            this.setState({
                temp2: temp3
            });
            this.props.cb(temp3);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { style: { height: 100, width: 100, backgroundColor: '#999' }, onClick: this.change.bind(this) },
                React.createElement(
                    'div',
                    null,
                    this.props.temp
                )
            );
        }
    }]);

    return Dr2;
}(React.Component);

var Dr = function (_React$Component2) {
    _inherits(Dr, _React$Component2);

    function Dr(props) {
        _classCallCheck(this, Dr);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Dr).call(this, props));

        _this2.state = {
            temp: 1,
            blockOrnone: false
        };

        _this2.config = {
            width: '400px',
            height: '300px',
            position: 'fixed',
            zIndex: 10,
            marginLeft: '-200px',
            left: '50%',
            top: '50%',
            marginTop: '-150px'

        };

        _this2.foot = {
            issure: true,
            iscancle: true
        };

        _this2.content = {
            position: 'relative',
            backgroundColor: '#FFFFff',
            height: 100,
            textAlign: 'left'
        };

        _this2.img = {
            abc: React.createElement('img', { src: '../static/images/app.jpg', alt: '' })
        };
        return _this2;
    }

    _createClass(Dr, [{
        key: 'change',
        value: function change(temp3) {
            this.setState({
                temp: temp3

            });
        }
    }, {
        key: 'alert',
        value: function alert() {
            this.setState({
                blockOrnone: true

            });
        }
    }, {
        key: 'yescb',
        value: function yescb() {
            this.setState({
                blockOrnone: false

            });
        }
    }, {
        key: 'nocb',
        value: function nocb(temp3) {
            this.setState({
                blockOrnone: temp3

            });
        }
    }, {
        key: 'render',
        value: function render() {

            var temp = this.state.temp;
            console.log(this.state.blockOrnone);
            return React.createElement(
                'div',
                null,
                React.createElement(Dr2, { temp: temp, cb: this.change.bind(this) }),
                temp,
                React.createElement(R_Flex, { option: this.config, content: this.content, blockOrnone: this.state.blockOrnone, yescb: this.yescb.bind(this), nocb: this.nocb.bind(this), img: this.img, foot: this.foot }),
                React.createElement(
                    'div',
                    { onClick: this.alert.bind(this) },
                    'ssssllslsllssfs'
                )
            );
        }
    }]);

    return Dr;
}(React.Component);