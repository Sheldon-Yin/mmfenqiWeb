/**
 * Created by sheldon on 2016/7/22.
 */
'use strict';

function onLoad() {
    "use strict";
    ReactDOM.render(
        <div style={{height:'100%',flexDirection:'column',display:'flex'}}>
            <R_Header/>
            <R_Logo/>
            <R_ChannelNav/>
            <R_DetailPage/>
            <R_Footer/>
            <R_ToolBar/>
        </div>
        , document.getElementById("content"));
}