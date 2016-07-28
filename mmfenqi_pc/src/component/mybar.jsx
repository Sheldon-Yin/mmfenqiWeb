/**
 * Created by sheldon on 2016/7/19.
 */
'use strict';

class R_MyBar extends React.Component {

    constructor(){
        super();
        this.state={
            creditStatus: '',
            imgUrl:'',
            nickName:'',
            realloanMoney:'',
            remainMoney:'',
            telePhone:''
        }
    }

    componentWillMount(){
        $.ajax({
            type: 'post',
            url: '/pc/computer/user_info',
            dataType: 'json',
            success: (res)=> {
                if (res.result == 0){
                    this.setState(res.data)
                }
            }
        })
    }

    render() {
        var creditType = '实名认证';
        switch (this.state.creditStatus){
            case '0':
                creditType = '初始状态';
                break;
            case '1':
                creditType = '已实名认证';
                break;
            case '2':
                creditType = '实名认证失败';
                break;
            case '3':
                creditType = '实名审核中';
                break;
            default:
                break;
        }

        return (
                <div style={{float:'left'}}>
                <div
                    style={{width:'239px',height:'273px',backgroundImage:'url("../static/images/mine/bar.png")',marginTop:-10,color:'#fff',backgroundRepeat:'no-repeat'}}>
                    <div style={{width:'230px',paddingLeft:15,paddingRight:15}}>
                        <img src={this.state.imgUrl}
                             style={{width:80,height:80,marginLeft:60,marginTop:10}}/>
                        <div style={{textAlign:'center',marginTop: 3,marginLeft:-30}}>
                            {this.state.nickName == '' ? this.state.telePhone : this.state.telePhone}
                        </div>
                        <div style={{marginTop:12}}>
                            {creditType}
                        </div>
                        <div style={{height:1,backgroundColor:'#fd8190',margin:'12px 0',width: 200}}></div>
                        <div>
                            <span style={{color:'#fdc3c3'}}>授信额度: </span><span style={{color:'#fff'}}> {this.state.realloanMoney}元</span>
                        </div>
                        <div>
                            <span style={{color:'#fdc3c3'}}>可用额度: </span><span style={{color:'#fff'}}> {this.state.remainMoney}元</span>
                        </div>
                        <div style={{marginTop:16,textAlign: 'center'}}>
                            <span style={{color:'#fdc3c3'}}>额度不够？</span><a href="my-credit.html" style={{color:'white'}}>去提额!</a>
                        </div>
                    </div>
                </div>
                <div
                    style={{backgroundColor:'#313131',height:'560px',width:'230px',marginTop:'-10px',color:'#a7a7a7',textAlign:'center'}}>
                    {
                        this.props.status == 'order' ?
                            <a
                                style={{height:48,lineHeight:'48px',borderBottom:'1px solid #222',backgroundColor:'#3e3e3e',display:'block',color:'#a7a7a7'}}>
                                <span>我的订单</span>
                                <div style={{backgroundColor: '#3a3a3a',height:1}}></div>
                            </a>
                            :
                            <a href="my-order.html"
                                style={{height:48,lineHeight:'48px',borderBottom:'1px solid #222',display:'block',color:'#a7a7a7'}}>
                                <span>我的订单</span>
                                <div style={{backgroundColor: '#3a3a3a',height:1}}></div>
                            </a>
                    }
                    {
                        this.props.status == 'bill' ?
                            <a
                                style={{height:48,lineHeight:'48px',borderBottom:'1px solid #222',backgroundColor:'#3e3e3e',display:'block',color:'#a7a7a7'}}>
                                <span>我的账单</span>
                                <div style={{backgroundColor: '#3a3a3a',height:1}}></div>
                            </a>
                            :
                            <a href="my-bill.html"
                                style={{height:48,lineHeight:'48px',borderBottom:'1px solid #222',display:'block',color:'#a7a7a7'}}>
                                <span>我的账单</span>
                                <div style={{backgroundColor: '#3a3a3a',height:1}}></div>
                            </a>
                    }
                    {
                        this.props.status == 'credit' ?
                            <a
                                style={{height:48,lineHeight:'48px',borderBottom:'1px solid #222',backgroundColor:'#3e3e3e',display:'block',color:'#a7a7a7'}}>
                                <span>我的信用</span>
                                <div style={{backgroundColor: '#3a3a3a',height:1}}></div>
                            </a>
                            :
                            <a href="my-credit.html"
                                style={{height:48,lineHeight:'48px',borderBottom:'1px solid #222',display:'block',color:'#a7a7a7'}}>
                                <span>我的信用</span>
                                <div style={{backgroundColor: '#3a3a3a',height:1}}></div>
                            </a>
                    }
                    {
                        this.props.status == 'setting' ?
                            <a
                                style={{height:48,lineHeight:'48px',borderBottom:'1px solid #222',backgroundColor:'#3e3e3e',display:'block',color:'#a7a7a7'}}>
                                <span>账号设置</span>
                                <div style={{backgroundColor: '#3a3a3a',height:1}}></div>
                            </a>
                            :
                            <a href="my-setting.html"
                                style={{height:48,lineHeight:'48px',borderBottom:'1px solid #222',display:'block',color:'#a7a7a7'}}>
                                <span>账号设置</span>
                                <div style={{backgroundColor: '#3a3a3a',height:1}}></div>
                            </a>
                    }
                </div>
            </div>
        )
    }
}
