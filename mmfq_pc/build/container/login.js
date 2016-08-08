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
        React.createElement(R_Login, { phone_regex: /(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7}/, pwd_regex: /^.{6,16}$/ })
    ), document.getElementById("content"));
}