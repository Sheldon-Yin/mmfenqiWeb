/**
 * Created by sheldon on 2016/7/19.
 */
'use strict';

function onLoad() {
    "use strict";
    ReactDOM.render(
        <div>
            <R_Header/>
            <R_Logo/>
            <R_ChannelNav/>
            <div style={{height:1000}}>
                </div>
            <R_Footer/>
            <R_ToolBar/>
        </div>
        , document.getElementById("content"));
}