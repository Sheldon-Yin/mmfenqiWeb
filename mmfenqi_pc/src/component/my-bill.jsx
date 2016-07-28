'use strict';
class R_MyBill extends React.Component{

    constructor(){
        super();
        this.state={
            data:[],
            myBillResponse:[],
            isOpen:'',
            repaymentedBill:''
        }
    }

    myBill(periodType) {

        $('.top ul li').eq(periodType).addClass('color_fd5').siblings('li').removeClass('color_fd5');



        if(periodType=='2'){

            this.setState({
                isOpen:'0',
                repaymentedBill:'1'
            });

            let jsonData={
                appToken:'MMFQ%3AhfB4RC9zM82HRkTkKwp6kPQLFkQ1%2BVF%2Fca6h6dZVnZQL5%2BA810Gp%2BD8k2I4a%2BNkP'
            };

            $.ajax({
                type: 'post',
                url: '/pc/computer/repaymented_bill',
                data: jsonData,
                dataType: 'json',
                success: (data)=> {
                    console.log(data);
                    this.setState({
                        data: data.data,
                        myBillResponse: data.data.myBillResponse,
                    })
                }

            });
            return;
        }else if(periodType=='0'){
            this.setState({
                isOpen:'1',
                repaymentedBill:'0'
            })
        }else if(periodType=='1'){
            this.setState({
                isOpen:'0',
                repaymentedBill:'0'
            })
        }

        let jsonData = {
            periodType:periodType,
            appToken:'MMFQ%3AhfB4RC9zM82HRkTkKwp6kPQLFkQ1%2BVF%2Fca6h6dZVnZQL5%2BA810Gp%2BD8k2I4a%2BNkP'
        };
        $.ajax({
            type: 'post',
            url: '/pc/computer/user_bill',
            data: jsonData,
            dataType: 'json',
            success: (data)=> {
                console.log(data);
                this.setState({
                    data: data.data,
                    myBillResponse: data.data.myBillResponse,
                })
            }

        })
    }

    /*立即还款*/
    pay(id){
        if(id instanceof Array){
            var b = id.join(",");
            var repaymentPlanId=b;
        }else {
            var repaymentPlanId=id;
        }
        let jsonData={
            repaymentPlanId:repaymentPlanId,
            appToken:'MMFQ%3AhfB4RC9zM82HRkTkKwp6kPQLFkQ1%2BVF%2Fca6h6dZVnZQL5%2BA810Gp%2BD8k2I4a%2BNkP'
        };

        $.ajax({
            type: 'post',
            url: '/pc/computer/repayment',
            data: jsonData,
            dataType: 'json',
            success: (data)=> {

                console.log(data);
                var bill_amount=data.data.bill_amount;
                var orderId=data.data.orderId;
                var orderStr=data.data.orderStr;

                window.open('my-pay.html?bill_amount='+bill_amount+'&orderId='+orderId+'&orderStr='+orderStr+'');

                // window.open('my-detail.html?id=' + id + '');
            }

        })

    }

