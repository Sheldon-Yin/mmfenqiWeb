/**
 * Created by sheldon on 2016/7/11.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_ChannelNav = function (_React$Component) {
    _inherits(R_ChannelNav, _React$Component);

    function R_ChannelNav(props) {
        _classCallCheck(this, R_ChannelNav);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(R_ChannelNav).call(this, props));

        _this.state = {
            category: []
        };
        return _this;
    }

    _createClass(R_ChannelNav, [{
        key: 'getCategory',
        value: function getCategory() {
            var _this2 = this;

            $.ajax({
                type: 'post',
                url: '/pc/computer/query_category_pc',
                dataType: 'json',
                success: function success(res) {
                    console.log(res);
                    if (res.result == 0) {
                        _this2.setState({ category: res.data.categoryList });
                    }
                }
            });
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.getCategory();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            $(function () {
                //频道页公用导航列表展现
                if ($(".all_left_list").length > 0) {

                    $(".all_left_list a").mouseover(function () {
                        if (!$(this).is(".now")) {
                            var nIn = $(this).index();
                            $(".infoShowCont").hide().css({ left: 194 });
                            $(this).addClass("now").siblings().removeClass("now");
                            $(".infoShowCont").show().animate({ left: 204 }, { duaration: 150, queue: !1 });
                            $(".btnItem2 li").eq(nIn).show().siblings().hide();
                        }
                    });
                    $(".all_list").mouseleave(function () {
                        $(".infoShowCont").hide().css({ "left": 194 });
                    });
                    $('.infoShowCont').hover(function () {
                        $('.all_left_list').addClass('all_left_on');
                    }, function () {
                        $('.all_left_list').removeClass('all_left_on');
                    });
                    $(".pull_down").mouseover(function () {
                        $(".all_list").show();
                    }).mouseleave(function () {
                        $(".all_list").hide();
                        $(".infoShowCont").hide().css({ "left": 194 });
                        $(".all_left_list a").removeClass("now");
                    });
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var categories = this.state.category.map(function (item, index) {
                return React.createElement(
                    'a',
                    { className: 'jingxuan', key: index,
                        target: '_blank' },
                    React.createElement(
                        'span',
                        null,
                        item.categoryName
                    )
                );
            });

            var detail = this.state.category.map(function (item, index) {
                var innerDetail = item.categoryList.map(function (subItem, subIndex) {
                    return React.createElement(
                        'a',
                        { key: subIndex,
                            href: "goods-list.html?categoryId=" + subItem.categoryId + "&categoryName=" + subItem.categoryName,
                            target: '_blank' },
                        subItem.categoryName
                    );
                });
                return React.createElement(
                    'li',
                    { key: index, className: 'jingxuan clearfix', style: { display: 'none' } },
                    innerDetail
                );
            });

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'channel_nav channel_nav_js' },
                    React.createElement(
                        'div',
                        { className: 'channel_nav_cont' },
                        React.createElement(
                            'div',
                            { className: 'pull_down left' },
                            React.createElement(
                                'span',
                                { className: 'all_kinds' },
                                '全部分类'
                            ),
                            React.createElement(
                                'div',
                                { className: 'all_list pos_abs', style: { display: 'none' } },
                                React.createElement(
                                    'div',
                                    { className: 'all_left_list' },
                                    categories
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'all_right_list infoShowCont', style: { left: 194, display: 'none' } },
                                    React.createElement(
                                        'ul',
                                        { className: 'btnItem2', style: { marginTop: 2 } },
                                        detail
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'big_nav left' },
                            React.createElement(
                                'a',
                                { href: 'index.html', className: 'now' },
                                '首页'
                            ),
                            React.createElement(
                                'a',
                                { href: 'combo.html' },
                                '网红套餐'
                            ),
                            React.createElement(
                                'a',
                                { href: 'goods.html' },
                                '限时秒杀'
                            )
                        )
                    )
                ),
                React.createElement('div', { className: 'clear' })
            );
        }
    }]);

    return R_ChannelNav;
}(React.Component);