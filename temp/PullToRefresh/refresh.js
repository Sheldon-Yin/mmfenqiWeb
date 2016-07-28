/**
 * Created by imchenglibin on 16/7/1.
 */
(function(window, document){
    'use strict';

    var REFRESH_STATUS = {
        init: 'init',
        animating: 'animating'
    };

    function Refresher(container, options) {
        this.defaultOptions = {
            headerHeight: options.headerHeight || -1,
            timeInterval: options.timeInterval || 250
        };
        this.container = container;
        this.status = REFRESH_STATUS.init;
        this.currentOffset = -this.defaultOptions.headerHeight;
        this.onRefresh = function(endRefresh) {
            endRefresh();
        };
        this.onPulling = function(percent) {
            console.log(percent);
        };
        this.onReady = function() {
            console.log('ready for refresh');
        };
        if (this.defaultOptions.headerHeight < 0) {
            throw 'options of headerHeight should > 0';
        }
        var $this = this;
        var nextTick = function(cb) {
            setTimeout(cb, 0);
        };
        container.addEventListener('touchstart', function(event) {
            event.preventDefault();
            nextTick(function(){
                if ($this.status == REFRESH_STATUS.animating) {
                    return;
                }
                $this.startPageY = event.touches[0].pageY;
            });
        }, false);
        container.addEventListener('touchmove', function(event) {
            event.preventDefault();
            nextTick(function(){
                if ($this.status == REFRESH_STATUS.init) {
                    $this.translate(event.touches[0].pageY - $this.startPageY);
                }
            });
        }, false);
        container.addEventListener('touchend', function(event) {
            event.preventDefault();
            nextTick(function(){
                if ($this.status == REFRESH_STATUS.animating) {
                    return;
                }
                if ($this.currentOffset >= 0) {
                    $this.beginRefresh();
                } else {
                    $this.status = REFRESH_STATUS.animating;
                    $this.animate($this.currentOffset, -$this.defaultOptions.headerHeight, function() {
                        $this.setOffsetY(-$this.defaultOptions.headerHeight);
                        $this.status = REFRESH_STATUS.init;
                    });
                }
            });
        }, false);
    }

    Refresher.prototype.animate = function(fromOffsetY, toOffsetY, complete) {
        var currentMills = 0;
        var $this = this;
        var timer = setInterval(function() {
            currentMills += 10;
            $this.setOffsetY(fromOffsetY + (toOffsetY - fromOffsetY) * Math.sin(Math.PI / 2 * currentMills / $this.defaultOptions.timeInterval));
            if (currentMills >= $this.defaultOptions.timeInterval) {
                clearInterval(timer);
                complete();
            }
        }, 10);
    };

    Refresher.prototype.translate = function(offsetY) {
        offsetY = offsetY - this.defaultOptions.headerHeight;
        if (offsetY > -this.defaultOptions.headerHeight) {
            if (offsetY < 0) {
                this.onPulling(1 - Math.abs(offsetY / this.defaultOptions.headerHeight));
                this.setOffsetY(offsetY);
            } else {
                this.onReady();
                if (offsetY < 80) {
                    this.setOffsetY(offsetY);
                } else {
                    this.setOffsetY(80 + offsetY * 1.0 / 10);
                }
            }
        }
    };

    Refresher.prototype.setOffsetY = function(offsetY) {
        this.currentOffset = offsetY;
        this.container.style.webkitTransform = "translate(0," + offsetY + 'px)';
        this.container.style.MozTransform = "translate(0," + offsetY + 'px)';
        this.container.style.msTransform = "translate(0," + offsetY + 'px)';
        this.container.style.OTransform = "translate(0," + offsetY + 'px)';
        this.container.style.transform = "translate(0," + offsetY + 'px)';
    };

    Refresher.prototype.beginRefresh = function() {
        this.status = REFRESH_STATUS.animating;
        var $this = this;
        $this.animate(this.currentOffset, 0, function() {
            $this.onRefresh(function(){
                $this.animate(0, -$this.defaultOptions.headerHeight, function(){
                    $this.setOffsetY(-$this.defaultOptions.headerHeight);
                    $this.status = REFRESH_STATUS.init;
                });
            })
        });
    };

    window.R = function(container, options) {
        var refresher = new Refresher(container, options);
        return {
            onRefresh:function(onRefresh) {
                refresher.onRefresh = onRefresh;
                return this;
            },
            onReady: function (onReady) {
                refresher.onReady = onReady;
                return this;
            },
            onPulling: function(onPulling) {
                refresher.onPulling = onPulling;
                return this;
            }
        }
    }
})(window, document);