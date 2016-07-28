/**
 * Created by sheldon on 2016/7/8.
 */
'use strict';

class R_Logo extends React.Component {
    render() {
        return (
            <div className="bg-logo">
                <div className="head-wrap">
                    <div className="city">
                        <a title="悦美网" href="index.html" style={{background: 'url("../static/images/common/logo.png") no-repeat'}} className="logo"></a>
                    </div>
                    <div className="ym-search">
                        <div className="search-box">
                            <input id="searchWd" className="search" data-type="tao" type="text" value=""/>
                                <label htmlFor="searchWd" className="hot-searchWd" style={{display: 'inline'}}>轮廓雕的美 还能巨补水</label>
                                <a id="YMsearch" href="javascript:" className="search-btn">搜索</a>

                        </div>
                        <ul className="search-list"><li data-type=""><a href="http://so.yuemei.com/reviewsall//" target="_blank"><span></span></a></li></ul>
                        <div className="hotItem clearfix">
                            <a target="_blank" href="http://so.yuemei.com/tao/%E7%8E%BB%E5%B0%BF%E9%85%B8/">玻尿酸</a>
                            <a target="_blank" href="http://so.yuemei.com/tao/%E7%BE%8E%E7%99%BD%E9%92%88/">美白针</a>
                            <a target="_blank" href="http://so.yuemei.com/tao/%E5%8F%8C%E7%9C%BC%E7%9A%AE/">双眼皮</a>
                            <a target="_blank" href="http://so.yuemei.com/tao/%E5%90%B8%E8%84%82/">吸脂</a>
                            <a target="_blank" href="http://so.yuemei.com/tao/%E6%B0%B4%E5%85%89%E9%92%88/">水光针</a>
                            <a target="_blank" href="http://so.yuemei.com/tao/%E7%98%A6%E8%84%B8%E9%92%88/">瘦脸针</a>
                        </div>
                    </div>
                    <a className="App" href="my-bill.html">
                        <img src="../static/images/money.png" style={{position:'absolute'}}/>
                        <div style={{marginTop:'40px',marginLeft:'90px'}} className="money-tips"></div>
                    </a>
                </div>
            </div>
        )
    }
}