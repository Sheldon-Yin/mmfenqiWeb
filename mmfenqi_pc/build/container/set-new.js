/**
 * Created by sheldon on 2016/7/22.
 */
'use strict';

function onLoad() {
    "use strict";

    ReactDOM.render(React.createElement(
        'div',
        { style: { height: '100%', flexDirection: 'column', display: 'flex' } },
        React.createElement(R_LoginHeader, null),
        React.createElement(R_LoginLogo, { login: '1' }),
        React.createElement(R_Login, null)
    ), document.getElementById("content"));
}