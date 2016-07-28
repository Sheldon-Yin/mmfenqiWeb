'use strict';

function onLoad() {
    "use strict";

    ReactDOM.render(React.createElement(
        "div",
        null,
        React.createElement(R_Header, null),
        React.createElement(R_Logo, null),
        React.createElement(R_Nav, null),
        React.createElement(R_MyOrderDetail, null),
        React.createElement(R_Footer, null),
        React.createElement(R_ToolBar, null)
    ), document.getElementById("content"));
}