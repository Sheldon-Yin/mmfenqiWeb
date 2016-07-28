'use strict';

function onLoad() {
    "use strict";

    ReactDOM.render(React.createElement(
        'div',
        null,
        React.createElement(R_Header, null),
        React.createElement(R_Logo, null),
        React.createElement(R_Nav, null),
        React.createElement(
            'div',
            { style: { borderTop: '2px solid #ff5370' } },
            React.createElement(
                'div',
                { className: 'wrap' },
                React.createElement(R_MyBar, { status: 'setting' }),
                React.createElement(R_MySetting, null),
                React.createElement('div', { style: { overflow: 'hidden' } })
            )
        ),
        React.createElement(R_Footer, null),
        React.createElement(R_ToolBar, null)
    ), document.getElementById("content"));
}