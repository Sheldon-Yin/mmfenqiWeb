"use strict";

function onLoad() {
    "use strict";

    ReactDOM.render(React.createElement(
        "div",
        null,
        React.createElement(R_Header, null),
        React.createElement(R_Logo, null),
        React.createElement(R_Nav, null),
        React.createElement(R_Banner, null),
        React.createElement(R_IndexTitle, { firstTitle: "限时", secondTitle: "秒杀", subTitle: "Time spike" }),
        React.createElement(R_SaleGoods, null),
        React.createElement(R_Advertisement, null),
        React.createElement(R_IndexTitle, { firstTitle: "合作", secondTitle: "医院", subTitle: "Cooperative Hospital" }),
        React.createElement(R_IndexHospital, null),
        React.createElement(R_IndexTitle, { firstTitle: "人气", secondTitle: "项目", subTitle: "Popular Project", isRed: "true" }),
        React.createElement(R_PopularGoods, null),
        React.createElement(R_IndexTitle, { firstTitle: "分期", secondTitle: "流程", subTitle: "Staging Process", isRed: "true" }),
        React.createElement(R_Footer, null),
        React.createElement(R_ToolBar, null)
    ), document.getElementById("content"));
}