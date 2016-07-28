/**
 * Created by sheldon on 2016/7/22.
 */
'use strict';

class R_LoginHeader
extends
React.Component
{
    render()
    {
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
                            <a href="http://www.yuemei.com/app/kuaiwen.html" target="_blank">美眉分期整形APP</a>
                            <em className="download"></em>
                        </div>
                        <div className="box-xx box_xx-line left">|</div>
                        <div className="weixin">
                            <a href="javascript:;">美眉分期微信号</a>
                            <em className="download"></em>
                        </div>
                        <div id="notLogin" className="sign-box to-sign">
                            <div className="sign-right"><span><a href="http://user.yuemei.com/user/login/"
                                                                 rel="nofollow">商务合作</a></span></div>
                            <div className="box-xx box_xx-line">|</div>
                            <div className="sign-right"><span className="callUs">联系客服<em>400-711-8898</em></span></div>
                        </div>
                        <div id="isLogin" className="sign-box sign-on" style={{display: 'none'}}></div>
                    </div>
                </div>
                <div className="clear"></div>
            </div>
        )
    }
}