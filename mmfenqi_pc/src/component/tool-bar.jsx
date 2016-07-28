/**
 * Created by sheldon on 2016/7/11.
 */
'use strict';

class R_ToolBar extends React.Component {
    render() {
        return (
            <div className="toolbar">
                <div className="inner">
                    <div className="toolbar-cent"><span className="toolbar-tab toolbar-ph"><i className="tab-hover">400-711-8898</i><em></em></span><a
                        href="javascript:void(0);"
                        className="toolbar-tab toolbar-zx"><i className="tab-hover">在线咨询</i><em></em></a><a
                        href="http://www.yuemei.com/app/kuaiwen.html" target="_blank"
                        className="toolbar-tab toolbar-app">
                        <i className="tab-hover"></i><em></em></a></div>
                    <div className="inner-bot"><span className="toolbar-tab toolbar-top"><i
                        className="tab-hover">回到顶部</i>
                        <em id="goTopBtn"></em>
                    </span>
                        <a href="http://www.yuemei.com/feedback/" target="_blank"
                           className="toolbar-tab toolbar-re"><i
                            className="tab-hover">意见反馈</i><em></em></a></div>
                </div>
            </div>
        )
    }
}