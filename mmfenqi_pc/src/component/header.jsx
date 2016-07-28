class R_Header extends React.Component {

    static logOut() {
        $.cookie('name', '', { expires: -1 ,path:'/'});
        $.cookie('appToken', '', { expires: -1 ,path:'/'});
        window.location.href = 'index.html'
    }

    render() {

        var name = $.cookie("name");

        return (
            <div>
                <div className="headNew-bg">
                    <div className="head-wrap">
                        <div className="index left">
                            <a href="index.html" target="_blank">美眉分期首页</a>
                            <em className="download"><img alt=""
                                                          src="http://icon.yuemei.com/front/common/images/erweimaHead.png"/></em>
                        </div>
                        <div className="box-xx box_xx-line left">|</div>
                        <div className="phone">
                            <a>美眉分期整形APP</a>
                            <em className="download"></em>
                        </div>
                        <div className="box-xx box_xx-line left">|</div>
                        <div className="weixin">
                            <a href="javascript:;">美眉分期微信号</a>
                            <em className="download"></em>
                        </div>
                        {
                            !name  ?
                                <div id="notLogin" className="sign-box to-sign">
                                    <div className="sign-right"><span><a href="login.html"
                                                                         rel="nofollow">登录</a></span></div>
                                    <div className="box-xx box_xx-line">|</div>
                                    <div className="sign-right"><span><a href="register.html"
                                                                         rel="nofollow">免费注册</a></span></div>
                                    <div className="box-xx box_xx-line">|</div>
                                    <div className="sign-right"><span><a href="http://www.baidu.com"
                                                                         rel="nofollow">商务合作</a></span></div>
                                    <div className="box-xx box_xx-line">|</div>
                                    <div className="sign-right"><span
                                        className="callUs">联系客服<em>400-711-8898</em></span>
                                    </div>
                                </div> :
                                <div className="sign-box to-sign">
                                    <div className="sign-right"><span><a href="my-order.html"
                                                                         rel="nofollow">{name}</a></span></div>
                                    <div className="box-xx box_xx-line">|</div>
                                    <div className="sign-right"><span><a href="javascript:void(0)"  onClick={R_Header.logOut}
                                                                         rel="nofollow">安全退出</a></span></div>
                                    <div className="box-xx box_xx-line">|</div>
                                    <div className="sign-right"><span><a href="http://www.baidu.com"
                                                                         rel="nofollow">商务合作</a></span></div>
                                    <div className="box-xx box_xx-line">|</div>
                                    <div className="sign-right"><span
                                        className="callUs">联系客服<em>400-711-8898</em></span>
                                    </div>
                                </div>
                        }

                        <div id="isLogin" className="sign-box sign-on" style={{display: 'none'}}></div>
                    </div>
                </div>
                <div className="clear"></div>
            </div>
        );
    }
}