    componentDidMount() {
        this.myBill('0');

    }
    render(){
        var data=this.state.data;
        return (
            <div style={{float:'left'}}>
                <div className="wrap-content">
                    <div className="wrap-content-right">
                        <div>
                            <div className="top">
                                <ul>
                                    <li className="color_fd5" onClick={this.myBill.bind(this,'0')}>本期账单</li>
                                    <li onClick={this.myBill.bind(this,'1')}>下期账单</li>
                                    <li onClick={this.myBill.bind(this,'2')}>已全部还款账单</li>
                                </ul>
                            </div>

                            <div className="month-content" style={{display:this.state.data.billNum =='0' ? 'block':'none'}}>
                                <div style={{width:'150px',float:'left'}}>
                                    <ul>
                                        <li>亲，暂还没有订单哦！</li>

                                    </ul>
                                </div>

                            </div>


                            <div className="month-content" style={{display:this.state.isOpen=='1'&& this.state.data.billNum!='0' ? 'block':'none'}}>
                                <div style={{width:'150px',float:'left'}}>
                                <ul>
                                    <li>本月，共 <span>{this.state.data.billNum}</span>笔账单</li>
                                    <li>待还款 <span>￥{this.state.data.payBillAmount}</span></li>
                                    </ul>
                                </div>
                                <div className="_btn" onClick={this.pay.bind(this,this.state.data.payBillId)} style={{float:'left','marginTop':'33px'}}>
                                    立即还款
                                </div>
                            </div>
                            {
                                this.state.myBillResponse.map((json=>{
                                    return <div className="top-content" key={json.repaymentPlanId}>
                                        <div className="one">
                                            <div className="sub-content">
                                                <ul>
                                                    <li>距离还款日仅剩: <b>{json.to_repayment_date}</b></li>
                                                    <li>期数: <b>{json.staging}</b></li>
                                                    <li>到期时间: <b>{json.expiredTime}</b></li>
                                                    <li>还款状态: <b>{json.repayment_status}</b> </li>
                                                </ul>
                                                <ul>
                                                    <li style={{width:'70px'}}>商品名称: <b></b>   </li>
                                                    <li style={{width:'360px',paddingRight:'100px',color:'#7fa9d3'}}>{json.goodsName}</li>
                                                    <li>订单号: <b style={{color:'#7fa9d3'}}>{json.orderNo}</b></li>
                                                    <li>所属医院: <b>杭州</b> </li>
                                                </ul>
                                                <div className="repaymented_bill" style={{display:this.state.repaymentedBill=='1'?'block':'none'}}><img src="../static/images/repaymented_bill.png"/></div>
                                            </div>

                                            <div className="refund">

                                                <div>

                                                    <p>本期账单应付: <span>￥{json.payAmount}</span> </p>
                                                </div>
                                                <div style={{color:'#9e9e9e',marginLeft:'20px'}}>
                                                    应付明细:{json.payAmount}+{json.overBreachAmount} (逾期费)
                                                </div>

                                                <div className="btn" style={{display:this.state.isOpen=='1' ? 'inline-block':'none'}}>
                                                    <div  className="_btn" onClick={this.pay.bind(this,json.repaymentPlanId)}>立即还款</div>

                                                </div>
                                            </div>

                                            <div>
                                                <table cellSpacing="0"  cellPadding="0">
                                                    <thead>
                                                    <tr>
                                                        <th>分期金额(元)</th>
                                                        <th>分期数</th>
                                                        <th>到期时间</th>
                                                        <th>实际还款时间</th>
                                                        <th>还款状态</th>
                                                    </tr>
                                                    </thead>

                                                    {json.billStageList.map((list=>{
                                                        return<tbody className="bg_bd" key={list.id}>

                                                        <tr>
                                                            <td>
                                                                <li>￥{list.payAmount} <span>(包含逾期费:{list.overBreachAmount})</span></li>
                                                            </td>
                                                            <td>
                                                                <li>{list.staging}</li>
                                                            </td>
                                                            <td>
                                                                <li>{list.payTime}</li>
                                                            </td>
                                                            <td>
                                                                <li>{list.actualPayTime}</li>
                                                            </td>
                                                            <td>
                                                                <li>{list.status}</li>
                                                            </td>

                                                        </tr>
                                                        </tbody>

                                                    }))}
                                                </table>
                                            </div>

                                            <div className="page_foot">
                                                <div>4444</div>
                                                <div>共 <span>2</span>个账单，本期还款总额: <span>￥

                                            155454.00</span></div>

                                                <div className="pay_type">
                                                    全部付清
                                                </div>

                                            </div>
                                        </div>
                                        {/*<div className="two">*/}
                                        {/*<div className="sub-content">*/}
                                        {/*<ul>*/}
                                        {/*<li>距离还款日仅剩:</li>*/}
                                        {/*<li>期数</li>*/}
                                        {/*<li>到期时间:2016/12/20</li>*/}
                                        {/*<li>还款状态:</li>*/}
                                        {/*</ul>*/}
                                        {/*<ul>*/}
                                        {/*<li style={{width:'70px'}}>商品名称:    </li>*/}
                                        {/*<li style={{width:'360px',paddingRight:'100px'}}>上周上周上周上周上周上周上周上周上周上周上周上周上周上周上周上周上周</li>*/}
                                        {/*<li>订单号</li>*/}
                                        {/*<li>订单金额</li>*/}
                                        {/*</ul>*/}
                                        {/*</div>*/}
                                        {/*<div className="refund">*/}
                                        {/*<div>*/}

                                        {/*<p>本期账单应付: <span>￥2000.000</span> </p>*/}
                                        {/*</div>*/}
                                        {/*<div>*/}
                                        {/*应付明细:200.00+0.00 <span>(逾期费)</span>*/}
                                        {/*</div>*/}

                                        {/*<div className="btn">*/}
                                        {/*<a href="#">立即还款</a>*/}

                                        {/*</div>*/}


                                        {/*</div>*/}
                                        {/*</div>*/}

                                    </div>
                                }))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
