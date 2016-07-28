
'use strict';
class R_MySetting extends React.Component{
    render(){
        return(
            <div style={{float:'left'}}>
                <div className="wrap-content">
                    <div className="wrap-content-right">
                        <div>
                            <div className="top">
                                <ul>
                                    <li><h3>账户设置</h3></li>
                                </ul>
                            </div>
                            <div className="phone">
                                <ul>
                                    <li>
                                        <p className="left">
                                            <div>
                                                <img src="../static/images/phone.png" alt=""/>
                                            </div>
                                        </p>
                                        <div className="right">
                                            <p><b style={{fontSize:'16px'}}>手机号码</b> <span className="bg_b8">已认证</span></p>
                                            <p className="bg_b8">你绑定的手机号码是:136****6450</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="pwd">
                                <ul>
                                    <li>
                                        <p className="left">
                                            <div>
                                                <img src="../static/images/pwd.png" alt=""/>
                                            </div>
                                        </p>
                                        <div className="right">
                                            <p><b style={{fontSize:'16px'}}>登录密码</b></p>
                                            <p className="bg_b8">如账号出现异常，请及时修改密码</p>
                                        </div>
                                    </li>
                                    <li>
                                        <p>
                                           <span>修改</span><img src="../static/images/pwd-right.png" alt=""/>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
