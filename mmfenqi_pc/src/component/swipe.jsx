/**
 * Created by sheldon on 2016/7/8.
 */
'use strict';

class R_Swiper extends React.Component {

    componentDidMount() {
        console.log(2);
        var mySwiper = new Swiper('.swiper-container', {
            loop: true,

            // 如果需要分页器
            pagination: '.swiper-pagination',
            height: 300,

        })
    }

    render() {
        return (
                <div className="swiper-container" style={{height: 300}}>
                    <div className="swiper-wrapper">
                        <div className="swiper-slide"><img style={{width:'100%'}}
                            src="http://static.oschina.net/uploads/img/201307/04075541_TMjm.jpg"/></div>
                        <div className="swiper-slide"><img style={{width:'100%'}}
                            src="http://image82.360doc.com/DownloadImg/2015/02/1918/50315705_14.jpg"/></div>
                        <div className="swiper-slide"><img style={{width:'100%'}}
                            src="http://i93.photobucket.com/albums/l69/jamlei/5cm/504.jpg"/>
                        </div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>

        )
    }
}