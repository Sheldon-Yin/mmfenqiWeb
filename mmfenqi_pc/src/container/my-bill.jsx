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
            <R_Nav/>
            <div style={{borderTop: '2px solid #ff5370'}}>
                <div className="wrap">
                    <R_MyBar status="bill"/>
                    <R_MyBill/>
                    <div style={{overflow:'hidden'}}></div>
                </div>
            </div>
            <R_Footer/>
            <R_ToolBar/>
        </div>
        , document.getElementById("content"));
}
