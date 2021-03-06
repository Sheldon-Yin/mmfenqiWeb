'use strict';

var HotItems = React.createClass({
    styles: {
        header: {
            height: '40px',
            borderBottom: '1px solid #f3f3f3',
            lineHeight: '40px',
            paddingLeft: '12px',
            width: '100%'
        },
        item: {
            height: '54px',
            marginTop: '18px',
            paddingLeft: '11px',
            position: 'relative'
        }
    },

    getDefaultProps: function() {
        return {
            items: []
        }
    },

    render: function() {
        var nodes = this.props.items.map(function(item) {
            return (
                <div style={this.styles.item}>
                    <img src="http://img2.imgtn.bdimg.com/it/u=3260548700,3238345600&fm=21&gp=0.jpg" height="54" width="54"></img>
                    <div style={{position:'absolute', left: '70px', right: '0px', top: '0px', fontSize: '12px', height: '54px'}}>
                        <div style={{maxHeight: '34px'}}>商品详情商品</div>
                        <div style={{position:'absolute', left: '0px', right: '0px', bottom: '0px', fontSize: '14px', height: '14px', lineHeight: '14px'}}>$1222</div>
                    </div>
                </div>
            )
        }.bind(this));


        return (
            <div style={{width: '100%'}}>
                <div style={this.styles.header}>
                    销量排行
                </div>
                {nodes}
                <div style={{height: '18px'}}></div>
            </div>
        )
    }
});


var DetailTabs = React.createClass({
    styles: {
        header: {
            height: '40px',
            borderBottom: '1px solid rgb(233,113,125)',
            lineHeight: '40px',
            width: '100%',
            backgroundColor: '#fdfdfd'
        },
        link: {
            width: '130px',
            height: '40px',
            display: 'inline-block',
            textAlign: 'center',
            color: 'black',
            textDecoration: 'none'
        }
    },
    render: function() {
        return (
            <div style={{width: '100%'}}>
                <div style={this.styles.header}>
                    <a href="#ser-detail" style={this.styles.link}>服务详情</a>
                    <span style={{color: '#e3e3e3'}}>|</span>
                    <a href="#doc-detail" style={this.styles.link}>医生简介</a>
                    <span style={{color: '#e3e3e3'}}>|</span>
                    <a href="#hos-detail" style={this.styles.link}>医院位置/介绍</a>
                </div>
                <div id="ser-detail">
                    <h4 style={{paddingLeft: '20px'}}>服务详情</h4>
                    <div style={{marginTop: '10px', marginBottom: '10px', marginLeft: '20px', marginRight: '20px', height: '1px', backgroundColor: '#f3f3f3'}}></div>
                    <div style={{height: '200px'}}></div>
                </div>
                <div id="doc-detail">
                    <h4 style={{paddingLeft: '20px'}}>医生简介</h4>
                    <div style={{marginTop: '10px', marginBottom: '10px', marginLeft: '20px', marginRight: '20px', height: '1px', backgroundColor: '#f3f3f3'}}></div>
                    <div style={{height: '200px'}}></div>
                </div>
                <div id="hos-detail">
                    <h4 style={{paddingLeft: '20px'}}>医院位置/介绍</h4>
                    <div style={{marginTop: '10px', marginBottom: '10px', marginLeft: '20px', marginRight: '20px', height: '1px', backgroundColor: '#f3f3f3'}}></div>
                    <div style={{height: '200px'}}></div>
                </div>
            </div>
        )
    }
});

