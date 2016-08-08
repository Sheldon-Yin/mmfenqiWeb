/**
 * Created by sheldon on 2016/8/1.
 */
'use strict';

function onLoad() {
    "use strict";

    ReactDOM.render(React.createElement(
        "div",
        null,
        React.createElement(R_Header, null),
        React.createElement(R_Cashier, { five: "5" }),
        React.createElement(R_OrderEnsure, null),
        React.createElement(R_Footer, null),
        React.createElement(R_ToolBar, null)
    ), document.getElementById("content"));
}