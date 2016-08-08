/**
 * Created by sheldon on 2016/7/8.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_Banner = function (_React$Component) {
    _inherits(R_Banner, _React$Component);

    function R_Banner(props) {
        _classCallCheck(this, R_Banner);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(R_Banner).call(this, props));

        _this.state = {
            category: [],
            banner: []
        };
        return _this;
    }

    _createClass(R_Banner, [{
        key: 'getCategory',
        value: function getCategory() {
            var _this2 = this;

            $.ajax({
                type: 'post',
                url: '/pc/computer/query_category_pc',
                dataType: 'json',
                success: function success(res) {
                    if (res.result == 0) {
                        _this2.setState({ category: res.data.categoryList });
                    }
                }
            });
        }
    }, {
        key: 'getBanner',
        value: function getBanner() {
            var _this3 = this;

            $.ajax({
                type: 'post',
                url: '/pc/computer/query_pictures_linking',
                dataType: 'json',
                data: { advertisingType: 'PC' },
                success: function success(res) {
                    if (res.result == 0) {
                        _this3.setState({ banner: res.data.advertisingLinkList });
                        _this3.bannerFlag = true;
                    }
                }
            });
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.bannerFlag = false;
            this.bannerRenderAlready = false;
            this.getCategory();
            this.getBanner();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            setTimeout(function () {
                $(".bannerImg li:eq(0) img").addClass("now");
            }, 100);
            //banner图
            var bannerTimer;
            var theS = 3000;

            if (this.bannerFlag && this.bannerRenderAlready != true) {
                this.bannerRenderAlready = true;
                $(".tabIcon").mouseover(function () {
                    clearInterval(bannerTimer);
                });
                $(".tabIcon span").mouseover(function () {
                    $(".banner li img").removeClass("now");
                    var nIn = $(this).index();
                    $(this).addClass("now").siblings().removeClass("now");
                    $(".bannerImg li").eq(nIn).addClass("current").siblings("li").removeClass("current");
                    $(".bannerImg li").eq(nIn).fadeIn(200, function () {
                        $(this).find("img").fadeIn(100).toggleClass("now");
                    });
                    $(".bannerImg li").eq(nIn).siblings("li").fadeOut(700);
                });
                $(".bannerImg li img").mouseover(function () {
                    $(".prev,.next").fadeIn();
                });
                $(".banner").mouseleave(function () {
                    $(".prev,.next").hide();
                });
                //上翻
                $(".prev").click(function () {
                    $(".banner li img").removeClass("now");
                    var nIn = $(".bannerImg .current").index();
                    if (nIn < $(".bannerImg li").length && nIn > 0) {
                        nIn--;
                    } else {
                        nIn = $(".bannerImg li").length - 1;
                    }
                    $(".tabIcon span").eq(nIn).addClass("now").siblings().removeClass("now");
                    $(".bannerImg li").eq(nIn).addClass("current").siblings("li").removeClass("current");
                    $(".bannerImg li").eq(nIn).fadeIn(200, function () {
                        $(this).find("img").fadeIn(100).toggleClass("now");
                    });
                    $(".bannerImg li").eq(nIn).siblings("li").fadeOut(700);
                });
                //下翻
                $(".next").click(function () {
                    $(".banner li img").removeClass("now");
                    var nIn = $(".bannerImg .current").index();
                    if (nIn < $(".bannerImg li").length - 1) {
                        nIn++;
                    } else {
                        nIn = 0;
                    }
                    $(".tabIcon span").eq(nIn).addClass("now").siblings().removeClass("now");
                    $(".bannerImg li").eq(nIn).addClass("current").siblings("li").removeClass("current");
                    $(".bannerImg li").eq(nIn).fadeIn(200, function () {
                        $(this).find("img").fadeIn(100).toggleClass("now");
                    });
                    $(".bannerImg li").eq(nIn).siblings("li").fadeOut(700);
                });
                $(".bannerImg").hover(function () {
                    clearInterval(bannerTimer);
                }, function () {
                    clearInterval(bannerTimer);
                    bannerTimer = setInterval(bannerEffet, theS);
                }).trigger("mouseleave");
                //banner图---end
                var serveTimer = setTimeout(function () {
                    var nIn = $(".serveTab .now").index();
                    if (nIn < 1) {
                        nIn++;
                    } else {
                        nIn = 0;
                    }
                    $(".serveTab span").eq(nIn).addClass("now").siblings().removeClass("now");
                    $(".serveCont ul").eq(nIn).show().siblings().hide();
                    serveTimer = setTimeout(function () {
                        var nIn = $(".serveTab .now").index();
                        if (nIn < 1) {
                            nIn++;
                        } else {
                            nIn = 0;
                        }
                        $(".serveTab span").eq(nIn).addClass("now").siblings().removeClass("now");
                        $(".serveCont ul").eq(nIn).show().siblings().hide();
                    }, theS);
                }, theS);
                $(".serveTab span").click(function () {
                    clearTimeout(serveTimer);
                    var nIn = $(this).index();
                    $(this).addClass("now").siblings().removeClass("now");
                    $(".serveCont ul").eq(nIn).show().siblings().hide();
                });
            }

            function bannerEffet() {
                var nIn = $(".bannerImg .current").index();
                $(".bannerImg li img").removeClass("now");
                if (nIn < $(".bannerImg li").length - 1) {
                    nIn++;
                } else {
                    nIn = 0;
                }
                $(".bannerImg li").eq(nIn).addClass("current").siblings("li").removeClass("current");
                $(".bannerImg li").eq(nIn).fadeIn(200, function () {
                    $(this).find("img").fadeIn(100).toggleClass("now");
                });
                $(".bannerImg li").eq(nIn).siblings("li").fadeOut(700);
                $(".tabIcon span").eq(nIn).addClass("now").siblings().removeClass("now");
            }

            $(".btnItem1 li").mouseover(function () {
                if (!$(this).is(".current")) {
                    var nIn = $(this).index();
                    $(".btnItem2").hide().css({ left: -15 });
                    $(this).addClass("current").siblings().removeClass("current");
                    $(".btnItem2").fadeIn(300).animate({ left: 0 }, { duaration: 350, queue: !1 });
                    $(".btnItem2 li").eq(nIn).show().siblings().hide();
                    $(".fastZT2").show();
                    $(".fastZT2 li").eq(nIn).show().siblings().hide();
                }
            });
            $(".banner").mouseleave(function () {
                $(".btnItem1 li").removeClass("current");
                $(".btnItem2,.btnItem2 li").hide();
                $(".fastZT2,.fastZT2 li").hide();
                $(".btnItem2").css({ left: -15 });
            });
            $(".tabList span").mouseover(function () {
                var nIn = $(this).index();
                $(this).addClass("now").siblings().removeClass("now");
                $(".tabShowCont ul").eq(nIn).show().siblings().hide();
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var categories = this.state.category.map(function (item, index) {
                return React.createElement(
                    'li',
                    { key: index, className: 'jingxuan' },
                    React.createElement(
                        'div',
                        { style: { width: 35, height: 35, marginLeft: 25, marginRight: 15, float: 'left', display: 'flex' } },
                        React.createElement('img', { src: item.categoryPicPC, style: { margin: 'auto' } })
                    ),
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

            console.log(this.state.banner);
            var banner = this.state.banner.map(function (item, index) {

                return React.createElement(
                    'li',
                    { style: { display: 'block', background: item.backgroundColor }, key: index,
                        className: index == 0 ? 'current' : '' },
                    React.createElement(
                        'a',
                        { href: item.linkHerf, target: '_blank' },
                        React.createElement('img', { alt: '', src: item.linkHerPic,
                            style: { display: 'block' } })
                    )
                );
            });

            var pagnation = this.state.banner.map(function (item, index) {

                return React.createElement('span', { className: index == 0 ? 'now' : '', key: index });
            });

            return React.createElement(
                'div',
                { className: 'banner' },
                React.createElement(
                    'ul',
                    { className: 'bannerImg inner' },
                    banner
                ),
                React.createElement(
                    'div',
                    { className: 'tabIcon' },
                    pagnation
                ),
                React.createElement('span', { className: 'prev', style: { display: 'none' } }),
                React.createElement('span', { className: 'next', style: { display: 'none' } }),
                React.createElement(
                    'div',
                    { className: 'btnList-all' },
                    React.createElement(
                        'div',
                        { className: 'pull_down left', style: { marginTop: -1 } },
                        React.createElement(
                            'span',
                            { className: 'all_kinds' },
                            '全部分类'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'btnCont' },
                        React.createElement(
                            'ul',
                            { className: 'btnItem1' },
                            categories
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'infoShowCont' },
                        React.createElement(
                            'ul',
                            { className: 'btnItem2', style: { left: '0px', display: 'block' } },
                            detail
                        )
                    )
                )
            );
        }
    }]);

    return R_Banner;
}(React.Component);