var DetailPreview = React.createClass({

    getDefaultProps: function() {
        return {
            images: []
        }
    },

    getInitialState: function() {
        return {
            currentIndex: 0,
            firstIndex: 0,
            lastIndex: 0,
        }
    },

    firstIndex: -1,
    lastIndex: -1,

    onChange: function(index) {
        return function() {
            this.setState({currentIndex: index});
        }.bind(this);
    },

    onNext: function() {
        if (this.state.currentIndex + 1 < this.props.images.length) {
            this.setState({currentIndex: this.state.currentIndex + 1});
        }
    },

    onPre: function() {
        if (this.state.currentIndex - 1 >= 0) {
            this.setState({currentIndex: this.state.currentIndex - 1});
        }
    },

    render: function() {

        if (this.firstIndex == -1 && this.lastIndex == -1) {
            this.firstIndex = 0;
            this.lastIndex = 3;

            if (this.lastIndex > this.props.images.length - 1) {
                this.lastIndex = this.props.images.length - 1
            }
        }

        if (this.state.currentIndex > this.lastIndex) {
            this.firstIndex += 1;
            this.lastIndex += 1;
        }

        if (this.state.currentIndex < this.firstIndex) {
            this.firstIndex -= 1;
            this.lastIndex -= 1;
        }

        var indexes = [];
        for(var i=this.firstIndex; i<=this.lastIndex; i++) {
            indexes.push(i);
        }
        var nodes = indexes.map(function(index) {
            var style = {
                cursor: 'pointer',
                width: '25%',
                lineHeight: '68px',
                textAlign: 'center',
                height: '70px',
                float: 'left',
                border: '1px solid transparent'
            };
            if (index == this.state.currentIndex) {
                style = {
                    cursor: 'pointer',
                    width: '25%',
                    lineHeight: '68px',
                    textAlign: 'center',
                    height: '70px',
                    float: 'left',
                    border: '1px solid #f3f3f3'
                }
            }

            return (
                <div onClick={this.onChange(index)} key={this.props.images[index] + ' ' + index} style={style}>
                    <img src={this.props.images[index]} style={{maxWidth: '100%', maxHeight: '68px'}}/>
                </div>
            )
        }.bind(this));

        return (
            <div style={{float: 'left', width: '482px'}}>
                <div style={{lineHeight: '277px', width: '438px', height: '277px', margin: '0 auto', textAlign:'center', backgroundColor: '#f3f3f3'}}>
                    <img src={this.props.images[this.state.currentIndex]} style={{maxWidth:'100%', maxHeight:'100%'}}/>
                </div>
                <div style={{position:'relative', width: '438px', height: '70px', margin: '0 auto', marginTop: '25px', backgroundColor: 'white'}}>
                    <div onClick={this.onPre} style={{cursor: 'pointer', left:'0px', top: '0px', position:'absolute', height: '70px', width: '18px', lineHeight: '70px', textAlign: 'center'}}>
                        <img src="/app/images/left.png" style={{maxWidth: '100%', maxHeight: '100%'}}/>
                    </div>
                    <div style={{position: 'absolute', left: '20px', right: '20px', height: '70px', top: '0px'}}>
                        {nodes}
                    </div>
                    <div onClick={this.onNext} style={{cursor: 'pointer', right: '0px', top: '0px', position:'absolute', height: '70px', width: '18px', lineHeight: '70px', textAlign: 'center'}}>
                        <img src="/app/images/right.png" style={{maxWidth: '100%', maxHeight: '100%'}}/>
                    </div>
                </div>
                <div style={{width: '438px', height: '1px', margin: '0 auto', marginTop: '25px', backgroundColor: '#f3f3f3'}}></div>
            </div>
        )
    }
});


