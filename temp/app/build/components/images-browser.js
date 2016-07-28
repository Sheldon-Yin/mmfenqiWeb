/**
 * Created by imchenglibin on 16/7/7.
 */
'use strict';

var ImagesBrowser = React.createClass({displayName: "ImagesBrowser",
    propTypes: {
        images: React.PropTypes.array.isRequired
    },

    getInitialState: function() {
        return {
            currentPage: 1
        }
    },

    onLoad: function(event) {

    },

    render: function() {
        var firstPage = this.state.currentPage - 1;
        if (firstPage < 0) {
            firstPage = 0;
        }

        var lastPage = firstPage + 3;
        if (lastPage > this.props.images.length - 1) {
            lastPage = this.props.images.length - 1;
        }

        var images = [];
        for(var i=firstPage; i<=lastPage; i++) {
            images.push(this.props.images[i]);
        }
        
        var nodes = images.map(function(item, index) {
            return (
                React.createElement("div", {className: "col-md-3", key: 'thubnail' + item + ' ' + index, style: {height: '100%'}}, 
                    React.createElement("img", {src: item, style: {maxWidth:'100%', maxHeight:'100%'}})
                )
            ) 
        });

        console.log(lastPage);

        return (
            React.createElement("div", {style: {height: '100%', width: '100%'}}, 
                React.createElement("div", {className: "container-fulid", style: {height: '100%', width: '100%'}}, 
                    React.createElement("div", {className: "row", style: {height: '85%', textAlign: 'center'}}, 
                        React.createElement("img", {src: this.props.images[this.state.currentPage], onLoad: this.onLoad, style: {maxWidth:'100%', maxHeight:'100%'}})
                    ), 
                    React.createElement("div", {className: "row", style: {height: '15%'}}, 
                        React.createElement("div", {className: "col-md-2"}, "pre"), 
                        React.createElement("div", {className: "col-md-8", style: {height: '100%'}}, 
                            React.createElement("div", {className: "container-fluid", style: {height: '100%'}}, 
                                React.createElement("div", {className: "row", style: {height: '100%'}}, 
                                    nodes
                                )
                            )
                        ), 
                        React.createElement("div", {className: "col-md-2"}, "next")
                    )
                )
            )
        );
    }

});