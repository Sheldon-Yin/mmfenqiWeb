/* Directives */
define(function (require, exports, module) {
    'use strict';
    //console.log('directive');
    module.exports = function(app){
        app.directive('onFinishRenderFilters', function ($timeout) {
                return {
                    restrict: 'A',
                    link: function(scope, element, attr) {
                        if (scope.$last === true) {
                            $timeout(function() {
                                scope.$emit('ngRepeatFinished');
                            });
                        }
                    }
                };
            });
        app.directive('onFinishRenderFiltersCopy', function ($timeout) {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {
                    if (scope.$last === true) {
                        $timeout(function() {
                            scope.$emit('ngRepeatFinishedCopy');
                        });
                    }
                }
            };
        });


        app.directive('abcd',function () {
            return{
                restrict:'EA',
                template:`
                       <div ng-if="isopen">
                            <div class="_z" ng-click="cancel()"></div>
                            <div class="layer_content">
                                <div class="header">
                                    <div class="title">{{config.title}}</div>
                                    <div class="cancel" ng-click="cancel()" ng-if="config.no"><img src="modules/bill/img/X.png" alt=""></div>
                                </div>
                                <div class="layer_content2" style="{{config.style}}">
                                    <div class="configContent">
                                        {{config.content}}
                                    </div>
                        
                                </div>
                                <div class="t_foot">
                                    <div class="btn cancel_btn" style="{{config.styleBtn}}" ng-click="sure()">{{config.btn1}}</div>
                                    <div ng-if="config.btn2" class="btn sure_btn" ng-click="cancel()">{{config.btn2}}</div>
                                </div>
                            </div>
                        </div>
`,
                replace:false,
                scope:{
                    isopen:'=isopen',
                    config:'=config',
                    sure:'&'

                },
                link:function (scope, element, attrs, controller) {
                    scope.$watch('isOpen', function() {

                    });
                    element.bind('click',function () {

                    });

                    scope.cancel=function () {
                        scope.isopen=false;
                    }


                }
            }
        });

        app.directive('abc',function () {
            return{
                restrict:'EA',
                template:`子类：{{time}}`,
                replace:false,//标签名
                scope:{
                    time:'=time',
                    config:'=config'
                },

                //作用域
                link:function (scope, element, attrs, controller) {


                    console.log(element[0]);
                    console.log(scope.time);
                    //操作dom


                    scope.know=function () {
                        scope.time=false;
                    };


                    scope.z=function () {
                        scope.time=false;
                    };





                   // window.document.getElementById('z').onclick=function () {
                   //     scope.time=false;
                   // };
                   //
                   // window.document.getElementById('know').onclick=function () {
                   //     scope.time=false;
                   // };
                    scope.$watch('time', function() {

                    });

                }
            };
        });

        app.directive('con',function () {
            return {
                restrict:'EA',
                template:
                '' +
                'Click me {{remaining}} more times! ({{count}})' +
                '',
                replace: false,

                scope: {
                    count: '=countable', //把count的传给了父类
                    note:'@',
                    action:'&'
                },
                link: function (scope, element, attrs) {
                    scope.remaining = 10;

                    element.bind('click', function () {

                        scope.remaining--;
                        scope.count++;
                        scope.$apply();
                    });
                }
            };

        });


        app.directive('sss',function () {
            return {
                scope: {
                    name: "@"
                },
                template: '子类：<input type="button" value="" ng-model="name">'
            }
        });


        app.directive('repeater',function () {
            return{
                restrict:'A',
                compile:function (element,attrs) {
                    var temp=element.children().clone();
                    console.log(temp);

                    for(var i=0; i<attrs.repeater - 1; i++) {
                        element.append(temp.clone());
                    }
                }
            }
        })
    }
});