var Selector = React.createClass({
    getDefaultProps: function() {
        return {
            items: []
        }
    },

    getInitialState: function() {
        return {
            currentIndex: 0
        }
    },

    styles: {
        span: {
            cursor: 'pointer',
            display:'inline-block',
            backgroundColor: 'white',
            padding: '8px',
            border: '1px solid #f3f3f3',
            marginLeft:'12px',
            marginTop: '8px'
        },
        spanSelect: {
            cursor: 'pointer',
            display:'inline-block',
            backgroundColor: 'rgb(233,113,125)',
            padding: '8px',
            border: '1px solid #f3f3f3',
            marginLeft:'12px',
            marginTop: '8px',
            color: 'white'
        }
    },

    onChange: function(index) {
        return function() {
            this.setState({currentIndex: index});
        }.bind(this)
    },

    render: function () {
        var nodes = this.props.items.map(function(item, index){

            var style = this.state.currentIndex == index ? this.styles.spanSelect : this.styles.span;

            return (
                <span key={item + ' ' + index}
                      style={style} onClick={this.onChange(index)}>
                    {item}
                </span>
            )
        }.bind(this));

        return (
            <div style={{display:'inline'}}>
                {nodes}
            </div>
        )
    }
});

var NumberSelector = React.createClass({

    getInitialState: function() {
        return {
            number: 1,
            currentItem: ''
        }
    },

    styles: {
        operations: {
            display:'inline-block',
            lineHeight: '35px',
            height: '35px',
            width: '35px',
            border: '1px solid #f3f3f3',
            textAlign: 'center',
            cursor: 'pointer'
        },
        number: {
            display:'inline-block',
            lineHeight: '35px',
            height: '35px',
            minWidth: '55px',
            border: '1px solid #f3f3f3',
            textAlign: 'center'
        }
    },

    onAdd: function(value) {
        return function () {
            var nextNumber = this.state.number + value;
            if (nextNumber < 1) {
                nextNumber = 1;
            }
            this.setState({number: nextNumber});
        }.bind(this);
    },

    render: function() {
        return (
            <div style={{display:'inline', marginLeft: '12px'}}>
                <span style={this.styles.operations} onClick={this.onAdd(-1)}>-</span>
                <span style={this.styles.number}>{this.state.number}</span>
                <span style={this.styles.operations} onClick={this.onAdd(1)}>+</span>
            </div>
        );
    }
});

var ComboBox = React.createClass({

    getInitialState: function() {
        return {
            currentIndex: 0,
            show: false
        }
    },

    getDefaultProps: function() {
        return {
            items: []
        }
    },

    styles: {
        li: {
            cursor: 'pointer',
            height: '35px',
            lineHeight: '35px',
            borderBottom: '1px solid #f3f3f3',
            paddingLeft: '8px'
        },
        ulHidden: {
            listStyle: 'none',
            position:'absolute',
            border:'1px solid #f3f3f3',
            backgroundColor: 'white',
            right: '0px',
            paddingLeft: '0px',
            left: '0px',
            zIndex: '1000',
            display: 'none'
        },
        ulShow: {
            listStyle: 'none',
            position:'absolute',
            border:'1px solid #f3f3f3',
            backgroundColor: 'white',
            right: '0px',
            paddingLeft: '0px',
            left: '0px',
            zIndex: '1000'
        }
    },

    onToggle: function() {
        this.setState({show: !this.state.show});
    },

    onChange: function(index) {
        return function() {
            this.setState({currentIndex: index, show: false});
        }.bind(this);
    },

    render: function() {

        var ulStyle = this.state.show ? this.styles.ulShow : this.styles.ulHidden;

        var nodes = this.props.items.map(function(item, index) {
            return (
                <li style={this.styles.li} onClick={this.onChange(index)}>{item}</li>
            )
        }.bind(this));

        return (
            <div style={{float: 'left', height: '40px', position: 'relative'}}>
                <div onClick={this.onToggle} style={{cursor: 'pointer', border: '1px solid #f3f3f3', padding: '8px', backgroundColor: 'white'}}>
                    <span>{this.props.items[this.state.currentIndex]}</span>
                    <span>&nbsp;&nbsp;▼</span>
                </div>
                <ul style={ulStyle}>
                    {nodes}
                </ul>
            </div>
        )
    }
});

