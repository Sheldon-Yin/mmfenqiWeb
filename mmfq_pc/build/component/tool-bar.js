/**
 * Created by sheldon on 2016/7/11.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_ToolBar = function (_React$Component) {
    _inherits(R_ToolBar, _React$Component);

    function R_ToolBar() {
        _classCallCheck(this, R_ToolBar);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(R_ToolBar).apply(this, arguments));
    }

    _createClass(R_ToolBar, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.write("<script src='//kefu.easemob.com/webim/easemob.js?tenantId=13699&hide=false'></script><script src='//kefu.easemob.com/webim/easemob.js?tenantId=13699&hide=false&sat=true'></script>");
        }
    }, {
        key: 'backTop',
        value: function backTop() {
            window.location.href = '#top';
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                'div',
                { className: 'toolbar' },
                React.createElement(
                    'div',
                    { className: 'inner' },
                    React.createElement(
                        'div',
                        { className: 'toolbar-cent' },
                        React.createElement(
                            'span',
                            { className: 'toolbar-tab toolbar-ph' },
                            React.createElement(
                                'i',
                                { className: 'tab-hover' },
                                '400-711-8898'
                            ),
                            React.createElement('em', null)
                        ),
                        React.createElement(
                            'a',
                            { target: '_blank',
                                className: 'toolbar-tab toolbar-app' },
                            React.createElement('i', { className: 'tab-hover' }),
                            React.createElement('em', null)
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'inner-bot' },
                        React.createElement(
                            'span',
                            { className: 'toolbar-tab toolbar-top', onClick: this.backTop },
                            React.createElement(
                                'i',
                                {
                                    className: 'tab-hover' },
                                '回到顶部'
                            ),
                            React.createElement('em', { id: 'goTopBtn' })
                        )
                    )
                )
            );
        }
    }]);

    return R_ToolBar;
}(React.Component);