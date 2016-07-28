
'use strict';

class RMy_pay extends React.Component {

    constructor(){
        super();
        this.state={
            downpayAmount:'',
            url:''
        }
    }

    getUrl(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }


    weixinMchPay(downpayAmount,orderId){
        let jsonData={
            downpayAmount:downpayAmount,
            orderId:orderId,
            type:'1',
            payType:'1'
        };
        $.ajax({
            type: 'post',
            url: '/pc/weixin/weixinMchPay',
            data: jsonData,
            dataType:'json',

            success:function (data) {
                this.setState({
                    url:'/pc/weixin/getQRCode?codeUrl='+data.data.resPar.codeUrl+''
                })

            }.bind(this)

        })
    }


    alipayTrade(){
        let downpayAmount=this.getUrl('bill_amount');
        let orderId=this.getUrl('orderId');
        window.location.href='/pc/alipayWeb/alipayTrade?downpayAmount='+downpayAmount+'&orderId='+orderId+'&type='+1+'';
    }





    componentDidMount() {

        let downpayAmount=this.getUrl('bill_amount');
        let orderId=this.getUrl('orderId');

        this.setState({
            downpayAmount:downpayAmount,
        });

        this.weixinMchPay(downpayAmount,orderId)

    }



    render() {
        return (
            <div className="wrap-content">
                <div className="title-info">
                    <div className="left">
                        <p>还款申请已提交，请尽快还款</p>
                        <p>收款方</p>
                    </div>
                    <div className="right">
                        <p>还款金额 <span>￥{this.state.downpayAmount}</span></p>
                    </div>
                </div>

                <div className="_sub">
                    <div className="pay-method">
                        选择支付方式
                    </div>
                    <div className="pay-content">
                        <div className="weChatPay">
                            <div className="good">
                                <img src="../static/images/my-pay/my-pay.png" alt=""/>
                            </div>
                            <div className="we-title">
                                <div><img src="../static/images/my-pay/pay2.png" alt=""/></div>
                                {/*<p>微信钱包支付</p>*/}
                                {/*<p>银行卡，信用卡都可以使用哦!</p>*/}
                            </div>
                            <div className="weixinma">
                               <div>
                                   <img src={this.state.url}  style={{width:'100%',height:'100%'}}/>
                               </div>
                                <p>请使用微信扫描下方的二维码完成支付</p>
                            </div>
                        </div>
                        <div className="alipay">
                            <div style={{paddingLeft:'40px',width:'815px'}}>
                                <img src="../static/images/my-pay/pay1.png" alt=""/>
                                {/*<p>支付宝支付</p>*/}
                                {/*<p>银行卡，信用卡都可以使用哦!</p>*/}
                            </div>
                            <div className="_btn" onClick={this.alipayTrade.bind(this)} style={{padding:'7px',borderRadius:'0'}}>去支付</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
