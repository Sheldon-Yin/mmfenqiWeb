/**
 * Created by sheldon on 2016/7/22.
 */
'use strict';

class R_LoginLogo extends React.Component {
    render() {
        return (
            <div className="bg-logo">
                <div className="head-wrap">
                    <div className="city">
                        <a title="悦美网" href="index.html" style={{background: 'url("../static/images/common/logo.png") no-repeat'}} className="logo"></a>
                    </div>
                    {
                        this.props.login == 1 ? <div style={{float:'right',lineHeight:'75px'}}>已有账号，<a href="login.html" style={{color:'#FD657A'}}>立即登录</a></div> : ''
                    }
                </div>
            </div>
        )
    }
}