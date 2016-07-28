
'use strict';


class R_MyDetail extends React.Component {

    constructor(){
        super();
        this.state={
            data:[],
            orderDetailResponse:[]
        }
    }

    getDetail(orderId){
        let jsonData = {
            orderId:orderId
        };
        $.ajax({
            type: 'post',
            url: '/pc/computer/query_order_detail',
            data: jsonData,
            dataType: 'json',
            success: (data)=> {
                this.setState({
                    data: data,
                    orderDetailResponse: data.data.orderDetailResponse
                })
            }

        })
    }

    getType(orderStatus) {
        switch (orderStatus) {
            case '1':
                return '待支付';
                break;
            case '2':
                return '已支付';
                break;
            case '3':
                return '已完成';
                break;
            case '4':
                return '已取消';
            case '5':
                return '退款审核中';
            case '6':
                return '退款成功'
        }
    }

    componentDidMount() {

        var orderId=this.getUrl('id');

        this.getDetail(orderId);
    }

    getUrl(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
    }

    doUpload(){
        var formData = new FormData($( "#uploadForm" )[0]);
        var jsonData={
            informedConsentPic:formData,
        };

        $.ajax({
            url: '/pc/computer/upload_informed_consent' ,
            type: 'POST',
            data: jsonData,
            async: false,

            success: function (returndata) {
                alert(returndata);
            },
            error: function (returndata) {
                alert(returndata);
            }
        });
    }
    render() {

        let json = this.state.orderDetailResponse;


        return<div style={{float: 'left'}}>
            <div className="wrap-content">


                <div className="wrap-content-right">
                    <div>
                        <div className="top">
                            <ul>
                                <li>订单详情</li>
                            </ul>
                        </div>
                        <div className="top-content">

                            <div className="order-info">
                                订单信息
                            </div>
                            {/*已完成*/}
                            <div className="order-info-content"
                                 style={{display: json.orderStatus == '3' ? 'block' : 'none'}}>
                                <div className="left">
                                    <div style={{paddingTop: '0'}}>
                                        <ul style={{padding: '0', margin: '0'}}>
                                            <li>{json.orderId}</li>
                                            <li>订单状态:<span
                                                style={{color: '#3399eb'}}>{this.getType(json.orderStatus)}</span></li>
                                            <li>订单号:<span>{json.orderNo}</span></li>
                                            <li>下单时间:<span>{json.createTime}</span></li>
                                        </ul>
                                    </div>
                                    <div className="one">
                                        1.你已消费完成，可以选择评价，让更多人了解该项目效果
                                        <div className="_btn" style={{marginLeft: '10px'}}>去支付</div>
                                    </div>
                                    <div className="two">
                                        2.你还可以购买该项目
                                        <div className="_btn" style={{marginLeft: '10px'}}>去支付</div>
                                    </div>
                                </div>
                            </div>
                            {/*已取消*/}
                            <div className="order-info-content"
                                 style={{display: json.orderStatus == '4' ? 'block' : 'none'}}>
                                <div className="left">
                                    <div style={{paddingTop: '0'}}>
                                        <ul style={{padding: '0', margin: '0'}}>
                                            <li>订单状态:<span
                                                style={{color: '#ff802c'}}>{this.getType(json.orderStatus)}</span></li>
                                            <li>订单号: <span>{json.orderNo}</span></li>
                                            <li>下单时间:<span>{json.createTime}</span></li>
                                        </ul>
                                    </div>
                                    <div className="one">
                                        1.你已取消该订单，如有什么疑问，请致电美眉分期电话：400-2635-599
                                    </div>
                                    <div className="two">
                                        2.如果误操作该订单，你仍可以支付该订单
                                        <div className="_btn" style={{marginLeft: '10px'}}>去支付</div>
                                    </div>
                                </div>
                            </div>


                            {/*已支付*/}
                            <div className="order-info-content"
                                 style={{display: json.orderStatus == '2' ? 'block' : 'none'}}>
                                <div className="left">
                                    <div style={{paddingTop: '0'}}>
                                        <ul style={{padding: '0', margin: '0'}}>
                                            <li>订单状态:<span
                                                style={{color: '#3399eb'}}>{this.getType(json.orderStatus)}</span></li>
                                            <li>订单号:<span>{json.orderNo}</span></li>
                                            <li>下单时间:<span>{json.createTime}</span></li>
                                        </ul>
                                    </div>
                                    <div className="one">
                                        1.您已成功支付该订单，扫描美眉分期公众号或者下载美眉分期APP <br/>
                                        2.到医院签署知情同意书，并通过公众号或者APP上传 <br/>
                                        3.审核通过即可做该项目，如有疑问请致电：400-2635-599 <br/>
                                        4.为防止医院价格变动，请在一周之内尽快去消费该项目 <br/>
                                    </div>
                                    <div style={{padding: '10px 0'}}>查看该医院: <span>{json.hospital}</span></div>
                                    <div className="_btn">上传知情同意书</div>
                                </div>
                                <div className="right">
                                    <div>
                                        <div className="_dy">
                                            <p style={{textAlign: 'center'}}><img
                                                src="../static/images/evaluate/conmon.jpg" alt=""/></p>
                                            <p>关注美眉分期订阅号</p>
                                        </div>
                                        <div className="_gz">
                                            <p style={{textAlign: 'center'}}><img
                                                src="../static/images/evaluate/conmon.jpg" alt=""/></p>
                                            <p>关注美眉分期订阅号</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*待支付*/}
                            <div className="order-info-content"
                                 style={{display: json.orderStatus == '1' ? 'block' : 'none'}}>
                                <div className="left">
                                    <div style={{paddingTop: '0'}}>
                                        <ul style={{padding: '0', margin: '0'}}>
                                            <li>订单状态:<span
                                                style={{color: '#3399eb'}}>{this.getType(json.orderStatus)}</span></li>
                                            <li>订单号:<span>{json.orderNo}</span></li>
                                            <li>下单时间:<span>{json.createTime}</span></li>
                                        </ul>
                                    </div>
                                    <div style={{padding: '10px 0'}}>请在30：00分钟内完成支付，否则该订单将会取消</div>
                                    <div className="_btn">去支付</div>
                                </div>
                            </div>


