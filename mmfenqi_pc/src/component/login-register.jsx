/**
 * Created by sheldon on 2016/7/22.
 */
'use strict';

class R_Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {userType: 1};
    }

    changeType(x) {
        this.setState({userType: x})
    }

    render() {
        return (
            <div
                style={{flexGrow:'1',width:'100%',backgroundImage:'url(../static/images/login-background.jpg)',backgroundRepeat:'no-repeat',backgroundSize:'100% 100%',minHeight: 680,display:'flex',flexDirection:'column',justifyContent:'center'}}>
                <div className="wrap">
                    <div style={{backgroundColor: '#fff',height: 638,width:1198,border:'1px solid #e2e2e2'}}>
                        <div
                            style={{height: 48,borderBottom:'1px solid #e2e2e2',backgroundColor:'#FCFCFC',textIndent:'24px',lineHeight:'48px',fontSize:'16px'}}>
                            账号注册
                        </div>
                        <div style={{height:589,width:1198}}>
                            <div style={{height:589,width:448,float:'left'}}>
                                <div style={{textAlign:'right',marginRight: 10}}>
                                    <div style={{marginTop: 48}}>
                                        身份选择
                                    </div>
                                    <div style={{marginTop: 79}}>
                                        手机号码
                                    </div>
                                    <div style={{marginTop: 49}}>
                                        短信验证码
                                    </div>
                                    <div style={{marginTop: 49}}>
                                        登录密码
                                    </div>
                                    <div style={{marginTop: 49}}>
                                        确认密码
                                    </div>
                                </div>
                            </div>
                            <div style={{height:589,width:750,float:'left'}}>
                                {
                                    this.state.userType ?
                                        <div style={{marginTop:24,display:'flex'}}>
                                            <div style={{marginLeft: 16}}>
                                                <img src="../static/images/login/student-checked.png"
                                                     style={{width:58,height:65}}/>
                                                <br/>
                                                <div style={{color:'#FD6F83'}}>我是学生</div>
                                            </div>
                                            <div style={{marginLeft:180}}>
                                                <img src="../static/images/login/white-unchecked.png"
                                                     style={{width:58,height:65}}
                                                     onClick={this.changeType.bind(this,0)}/>
                                                <br/>
                                                <div>我是白领</div>
                                            </div>
                                        </div>
                                        :
                                        <div style={{marginTop:24,display:'flex'}}>
                                            <div style={{marginLeft: 16}}>
                                                <img src="../static/images/login/student-unchecked.png"
                                                     style={{width:58,height:65}}
                                                     onClick={this.changeType.bind(this,1)}/>
                                                <div>我是学生</div>
                                            </div>
                                            <div style={{marginLeft:180}}>
                                                <img src="../static/images/login/white-checked.png"
                                                     style={{width:58,height:65}}/>
                                                <div style={{color:'#FD6F83'}}>我是白领</div>
                                            </div>
                                        </div>
                                }
                                <div style={{marginTop:25}}>
                                    <input placeholder="请输入有效手机号"
                                           style={{width:340,height:44,border:'1px solid #e2e2e2',textIndent:'24px'}}/>
                                </div>
                                <div style={{marginTop:25}}>
                                    <input placeholder="请输入短信验证码" value={this.verifyCode}
                                           style={{width:188,height:44,border:'1px solid #e2e2e2',textIndent:'24px'}}/>
                                    <span
                                          style={{display:'inline-block',backgroundColor:'#FD657A',height:45,width: 140,marginLeft:'12px',lineHeight:'45px',color: '#fff',textAlign:'center'}}>
                                        获取验证码
                                    </span>
                                </div>
                                <div style={{marginTop:25}}>
                                    <input placeholder="请输入6-16位字符或数字"
                                           style={{width:340,height:44,border:'1px solid #e2e2e2',textIndent:'24px'}}/>
                                </div>
                                <div style={{marginTop:25}}>
                                    <input placeholder="请保持两次密码一致"
                                           style={{width:340,height:44,border:'1px solid #e2e2e2',textIndent:'24px'}}/>
                                </div>
                                <div
                                    style={{marginTop:25,backgroundColor:'#FD657A',height:45,width: 342,lineHeight:'45px',color: '#fff',textAlign:'center'}}>
                                    注册
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}