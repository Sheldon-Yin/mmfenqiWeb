/**
 * Created by sheldon on 2016/7/25.
 */
'use strict';

function onLoad() {
    "use strict";
    ReactDOM.render(
        <div style={{height:'100%',flexDirection:'column',display:'flex'}}>
            <R_LoginHeader/>
            <R_LoginLogo login="1"/>
            <R_LoginGetpwd/>
        </div>
        , document.getElementById("content"));
}