var DetailOrder = React.createClass({
    render: function() {
        var kinds = ['全切双眼皮','全切双眼皮','全切双眼皮','全切双眼皮','全切双眼皮'];
        var mounts = ['3期','6期','9期','12期','15期','18期','21期'];
        var insurance = ['免费赠送(价值7500元)', '免费赠送(价值6500元)', '免费赠送(价值5500元)'];
        var percent = ['10%', '20%', '30%', '50%', '80%', '100%'];
        return (
            <div style={{float: 'left', width: '495px'}}>
                <span style={{color: 'black', fontSize: '18px'}}>杭州时光医疗美容医院主任XXX[玻尿酸]伊碗C小分子3针+保妥适瘦脸针1针(送1针无针水光)</span>
                <div style={{height: '16px'}}></div>
                <div style={{color: '#646464'}}>
                    <span style={{paddingLeft: '12px'}}>商品价格</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span style={{color: 'rgb(233,113,125)', fontSize: '30px'}}>￥12500</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span style={{textDecoration: 'line-through'}}>￥25000</span>
                    <div style={{border:'1px dashed rgb(233,113,125)', marginLeft: '12px'}}></div>
                    <div style={{height: '8px'}}></div>
                    <div>
                        <span style={{paddingLeft: '12px'}}>选择规格</span>
                        <Selector items={kinds}/>
                    </div>
                    <div style={{height: '8px'}}></div>
                    <div>
                        <span style={{paddingLeft: '12px'}}>选择数量</span>
                        <NumberSelector/>
                    </div>
                    <div style={{height: '8px'}}></div>
                    <div>
                        <div style={{paddingLeft: '12px', float: 'left', marginRight: '12px', height: '40px', lineHeight: '40px'}}>选择保险</div>
                        <ComboBox items={insurance}/>
                        <div style={{clear:'both'}}></div>
                    </div>

                    <div style={{height: '8px'}}></div>
                    <div style={{backgroundColor: 'rgb(253, 251, 253)'}}>
                        <div style={{fontSize:'15px', padding: '12px'}}>
                            <span>分期选择</span>
                        </div>
                        <div>
                            <div style={{paddingLeft: '12px', float: 'left', marginRight: '12px', height: '40px', lineHeight: '40px'}}>首付比例</div>
                            <ComboBox items={percent}/>
                            <div style={{clear:'both'}}></div>
                        </div>
                        <div>
                            <span style={{paddingLeft: '12px'}}>选择分期数</span>
                            <Selector items={mounts}/>
                        </div>
                        <div style={{height: '8px'}}></div>
                        <div>
                            <div style={{float:'left', width: '50%'}}>
                                <span style={{paddingLeft: '12px', paddingRight: '12px'}}>首付金额</span>
                                <span style={{color: 'rgb(233,113,125)', fontSize: '18px'}}>￥25000</span>
                            </div>
                            <div style={{float:'right', width: '50%'}}>
                                <span style={{paddingLeft: '12px', paddingRight: '12px'}}>月供</span>
                                <span style={{color: 'rgb(233,113,125)', fontSize: '18px'}}>￥1200</span>
                            </div>
                            <div style={{clear:'both'}}></div>
                            <div style={{height: '12px'}}></div>
                        </div>

                    </div>

                    <div style={{height: '12px'}}></div>
                    <div>
                        <input type='button'
                               value="立即分期"
                               style={{border: '0px solid transparent',
                                       width: '166px',
                                       height: '48px',
                                       fontSize: '18px',
                                       backgroundColor: 'rgb(233,113,125)',
                                       color: 'white'}}/>
                    </div>
                </div>
            </div>
        )
    }
});

