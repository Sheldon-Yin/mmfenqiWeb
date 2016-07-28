/**
 * Created by sheldon on 2016/7/25.
 */
'use strict';

class R_LoginGetpwd extends React.Component {
    render() {
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
                                        新密码
                                    </div>
                                    <div style={{marginTop: 47}}>
                                        确认密码
                                    </div>
                                </div>
                            </div>
                            <div style={{height:589,width:750,float:'left'}}>
                                <div style={{marginTop:110}}>
                                    <input placeholder="请输入6-16位字符或数字"
                                           style={{width:340,height:44,border:'1px solid #e2e2e2',textIndent:'24px'}}/>
                                </div>
                                <div style={{marginTop:25}}>
                                    <input placeholder="请重新输入"
                                           style={{width:340,height:44,border:'1px solid #e2e2e2',textIndent:'24px'}}/>
                                </div>
                                <div
                                    style={{marginTop:25,backgroundColor:'#FD657A',height:45,width: 342,lineHeight:'45px',color: '#fff',textAlign:'center'}}>
                                    确认更改
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}