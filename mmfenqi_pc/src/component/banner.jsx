/**
 * Created by sheldon on 2016/7/8.
 */
'use strict';

class R_Banner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            category: [],
            banner: []
        }
    }

    getCategory() {
        $.ajax({
            type: 'post',
            url: '/pc/computer/query_category_pc',
            dataType: 'json',
            success: (res)=> {
                console.log(res);
                if (res.result == 0) {
                    this.setState({category: res.data.categoryList})
                }
            }
        })
    }

    getBanner() {
        $.ajax({
            type: 'post',
            url: '/pc/computer/query_pictures_linking',
            dataType: 'json',
            data: {advertisingType: 'PC'},
            success: (res)=> {
                console.log(res);
                if (res.result == 0) {
                    this.setState({banner: res.data.advertisingLinkList});
                    this.bannerFlag = true;
                }
            }
        })
    }

    componentWillMount() {
        this.bannerFlag = false;
        this.bannerRenderAlready = false;
        this.getCategory();
        this.getBanner();
    }

    componentDidUpdate() {
        setTimeout(function () {
            $(".bannerImg li:eq(0) img").addClass("now");
        }, 100);
        //banner图
        var bannerTimer;
        var theS = 3000;

        if(this.bannerFlag && this.bannerRenderAlready!= true){
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
                $(".btnItem2").hide().css({left: -15});
                $(this).addClass("current").siblings().removeClass("current");
                $(".btnItem2").fadeIn(300).animate({left: 0}, {duaration: 350, queue: !1});
                $(".btnItem2 li").eq(nIn).show().siblings().hide();
                $(".fastZT2").show();
                $(".fastZT2 li").eq(nIn).show().siblings().hide();
            }
        });
        $(".banner").mouseleave(function () {
            $(".btnItem1 li").removeClass("current");
            $(".btnItem2,.btnItem2 li").hide();
            $(".fastZT2,.fastZT2 li").hide();
            $(".btnItem2").css({left: -15});
        });
        $(".tabList span").mouseover(function () {
            var nIn = $(this).index();
            $(this).addClass("now").siblings().removeClass("now");
            $(".tabShowCont ul").eq(nIn).show().siblings().hide();
        });


    }

    render() {

        var categories = this.state.category.map(function (item, index) {
            return (<li key={index} className="jingxuan"><span><a target="_blank">{item.categoryName}</a></span></li>)
        });

        var detail = this.state.category.map(function (item, index) {
            var innerDetail = item.categoryList.map(function (subItem, subIndex) {
                return (
                    <a key={subIndex}
                       href={"goods-list.html?categoryId=" + subItem.categoryId+"&categoryName=" + subItem.categoryName}
                       target="_blank">{subItem.categoryName}</a>
                )
            });
            return (<li key={index} className="jingxuan clearfix" style={{display: 'none'}}>
                {innerDetail}
            </li>)
        });

        var banner = this.state.banner.map(function (item, index) {

            return (<li style={{display: 'block', background: 'rgb(192, 200, 239)'}} key={index} className={index==0?'current':''}>
                <a href={item.linkHerf} target="_blank">
                    <img alt="" src={item.linkHerPic}
                         style={{display:'block'}}/></a>
            </li>)

        });

        var pagnation = this.state.banner.map(function (item, index) {

            return (
                <span className={index==0?'now':''} key={index}></span>
            )
        });

        return (
            <div className="banner">
                <ul className="bannerImg inner">
                    {banner}
                </ul>

                <div className="tabIcon">
                    {pagnation}
                </div>

                <span className="prev" style={{display: 'none'}}></span>
                <span className="next" style={{display: 'none'}}></span>

                <div className="btnList-all">
                    <p className="list-tit">全部分类</p>
                    <div className="btnCont">
                        <ul className="btnItem1">
                            {categories}
                        </ul>
                    </div>
                    <div className="infoShowCont">
                        <ul className="btnItem2" style={{left: '0px', display: 'block'}}>
                            {detail}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}