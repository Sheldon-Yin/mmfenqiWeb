/**
 * Created by sheldon on 2016/7/22.
 */
'use strict';

class R_Forget extends React.Component {

    constructor() {
        super();
        this.state = {
            phone:''
        };
        this.getVerifyCode = this.getVerifyCode.bind(this);
    }

    getVerifyCode(phone) {
        console.log(phone)
    }

    handlePhone(event){
        this.setState({phone: event.target.value});
    }

    render() {
        console.log(2);
        var phone = this.state.phone;
        return (
            <div
                style={{flexGrow:'1',width:'100%',backgroundImage:'url(../static/images/login-background.jpg)',backgroundRepeat:'no-repeat',backgroundSize:'100% 100%',minHeight: 680,display:'flex',flexDirection:'column',justifyContent:'center'}}>
                <div className="wrap">
                    <div style={{backgroundColor: '#fff',height: 638,width:1198,border:'1px solid #e2e2e2'}}>
                        <div
                            style={{height: 48,borderBottom:'1px solid #e2e2e2',backgroundColor:'#FCFCFC',textIndent:'24px',lineHeight:'48px',fontSize:'16px'}}>
                            找回密码
                        </div>
                        <div style={{height:589,width:1198}}>
                            <div style={{height:589,width:448,float:'left'}}>
                                <div style={{textAlign:'right',marginRight: 10}}>
                                    <div style={{marginTop: 124}}>
                                        手机号码
                                    </div>
                                    <div style={{marginTop: 47}}>
                                        短信验证码
                                    </div>
                                </div>
                            </div>
                            <form>
                                <div style={{height:589,width:750,float:'left'}}>
                                    <div style={{marginTop:110}}>
                                        <input placeholder="请输入有效手机号" value={phone} onChange={this.handlePhone}
                                               style={{width:340,height:44,border:'1px solid #e2e2e2',textIndent:'24px'}}/>
                                    </div>
                                    <div style={{marginTop:25}}>
                                        <input placeholder="请输入短信验证码" value={this.verifyCode}
                                               style={{width:188,height:44,border:'1px solid #e2e2e2',textIndent:'24px'}}/>
                                    <span onClick={this.getVerifyCode.bind(this,phone)}
                                          style={{display:'inline-block',backgroundColor:'#FD657A',height:45,width: 140,marginLeft:'12px',lineHeight:'45px',color: '#fff',textAlign:'center'}}>
                                        获取验证码
                                    </span>
                                    </div>
                                    <div
                                        style={{marginTop:25,backgroundColor:'#FD657A',height:45,width: 342,lineHeight:'45px',color: '#fff',textAlign:'center'}}>
                                        下一步
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}