var DetailHelp = React.createClass({
    render: function() {
        return (
            <div style={{float: 'left', width: '220px'}}>
                <div style={{width: '145px', margin: '0 auto'}}>
                    <img src="/app/images/tips.png" width="100%"/>
                    <input type="button" value="立即提额" style={{backgroundColor: 'rgb(233,113,125)',
                                                                 borderWidth: '0px',
                                                                 color: 'white',
                                                                 height: '35px',
                                                                 display: 'block',
                                                                 width: '125px',
                                                                 margin: '0 auto',
                                                                 marginTop: '25px'}}/>
                    <div style={{height: '1px', backgroundColor:'#f3f3f3', width: '125px', margin: '0 auto', marginTop: '35px', marginBottom: '35px'}}></div>
                    <img src="/app/images/tips2.png" width="100%"/>
                    <div style={{height: '1px', backgroundColor:'#f3f3f3', width: '125px', margin: '0 auto', marginTop: '35px', marginBottom: '35px'}}></div>
                    <input type="button" value="联系客服" style={{backgroundColor: 'white',
                                                                 borderWidth: '0px',
                                                                 color: 'rgb(233,113,125)',
                                                                 height: '35px',
                                                                 display: 'block',
                                                                 width: '125px',
                                                                 margin: '0 auto',
                                                                 marginTop: '25px',
                                                                 border: '1px solid rgb(233,113,125)'}}/>
                    <div style={{height: '25px'}}></div>
                    <div style={{fontSize: '12px', color: '#737373', textAlign: 'center'}}>工作日:9:00-21:00</div>
                    <div style={{fontSize: '12px', color: '#737373', textAlign: 'center'}}>工作日:10:00-17:00</div>
                </div>

            </div>
        )
    }
});


var DetailPage = React.createClass({
    styles: {
        detail: {
            border: '1px solid #f3f3f3',
            paddingTop: '16px',
            paddingBottom: '16px'
        },
        container: {
            position: 'relative',
            width: '1200px',
            margin: '0 auto'
        },
        row: {
            width: '100%'
        },
        leftPanel: {
            border: '1px solid #f3f3f3',
            left: '0px',
            right: '200px',
            position: 'absolute',
            minHeight: '40px'
        },
        rightPanel: {
            border: '1px solid #f3f3f3',
            width: '185px',
            minHeight: '40px',
            position: 'absolute',
            right: '0px',
            top: '0px'
        }
    },
    render: function() {

        var hotItems = [
            {
                img: 'http://img2.imgtn.bdimg.com/it/u=3260548700,3238345600&fm=21&gp=0.jpg',
                detail: '商品详情',
                price: '$255'
            },
            {
                img: 'http://img2.imgtn.bdimg.com/it/u=3260548700,3238345600&fm=21&gp=0.jpg',
                detail: '商品详情',
                price: '$255'
            },
            {
                img: 'http://img2.imgtn.bdimg.com/it/u=3260548700,3238345600&fm=21&gp=0.jpg',
                detail: '商品详情',
                price: '$255'
            },
            {
                img: 'http://img2.imgtn.bdimg.com/it/u=3260548700,3238345600&fm=21&gp=0.jpg',
                detail: '商品详情',
                price: '$255'
            }
        ];

        var images = [
            'http://s1.mmfenqi.com/static/mmfqfile/goods/9/1456376014235.jpg',
            'http://s1.mmfenqi.com/static/mmfqfile/hospital/1464679464197.jpg',
            'http://s1.mmfenqi.com/static/mmfqfile/goods/9/1456371982273.jpg'
        ];

        return (
            <div>
                <div style={{height: '16px'}}/>
                <div style={this.styles.container}>
                    <div style={this.styles.detail}>
                        <DetailPreview images={images}/>
                        <DetailOrder/>
                        <DetailHelp/>
                        <div style={{clear: 'both'}}></div>
                    </div>
                </div>
                <div style={{height: '16px'}}/>
                <div style={this.styles.container}>
                    <div style={this.styles.leftPanel}>
                        <DetailTabs/>
                    </div>
                    <div style={this.styles.rightPanel}>
                        <HotItems items={hotItems}/>
                    </div>
                </div>
            </div>
        )
    }
});

ReactDOM.render(<DetailPage/>, document.getElementById('app'));
