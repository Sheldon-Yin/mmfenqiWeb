/**
 * Created by sheldon on 2016/7/11.
 */
'use strict';

class R_PopularGoods extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sales: []
        }
    }

    componentWillMount() {
        this.getPorpularGoods();
    }

    getPorpularGoods() {
        $.ajax({
            type: 'post',
            url: '/pc/computer/query_index_popular_goodsItem',
            dataType: 'json',
            success: (res)=> {
                console.log(res);
                if (res.result == 0) {
                    this.setState({sales: res.data.goodsItemList})
                }
            }
        })
    }

    render() {

        var goods = this.state.sales.map(function (item,index) {
            return(
                <li key={index}>
                    <a href={'goods-detail.html?goodsId=' + item.goodsHerf} target="_blank">
                        <p className="infoImg left">
                            <img alt=""
                                 src={item.goodsHerPic}/>
                        </p>
                        <div className="right">
                            <p className="infoItem2">{item.hotItemName}</p>
                            <p className="infoItem3 ">
                                <i></i> {item.hospitalName} </p>
                            <p className="price">
                        <span className="left">
                            <i className="ft18">￥</i>
                            <i className="ft24">{item.monthlyPrice}x{item.staging}</i>
                        </span>
                                <b className="info-lab return-lab">返现</b>
                            </p>
                        </div>
                    </a>
                </li>
            )
        });

        return (
            <div className="boxItem2 wrap clearfix hoverTab">
                <ul style={{display:'block'}} className="hoverCont">
                    {goods}
                </ul>
            </div>
        )
    }
}