                            {/*退款售后*/}
                            <div className="order-info-content"
                                 style={{display: json.orderStatus == '6' ? 'block' : 'none'}}>
                                <div className="left">
                                    <div style={{paddingTop: '0'}}>
                                        <ul style={{padding: '0', margin: '0'}}>
                                            <li>订单状态: <span
                                                style={{color: '#2ca8fe'}}>{this.getType(json.orderStatus)}</span></li>
                                            <li>订单号: <span>{json.orderNo}</span></li>
                                            <li>下单时间: <span>{json.createTime}</span></li>
                                        </ul>
                                    </div>
                                    <div style={{padding: '10px 0'}}>
                                        1.该订单已经进入退款流程，退款金额：0.00，信用额度：2300.00 <br/>
                                        2.如有支付保险费用，则不能退还，如有疑问请致电：400-2635-599
                                    </div>
                                </div>
                            </div>

                            <div className="project-info">项目信息</div>
                            <div>
                                <table cellSpacing="0" cellPadding="0" width="100%">
                                    <thead>
                                    <tr>
                                        <th style={{width: 350}}>项目名称</th>
                                        <th style={{width: 230}}>价格</th>
                                        <th style={{width: 150}}>数量</th>
                                        <th style={{width: 185}}>总价(元)</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="bg_bd">
                                        <td>
                                            <div className="goods-info">
                                                <div className="goods-info-left"><img src={json.goodsPic} width="100%"
                                                                                      height="100%"/></div>
                                                <div className="goods-info-right">
                                                    <li>{json.goodsName}</li>
                                                    <li>{json.hospital}</li>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <li></li>
                                            <li style={{color: '#999999'}}>{json.insuranceOrderAmount}</li>
                                        </td>
                                        <td>
                                            <li>12</li>
                                        </td>
                                        <td>
                                            <li style={{color: '#fc657a', fontSize: '20px'}}>{json.orderPrice}</li>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="information">分期信息</div>
                            <div>
                                <table cellSpacing="0" cellPadding="0">
                                    <thead>
                                    <tr>
                                        <th className="width-20">首付比例</th>
                                        <th className="width-20">首付金额</th>
                                        <th className="width-20">信用支付</th>
                                        <th className="width-20">分期数</th>
                                        <th className="width-20">月供</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="bg_bd">
                                        <td>
                                            <li>{json.downpayPercentage}</li>
                                        </td>
                                        <td>
                                            <li>{json.downpay_amount}</li>
                                        </td>
                                        <td>
                                            <li>{json.credit_payment}</li>
                                        </td>
                                        <td>
                                            <li>{json.stating}</li>
                                        </td>
                                        <td>
                                            <li style={{color: '#fc657a', fontSize: '20px'}}>{json.monthPay}</li>
                                            <li style={{color: '#999999'}}>(每月包含服务费{json.monthServicePay}元)</li>
                                        </td>
                                    </tr>


                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    }


}
