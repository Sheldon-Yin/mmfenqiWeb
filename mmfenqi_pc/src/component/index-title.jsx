/**
 * Created by sheldon on 2016/7/11.
 */
'use strict';

class R_IndexTitle extends React.Component {
    render() {
        return (
            <div className="wrap partTit">
                <p>
                    <span>
                        <em className="ft31">
                            <a href="http://tao.yuemei.com/hot.html" target="_blank">
                                <i className={this.props.isRed ? 'pink' : ''}>{this.props.firstTitle}</i>{this.props.secondTitle}
                            </a>
                        </em>
                        <i className="eng">{this.props.subTitle}</i>
                    </span>
                </p>
            </div>
        )
    }
}