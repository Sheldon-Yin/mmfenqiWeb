'use strict';
class RMy_credit extends React.Component{

    constructor(){
        super();
        this.state={
            data:{}
        }
    }

    user_info(){

        $.ajax({
            type: 'post',
            url: '/pc/computer/user_info',
            data: '',
            dataType: 'json',
            success: (res)=> {

                console.log(res);
                this.setState({
                    data:res.data
                });
            }

        });
    }

    componentDidMount() {
       this.user_info()
    }

    render(){
        return (
            <div style={{float:'left'}}>
                <div className="wrap-content">
                    <div className="wrap-content-right">
                        <div>
                            <div className="top">
                                <ul className="_a">
                                    <li>
                                        可用额度(元)
                                    </li>
                                    <li style={{textAlign:'right'}}>
                                        总信用额度(元)
                                    </li>

                                </ul>
                                <ul className="_money">
                                    <li>￥{this.state.data.remainMoney}</li>
                                    <li>￥{this.state.data.realloanMoney}</li>
                                </ul>
                                <ul className="_pg">
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>

                            <div className="pseudo">
                                <ul>
                                    <li>
                                        <p className="left">
                                            <div>
                                                <img src="../static/images/credit/credit_p.png" alt=""/>
                                            </div>
                                        </p>
                                        <div className="right">
                                            <p><img src="../static/images/credit/credit_t.png" alt=""/></p>
                                            <p className="bg_b8 two-dimension">

                                            </p>
                                            <p className="two_btn">
                                                <img src="../static/images/credit/credit_g.png" alt=""/>
                                                <img src="../static/images/credit/app.png" alt=""/>
                                            </p>
                                        </div>
                                    </li>
                                    <li style={{marginTop:'50px',marginLeft:'40px'}}>
                                        <img src="../static/images/credit/credit_step.png" alt=""/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
