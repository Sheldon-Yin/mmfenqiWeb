
'use strict';

class R_MyEvaluate extends React.Component {
    render() {
        return (
                <div className="wrap-content">
                    <div className="title">
                        <p><b>评价该项目</b></p>
                    </div>
                    <div className="_main">
                        <div className="evaluate-info">
                            <div className="left-info">
                                <div className="left-info-goods">


                                    <img src="../static/images/money.png" alt=""/>



                                    <div>李建极李建极李建极李建极李建极李建极李建极</div>
                                    <div style={{color:'#999'}}>杭州时光医疗美容医院</div>
                                </div>

                            </div>
                            <div className="right-info">
                                <div>
                                    <div className="info1">
                                        <ul>
                                            <li>
                                                <div>

                                                    手术效果

                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="info2">
                                        <ul>
                                            <li>
                                                <div>

                                                    服务满意度

                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="info3">
                                        <ul>
                                            <li>
                                                <div>

                                                    手术效果

                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="main-title">
                                    评价爆照
                                </div>
                                <div className="main-input">
                                <textarea name="textarea" id="textarea" cols="110" rows="8">

                                </textarea>
                                </div>

                                <div className="upload">
                                    <img src="../static/images/evaluate/conmon.jpg"/>
                                </div>
                                <div className="btn">
                                    <div className="upload_btn">上传</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}
