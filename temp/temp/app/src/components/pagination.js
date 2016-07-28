'use strict';
var Pagination = React.createClass({
    getInitialState: function() {
        return {
            currentPage: 0
        }
    },

    getDefaultProps: function() {
        return {
            maxNumberOfDisplayPages: 10,
            numberOfPages: 20,
            onPage: function(page) {
                console.log(page);
            }
        }
    },

    firstPage: -1,
    lastPage: -1,

    onPage: function(page) {
        return function() {
            if (page >= 0 && page < this.props.numberOfPages) {
                this.props.onPage(page);
                this.setState({currentPage: page});
            }
        }.bind(this);
    },

    goto: function() {
        var page = parseInt(this.refs.pageInput.value);
        this.onPage(page)();
    },

    render: function() {
        if (this.firstPage == -1
            || this.lastPage == -1
            || Math.abs(this.state.currentPage - this.firstPage) < 1
            || Math.abs(this.state.currentPage - this.lastPage) < 1
            || this.state.currentPage < this.firstPage
            || this.state.currentPage > this.lastPage) {
            this.firstPage = this.state.currentPage - parseInt(this.props.maxNumberOfDisplayPages / 2);
            if (this.firstPage < 0) {
                this.firstPage = 0;
            }

            this.lastPage = this.firstPage + this.props.maxNumberOfDisplayPages;
            if (this.lastPage > this.props.numberOfPages - 1) {
                this.lastPage = this.props.numberOfPages - 1;
            }

            if (this.lastPage - this.firstPage + 1 < this.props.maxNumberOfDisplayPages) {
                this.firstPage = this.lastPage - this.props.maxNumberOfDisplayPages + 1;
                if (this.firstPage < 0) {
                    this.firstPage = 0;
                }
            }
        }
        var pages = [];
        pages.push({text:"首页", page: 0});
        pages.push({text:'上一页', page: this.state.currentPage - 1});
        for(var page=this.firstPage; page<=this.lastPage; page++) {
            var text = page;
            if (page == this.firstPage && this.firstPage > 0) {
                text = '...';
            }

            if (page == this.lastPage && this.lastPage < this.props.numberOfPages - 1) {
                text = '...';
            }

            pages.push({text:text, page:page});
        }
        pages.push({text:'下一页', page: this.state.currentPage + 1});
        pages.push({text:'最后一页', page: this.props.numberOfPages - 1});

        var nodes = pages.map(function(item, index) {
            var style = {
                marginRight: '4px',
                textAlign: 'center',
                minWidth: '30px',
                cursor: 'pointer',
                display:'inline-block',
                border: '1px solid #f3f3f3',
                backgroundColor: 'rgb(248,249,250)',
                padding: '4px'};
            if (item.page == this.state.currentPage && parseInt(item.text) == item.page) {
                style = {
                    backgroundColor: 'rgb(233,113,125)',
                    marginRight: '4px',
                    textAlign: 'center',
                    minWidth: '30px',
                    cursor: 'pointer',
                    display:'inline-block',
                    color: 'white',
                    border: '1px solid #f3f3f3',
                    padding: '4px'};
            }
            return (
                <span onClick={this.onPage(item.page)} key={item + ' ' + index} style={style}>{item.text}</span>
            )
        }.bind(this));
        return (
            <div>
                {nodes}
                <span>&nbsp;&nbsp;共{this.props.numberOfPages}页</span>
                <span>&nbsp;&nbsp;转到&nbsp;&nbsp;</span>
                <input ref="pageInput"
                       type="text"
                       style={{cursor: 'pointer',
                               textAlign: 'center',
                               backgroundColor: 'rgb(248,249,250)',
                               border: '1px solid #f3f3f3',
                               width: '45px',
                               padding: '4px'}}/>
                <span>&nbsp;&nbsp;页&nbsp;&nbsp;</span>
                <input type="button"
                       onClick={this.goto}
                       value="确定"
                       style={{backgroundColor:'rgb(233,113,125)', color: 'white', border: '0px solid transparent'}}/>
            </div>

        )
    }
});