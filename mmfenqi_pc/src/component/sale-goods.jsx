/**
 * Created by sheldon on 2016/7/11.
 */
'use strict';

class R_SaleGoods extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sales: []
        }
    }

    componentWillMount() {
        this.getFlashSale();
    }

    getFlashSale() {
        $.ajax({
            type: 'post',
            url: '/pc/computer/query_index_flash_sale_goodsItem',
            dataType: 'json',
            success: (res)=> {
                console.log(res);
                if (res.result == 0) {
                    this.setState({sales: res.data.flashSaleGoodsItemList})
                }
            }
        })
    }

    render() {

        var goods = this.state.sales.map(function (item, index) {
            return (
                <li key={index}>
                    <a href={"goods-detail.html?goodsId=" + item.goodsHerf} target="_blank" className="infoImg">
                        <img src={item.goodsHerPic} alt=""/>
                    </a>
                    <a href={"goods-detail.html?goodsId=" + item.goodsHerf} target="_blank" className="infoTxt">
                        <div className="babyInfo">
                            <p className="infoTit1">{item.hotItemName}</p>
                            <p className="infoTit2">
                                <span className="pink"><i>￥</i>{item.monthlyPrice}x{item.staging}</span>
                                <del>￥{item.marketPrice}</del>
                            </p>
                        </div>

                        <div className="hosInfo">
                            <p className="infoTit1">
                                {item.hospitalName} </p>
                            <p className="infoTit2 clearfix">
                                <span className="left"></span>
                                <span className="right">立即预订</span>
                            </p>
                        </div>
                    </a>
                </li>
            )
        });

        return (
            <div className="boxItem1 wrap clearfix hoverTab">
                <ul style={{display: 'block'}} className="hoverCont">
                    {goods}
                </ul>
            </div>
        )
    }
}