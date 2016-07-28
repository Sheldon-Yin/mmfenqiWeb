/**
 * Created by sheldon on 2016/7/19.
 */
'use strict';

function onLoad() {
    "use strict";
    ReactDOM.render(
        <div style={{height:'100%',flexDirection:'column',display:'flex'}}>
            <R_Header/>
            <R_Logo/>
            <R_ChannelNav/>
            <R_ProjectListPage/>
            <R_Footer/>
            <R_ToolBar/>
        </div>
        , document.getElementById("content"));
}