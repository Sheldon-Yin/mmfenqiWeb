function onLoad() {
    "use strict";
    ReactDOM.render(
        <div>
            <R_Header/>
            <R_Logo/>
            <R_Nav/>
            <R_Banner/>
            <R_IndexTitle firstTitle="限时" secondTitle="秒杀" subTitle="Time spike"/>
            <R_SaleGoods/>
            <R_Advertisement/>
            <R_IndexTitle firstTitle="合作" secondTitle="医院" subTitle="Cooperative Hospital"/>
            <R_IndexHospital/>
            <R_IndexTitle firstTitle="人气" secondTitle="项目" subTitle="Popular Project" isRed="true"/>
            <R_PopularGoods/>
            <R_IndexTitle firstTitle="分期" secondTitle="流程" subTitle="Staging Process" isRed="true"/>
            <R_Footer/>
            <R_ToolBar/>
        </div>
        , document.getElementById("content"));
}