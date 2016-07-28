/**
 * Created by sheldon on 2016/7/22.
 */
'use strict';

function onLoad() {
    "use strict";
    ReactDOM.render(
        <div style={{height:'100%',position:'flex', flexDirection:'column',display:'flex'}}>
            <R_LoginHeader/>
            <R_LoginLogo login="1"/>
            <R_Register/>
        </div>
        , document.getElementById("content"));
}