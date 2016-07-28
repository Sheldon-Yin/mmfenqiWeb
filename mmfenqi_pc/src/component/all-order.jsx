/**
 * Created by sheldon on 2016/7/19.
 */
'use strict';

class R_AllOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            myOrderResponse: [],
            abc: [],
            paid_number: '',// 待支付数量
            completed_number: '',// 已支付数量
            using_number: '', //已完成数量
            cancel_number: '', //已取消数量
            refund_number: '',//refund_number
            id:'',
            pic_img:[],

            index:1,//上传所需

        }
    }

    loadComments(orderStatus) {
        if(orderStatus=='-1'){
            $('.top ul li').eq(0).addClass('color_fd').siblings('li').removeClass('color_fd')
        }else{

            $('.top ul li').eq(orderStatus).addClass('color_fd').siblings('li').removeClass('color_fd');
        }

        let jsonData = {
            orderStatus: orderStatus
        };
        $.ajax({
            type: 'post',
            url: '/pc/computer/query_my_order',
            data: jsonData,
            dataType: 'json',
            success: (data)=> {
                this.setState({
                    data: data,
                    myOrderResponse: data.data.myOrderResponse,
                    paid_number: data.data.paid_number,
                    completed_number: data.data.completed_number,
                    using_number: data.data.using_number,
                    cancel_number: data.data.cancel_number,
                    refund_number: data.data.refund_number
                });
            }

        });
    }

    detail(id) {
        window.open('my-detail.html?id=' + id + '');
    }

    componentDidMount() {
        this.loadComments('-1');
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


    /*上传按钮*/
    _uploadBtn(id){

        this.setState({
            id:id
        });


        $('._layer').css('display','block');


        this.look_informed_consent(id);

    }

    /*删除知情同意书*/

    delete_img(i){
        console.log(i);
        var jsonData={
            index:i+1,
            orderId:this.state.id
        };
        $.ajax({
            type:'post',
            url:'/pc/computer/del_informed_consent',
            data: jsonData,
            dataType: 'json',
            success: function(res) {

                if(res.result=='0'){


                    console.log(this.state.pic_img);

                    // this.setState({
                    //     pic_img: this.state.pic_img.splice(i,i+1)
                    // })




                    $("#"+i).remove();



                    this.look_informed_consent(this.state.id);


                }

            }.bind(this)
        })
    }

    /*确定上传*/

    confirm_upload(){

        var jsonData={
            orderId:this.state.id
        };



        $.ajax({
            type:'post',
            url:'/pc/computer/confirm_upload',
            data: jsonData,
            dataType: 'json',
            success: (data)=> {


                if(data.result=='0'){

                    this.setState({
                        pic_img:[]
                    });

                    $('._layer').css('display','none');

                    window.location.reload()



                }

            }
        })

    }


    /*查看知情同意书*/

    look_informed_consent(id){
        var jsonData={
            orderId:id,
           

        };

        $.ajax({
            url: '/pc/computer/query_informed_consent',
            type: 'post',
            data:  jsonData,
            dataType: 'json',
            success:function (res) {
                if(res.result=='0'){
                    var index_l=res.data.informedConsent.length;



                    this.setState({
                        pic_img:res.data.informedConsent,
                        index:++index_l
                    });
                }
            }.bind(this)
        })
    }

    cancle(){
        $('._layer').css('display','none');
    }
    /*选择图片上传*/
    _upload(){

        var data = new FormData();
        data.append('orderId', this.state.id);
        data.append('index', this.state.index);
        data.append('informedConsentPic', $("#_file")[0].files[0]);


        console.log($("#_file")[0].files[0]);
        //console.log(new FormData($('#uploadForm')[0]));
        var json={
            informedConsentPic:$("#_file")[0].files[0],
            orderId:this.state.id,
            index:1,
           
        };

        console.log(this.state);

        $.ajax({
            url: '/pc/computer/upload_informed_consent',
            type: 'post',
            data:  data,
            contentType: false,
            processData: false,
            success:function (res) {
                if(res.result=='0'){
                    this.setState({
                        pic_img:this.state.pic_img.concat(res.data.informedConsentPicUrl)
                    });

                    this.look_informed_consent(this.state.id);


                }
            }.bind(this)
        })
    }

    /*取消订单*/

    cancel_order(id){

        this.setState({
            id:id
        });

        layer.open({
            title: '请填写取消原因',
            type: 1,
            shade: 0.3,
            closeBtn: 1, //不显示关闭按钮
            btn: ['取消', '确认'],
            area: ['400px', '180'],
            content:'<div><p><img src="../../build/static/images/ca_od.jpg" alt="" style="vertical-align: middle;"> 确认取消该订单？</p></div>',
            btn1: function (index, layero) {
                layer.closeAll();
            },
            btn2: function () {
                var jsonData={
                    orderId:this.state.id,
                   
                };

                $.ajax({
                    url: '/pc/computer/cancel_order',
                    type: 'post',
                    data:  jsonData,
                    dataType: 'json',
                    success:function (res) {
                        console.log(res);
                        if(res.result=='0'){

                            layer.closeAll();

                            window.location.reload();

                        }
                    }.bind(this)
                });

            }.bind(this),
            success:function(){

                $('.layui-layer').css({

                    'width':'400px',
                    'height':'180px',
                    'top':'50%',
                    'left':'50%',
                    'marginLeft':'-200px',
                    'marginTop':'-90px'
                })
            }
        })



    }
    /*去支付*/
    toPay(id){
        $.ajax({
            url: '/pc/computer/to_pay_order',
            type: 'post',
            data:  {orderId:id},
            dataType:'json',
            success:function (res) {
                if(res.result=='0'){
                    console.log(res);

                    window.open('my-order-detail.html?orderId='+res.data.orderInfo.orderId+'&orderNo='+res.data.orderInfo.orderNo+'&orderName='+res.data.orderInfo.orderName+'&downpayAmount='+res.data.orderInfo.downpayAmount+'&creditPay='+res.data.orderInfo.creditPay+'&telephone='+res.data.orderInfo.telephone+'&starPhone='+res.data.orderInfo.starPhone+'');


                }
            }.bind(this)
        })

    }
    render() {
        console.log(this.state.pic_img);
        return (
            <div style={{float: 'left'}}>
                <div className="_layer">
                <div className="_z"></div>
                <div className="aaa">

                    <div className="header">
                        <div className="title">提示</div>
                        <div className="cance" onClick={this.cancle.bind(this)}>x</div>
                    </div>
                    <div className="content">
                        <div>

                            {
                                this.state.pic_img.map((img,i)=> {
                                    return <div className="img" key={i} id={i}>
                                        <img src={img} />
                                        <div className="delete-img" onClick={this.delete_img.bind(this,i)}>x</div>
                                    </div>
                                })
                            }

                            <div className="img">
                                <img src="../static/images/upload/upload.png" style={{position:'relative'}} />

                                <form action="#" id="uploadForm">
                                    <input type="file" id="_file" onChange={this._upload.bind(this)}/>
                                </form>

                            </div>

                        </div>

                    </div>
                    <div className="foot">
                        <div className="btn" onClick={this.confirm_upload.bind(this)}><img src="../static/images/upload/uplaod_btn.png" />
                        </div>
                    </div>
                </div>
                </div>
                <div className="wrap-content">
                    <div className="wrap-content-right">
                        <div>
                            <div className="top">
                                <ul>
                                    <li className="color_fd" onClick={this.loadComments.bind(this, '-1')}>所有订单</li>
                                    <li onClick={this.loadComments.bind(this, '1')}>待支付 <span style={{display:this.state.paid_number==0 ?'none':'inline-block'}}>({this.state.paid_number})</span></li>
                                    <li onClick={this.loadComments.bind(this, '2')}>已支付 <span style={{display:this.state.completed_number==0 ?'none':'inline-block'}}>({this.state.completed_number})</span></li>
                                    <li onClick={this.loadComments.bind(this, '3')}>已完成 <span style={{display:this.state.using_number==0 ?'none':'inline-block'}}>({this.state.using_number})</span></li>
                                    <li onClick={this.loadComments.bind(this, '4')}>已取消 <span style={{display:this.state.cancel_number==0 ?'none':'inline-block'}}>({this.state.cancel_number})</span></li>
                                    <li onClick={this.loadComments.bind(this, '5')}>退款/售后 <span style={{display:this.state.refund_number==0 ?'none':'inline-block'}}>({this.state.refund_number})</span></li>
                                </ul>
                            </div>
                            <div className="top-content">
                                <div id="tab1">
                                    <table cellSpacing="0" cellPadding="0" width="100%" style={{border: '0'}}>
                                        <thead>
                                        <tr>
                                            <th style={{width: 346}}>商品</th>
                                            <th style={{width: 108}}>首付金额(元)</th>
                                            <th style={{width: 80}}>分期数</th>
                                            <th style={{width: 128}}>信用支付(元)</th>
                                            <th style={{width: 123}}>订单状态</th>
                                            <th style={{width: 133}}>操作</th>
                                        </tr>
                                        </thead>
                                        {
                                            this.state.myOrderResponse.map((data)=> {
                                                return <tbody key={data.orderId}>
                                                <tr>
                                                    <td style={{collapse: 6}} className="_order">
                                                        <div className="order-no">订单号:{data.orderNo}</div>
                                                    </td>
                                                </tr>
                                                <tr className="bg_bd">
                                                    <td>
                                                        <div className="goods-info">
                                                            <div className="goods-info-left">
                                                                <img src={data.goodsPic} width="100%"
                                                                     height="100%"/></div>
                                                            <div className="goods-info-right">
                                                                <li>{data.goodsName}</li>
                                                                <li>杭州杭州杭州杭州</li>
                                                                <li>单价:￥{data.orderPrice}</li>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <li>{data.downpayAmount}</li>
                                                    </td>
                                                    <td>
                                                        <li>{data.staging}</li>
                                                    </td>
                                                    <td>
                                                        <li>{data.creditPay}</li>
                                                    </td>
                                                    <td>
                                                        <li>{this.getType(data.orderStatus)}</li>

                                                        <li className="color_999"
                                                            onClick={this.detail.bind(this, data.orderId)}>订单详情
                                                        </li>
                                                    </td>
                                                    <td>
                                                        {/*<li><a className="pay">上传知情同意书</a></li>*/}

                                                        <li className={data.orderStatus =='2'} >
                                                            <a href="#" className="pay" style={{display:data.projectReviewStatus==0? 'inline':'none'}} onClick={this._uploadBtn.bind(this,data.orderId)}>上传知情同意书</a>


                                                                <a href="#" className="" style={{display:data.projectReviewStatus==1? 'inline':'none'}} >知情同意书待审核</a>

                                                                <a href="#" className="" style={{display:data.projectReviewStatus==2? 'inline':'none'}} >知情同意书审核不通过</a>

                                                                <a href="#" className="" style={{display:data.projectReviewStatus==3? 'inline':'none'}} >知情同意书审核通过</a>
                                                        </li>


                                                        <li className={data.orderStatus == '3'}>
                                                            <a href={"goods-detail.html?goodsId="+data.goodsId} target="_blank">再去购买</a>
                                                        </li>
                                                        {/*<li className ={data.orderStatus == '3'}>*/}
                                                            {/*<a href="my-evaluate.html">去评价</a>*/}
                                                        {/*</li>*/}


                                                        <li className ={ data.orderStatus == '4'}>
                                                            <a href="goods-detail.html?goodsId='++'">重新购买</a>
                                                        </li>


                                                        <li className ={ data.orderStatus == '1'}>
                                                            <a href="#" className="pay" onClick={this.toPay.bind(this,data.orderId)}>去支付</a>
                                                        </li>
                                                        <li className ={ data.orderStatus == '1'}>
                                                            <a href="#" onClick={this.cancel_order.bind(this,data.orderId)}>取消订单</a>
                                                        </li>
                                                    </td>
                                                </tr>
                                                </tbody>

                                            })
                                        }
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
