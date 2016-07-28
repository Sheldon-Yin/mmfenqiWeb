'use strict';

var Filter = React.createClass({displayName: "Filter",

    getInitialState: function() {
        return {
            currentIndex: 0
        }
    },

    componentDidMount: function() {
        this.props.cxt.addRemoveConditionListener(function(key, value) {
            if (key == this.props.label) {
                this.setState({currentIndex: 0});
            }
        }.bind(this));
    },

    onChange: function(index) {
        return function() {
            this.setState({currentIndex: index});
            this.props.cxt.onFilterChange(this.props.label, this.props.items[index]);
        }.bind(this);
    },

    render: function() {
        var nodes = this.props.items.map(function(item, index){
            var style = {display: 'inline-block', paddingRight: '12px', paddingBottom: '12px', cursor: 'pointer'};
            if (index == this.state.currentIndex) {
                style = {display: 'inline-block', paddingRight: '12px', paddingBottom: '12px', cursor: 'pointer', color: 'rgb(233,113,125)'};
            }
            return (
                React.createElement("span", {key: item + ' ' + index, style: style, onClick: this.onChange(index)}, item)
            )
        }.bind(this));

        return (
            React.createElement("div", null, 
                React.createElement("div", {style: {width: '5%', float: 'left'}}, 
                    React.createElement("span", {style: {paddingRight: '12px', paddingBottom: '12px', color: '#a4a4a4'}}, this.props.label)
                ), 
                React.createElement("div", {style: {width: '95%', float: 'left'}}, 
                    nodes
                ), 
                React.createElement("div", {style: {clear:'both'}})
            )
        )
    }
});

var Conditions = React.createClass({displayName: "Conditions",

    getDefaultProps: function() {
        return {
            conditions: {}
        }
    },

    onConditionsChange: function(key, value) {
        return function() {
            this.props.cxt.onConditionsChanged(key, value);
        }.bind(this);
    },

    render: function() {

        var items = [];

        for(var key in this.props.conditions) {
            if (this.props.conditions[key] != '不限') {
                items.push({key: key, value: this.props.conditions[key]});
            }
        }

        var nodes = items.map(function(item, index) {

            var style = {display: 'inline-block',
                padding: '2px',
                paddingLeft: '8px',
                paddingRight: '8px',
                border: '1px solid rgb(233,113,125)',
                color: 'rgb(233,113,125)',
                cursor: 'pointer'};
            if (index > 0) {
                style = {display: 'inline-block',
                    padding: '2px',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    border: '1px solid rgb(233,113,125)',
                    color: 'rgb(233,113,125)',
                    cursor: 'pointer',
                    marginLeft: '5px'};
            }
            return (
                React.createElement("span", {key: item + ' ' + index, style: style, onClick: this.onConditionsChange(item.key, item.value)}, item.value, "    X")
            );
        }.bind(this));

        return (
            React.createElement("div", {style: {marginTop: '10px'}}, 
                React.createElement("div", {style: {width: '5%', float: 'left'}}, 
                    React.createElement("span", {style: {display: 'inline-block', padding: '4px', paddingLeft: '0px', color: '#a4a4a4'}}, "条件")
                ), 
                React.createElement("div", {style: {width: '95%', float: 'left'}}, 
                    nodes
                ), 
                React.createElement("div", {style: {clear:'both'}})
            )
        )
    }
});

var ProjectList = React.createClass({displayName: "ProjectList",
    styles: {
        list: {
            width: '100%',
            border: '1px solid #f3f3f3',
            marginTop: '12px'
        },
        header: {
            height: '40px',
            backgroundColor: 'rgb(249, 250, 251)',
            borderBottom: '1px solid #f3f3f3'
        },
        body: {
            width: '100%',
            padding: '12px'
        },
        item: {
            height: '118px',
            position: 'relative',
            cursor: 'pointer'
        },
        itemImg: {
            width: '181px',
            textAlign: 'center',
            height: '100%',
            lineHeight: '118px',
            position: 'absolute',
            left: '0px',
            top: '0px'
        },
        itemContent: {
            left: '181px',
            top: '0px',
            right: '0px',
            bottom: '0px',
            position: 'absolute',
            paddingLeft: '12px'
        }
    },

    getInitialState: function() {
        return {
            currentIndex: 0
        }
    },

    onTabChange: function(index) {
        return function() {
            this.setState({currentIndex: index});
        }.bind(this);
    },

    render: function() {
        var items = ['综合', '销量', '价格', '最新上架'];
        var tabs = items.map(function(item, index){
            var style = {borderRight: '1px solid #e3e3e3',
                display:'inline-block',
                height: '100%',
                lineHeight: '40px',
                paddingLeft: '12px',
                cursor: 'pointer',
                paddingRight: '12px'};
            if (this.state.currentIndex == index) {
                style = {borderRight: '1px solid #e3e3e3',
                    display:'inline-block',
                    height: '100%',
                    lineHeight: '40px',
                    paddingLeft: '12px',
                    cursor: 'pointer',
                    backgroundColor: 'white',
                    paddingRight: '12px'};
            }
            return (
                React.createElement("span", {key: item + ' ' + index, style: style, onClick: this.onTabChange(index)}, item)
            )
        }.bind(this));


        var items = [];
        for (var i=0; i<this.props.items.length; i++) {
            items.push(this.props.items[i]);
            if (i != this.props.items.length - 1) {
                items.push({});
            }
        }
        var nodes = items.map(function(item, index) {
            if (index % 2 == 1) {
                return (
                    React.createElement("div", {style: {backgroundColor: '#f3f3f3', height: '1px', marginTop: '12px', marginBottom: '12px'}})
                );
            } else {
                return (
                    React.createElement("div", {style: this.styles.item}, 
                        React.createElement("div", {style: this.styles.itemImg}, 
                            React.createElement("img", {src: item.img, style: {maxWidth: '100%', maxHeight: '100%'}})
                        ), 
                        React.createElement("div", {style: this.styles.itemContent}, 
                            React.createElement("div", null, 
                                React.createElement("span", {style: {fontSize: '18px'}}, item.des)
                            ), 
                            React.createElement("div", {style: {marginTop: '12px'}}, 
                                React.createElement("span", {style: {color: '#a3a3a3'}}, item.hos)
                            ), 
                            React.createElement("div", {style: {position: 'absolute', bottom: '0px'}}, 
                                React.createElement("span", {style: {color: 'rgb(233,113,125)', fontSize: '25px'}}, item.price), 
                                React.createElement("span", {style: {color: '#a3a3a3'}}, "    医院价格: "), 
                                React.createElement("span", {style: {color: '#a3a3a3', textDecoration: 'line-through'}}, item.originalPrice)
                            )
                        )
                    )
                )
            }
        }.bind(this));

        return (
            React.createElement("div", {style: this.styles.list}, 
                React.createElement("div", {style: this.styles.header}, 
                    tabs
                ), 
                React.createElement("div", {style: this.styles.body}, 
                    nodes
                )
            )
        )
    }
});

