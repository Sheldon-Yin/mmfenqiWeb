'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_Flex = function (_React$Component) {
    _inherits(R_Flex, _React$Component);

    function R_Flex(props) {
        _classCallCheck(this, R_Flex);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(R_Flex).call(this, props));

        _this.state = {
            blockOrnone: _this.props.blockOrnone
        };
        return _this;
    }

    // componentDidUpdate(){
    //     this.setState({
    //         blockOrnone:false
    //     })
    //
    //
    //     //console.log(this.props.blockOrnone)
    //
    // }

    _createClass(R_Flex, [{
        key: 'yescb',
        value: function yescb() {
            this.props.yescb();
        }

        // nocb(){
        //
        //    this.props.nocb()
        // }

    }, {
        key: 'nocb',
        value: function nocb() {

            // this.props.nocb()
            var new2 = false;
            this.setState({
                blockOrnone: new2
            });

            this.props.nocb(new2);
        }
    }, {
        key: 'render',
        value: function render() {
            0;

            var img = this.props.img;
            var img2 = img.abc;
            var foot = this.props.foot;

            console.log(foot.iscancle);
            return React.createElement(
                'div',
                { className: 'none', style: { display: this.props.blockOrnone == true ? 'block' : 'none' } },
                React.createElement('div', { className: '_z' }),
                React.createElement(
                    'div',
                    { style: this.props.option },
                    React.createElement(
                        'div',
                        { className: 'header' },
                        React.createElement(
                            'div',
                            { className: 'title' },
                            '提示'
                        ),
                        React.createElement(
                            'div',
                            { className: 'cance' },
                            'x'
                        )
                    ),
                    React.createElement(
                        'div',
                        { style: this.props.content },
                        React.createElement(
                            'div',
                            null,
                            React.createElement('img', { src: img2.props.src, alt: '' })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'foot' },
                        React.createElement(
                            'div',
                            { className: 'btn cancle_btn', style: { display: foot.iscancle ? 'none' : 'block' }, onClick: this.nocb.bind(this) },
                            '取消'
                        ),
                        React.createElement(
                            'div',
                            { className: 'btn sure_btn', onClick: this.yescb.bind(this) },
                            '确定'
                        )
                    )
                )
            );
        }
    }]);

    return R_Flex;
}(React.Component);