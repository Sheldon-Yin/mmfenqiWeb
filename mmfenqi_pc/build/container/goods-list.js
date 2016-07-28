/**
 * Created by sheldon on 2016/7/19.
 */
'use strict';

function onLoad() {
    "use strict";

    ReactDOM.render(React.createElement(
        'div',
        { style: { height: '100%', flexDirection: 'column', display: 'flex' } },
        React.createElement(R_Header, null),
        React.createElement(R_Logo, null),
        React.createElement(R_ChannelNav, null),
        React.createElement(R_ProjectListPage, null),
        React.createElement(R_Footer, null),
        React.createElement(R_ToolBar, null)
    ), document.getElementById("content"));
}