var ProjectListPage = React.createClass({displayName: "ProjectListPage",

    styles: {
        container: {
            position: 'relative',
            width: '1200px',
            margin: '0 auto'
        },
        row: {
            width: '100%'
        },

        filter: {
            width: '100%',
            border: '1px solid #f3f3f3',
            padding: '12px',
            marginTop: '12px'
        }
    },

    getInitialState: function() {
        return {
            conditions: {}
        }
    },

    merge: function(obj1, obj2) {
        var obj3 = {};
        for (var attr in obj1) { obj3[attr] = obj1[attr]; }
        for (var attr in obj2) { obj3[attr] = obj2[attr]; }
        return obj3;
    },

    onFilterChange: function(key, value) {
        var obj = {};
        obj[key] = value;
        this.setState({conditions: this.merge(this.state.conditions, obj)});
    },

    removeConditionListers: [],

    addRemoveConditionListener: function(cb) {
        this.removeConditionListers.push(cb);
    },

    onConditionsChanged: function(key, value) {
        this.onFilterChange(key, '不限');
        this.removeConditionListers.forEach(function(item) {
            item(key, value);
        });
    },

    render: function() {
        var list = [
            {
                img: 'http://s1.mmfenqi.com/static/mmfqfile/goods/gallery/399/7.jpg',
                des: '双眼皮双眼皮双眼皮双眼皮,双眼皮双眼皮双眼皮双眼皮',
                hos: '杭州时光医疗美容医院',
                price: '1250',
                originalPrice: '12500'
            },
            {
                img: 'http://s1.mmfenqi.com/static/mmfqfile/goods/gallery/399/7.jpg',
                des: '双眼皮双眼皮双眼皮双眼皮,双眼皮双眼皮双眼皮双眼皮',
                hos: '杭州时光医疗美容医院',
                price: '1250',
                originalPrice: '12500'
            },
            {
                img: 'http://s1.mmfenqi.com/static/mmfqfile/goods/gallery/399/7.jpg',
                des: '双眼皮双眼皮双眼皮双眼皮,双眼皮双眼皮双眼皮双眼皮',
                hos: '杭州时光医疗美容医院',
                price: '1250',
                originalPrice: '12500'
            },
            {
                img: 'http://s1.mmfenqi.com/static/mmfqfile/goods/gallery/399/7.jpg',
                des: '双眼皮双眼皮双眼皮双眼皮,双眼皮双眼皮双眼皮双眼皮',
                hos: '杭州时光医疗美容医院',
                price: '1250',
                originalPrice: '12500'
            },
            {
                img: 'http://s1.mmfenqi.com/static/mmfqfile/goods/gallery/399/7.jpg',
                des: '双眼皮双眼皮双眼皮双眼皮,双眼皮双眼皮双眼皮双眼皮',
                hos: '杭州时光医疗美容医院',
                price: '1250',
                originalPrice: '12500'
            }
        ];
        return (
            React.createElement("div", {style: this.styles.container}, 
                React.createElement("div", {style: this.styles.filter}, 
                    React.createElement(Filter, {cxt: this, label: "地区", items: ['不限', '北京', '广州', '上海', '北京', '广州', '上海', '北京', '广州', '上海', '北京', '广州', '上海', '北京', '广州', '上海', '北京', '广州', '上海', '北京', '广州', '上海', '北京', '广州', '上海', '北京', '广州', '上海']}), 
                    React.createElement(Filter, {cxt: this, label: "部位", items: ['不限', '鼻部', '面部', '腹部']}), 
                    React.createElement(Filter, {cxt: this, label: "价格", items: ['不限', '100-1000元', '1000-3000元', '3000-5000元', '5000-10000元', '1-2万', '2万以上']}), 
                    React.createElement("div", {style: {height: '1px', width: '100%', backgroundColor: '#f3f3f3'}}), 
                    React.createElement(Conditions, {cxt: this, conditions: this.state.conditions})
                ), 
                React.createElement(ProjectList, {items: list}), 
                React.createElement("div", {style: {marginTop: '12px', marginBottom: '12px'}}, 
                    React.createElement(Pagination, null)
                )

            )
        )
    }
});


ReactDOM.render(React.createElement(ProjectListPage, null), document.getElementById('app'));