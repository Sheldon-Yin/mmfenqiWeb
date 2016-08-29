/**
 * Created by ChinaHp on 2016/6/24.
 */
angular.module('app')
    .factory('customerListService',['$resource',
        function ($resource) {
            return{
                queryOrderInfo:function () {
                    return $resource('/system/allOrderInfo',{},{
                        query:{
                            method : 'GET',params:{

                            }
                        }
                    })
                },
                queryGoodsType:function () {
                    return $resource('/system/query_goods_type',{},{
                        query:{
                            method: 'GET'
                        }
                    })
                },
                query_order_status:function () {
                    return $resource('/system/query_order_status',{},{
                        query:{
                            method: 'GET',params:{
                                
                            }
                        }
                    })
                },
                query_hospital:function () {
                    return $resource('/system/query_hospital',{},{
                        query:{
                            method: 'GET',params:{

                            }
                        }
                    })
                },
                projectReviewStatus:function () {
                    return $resource('/system/query_projectAudit_status',{},{
                        query:{
                            method: 'GET',params:{

                            }
                        }
                    })
                },
                query_select_type:function () {
                    return $resource('/system/query_select_type',{},{
                        query:{
                            method: 'GET',params:{

                            }
                        }
                    })
                },
                queryGoodsInfo:function () {
                    return $resource('/system/queryGoodsInfo',{},{
                        query:{
                            method: 'GET',params:{

                            }
                        }
                    })
                },
                queryUserInfo:function () {
                    return $resource('/system/queryUserInfo',{},{
                        query:{
                            method: 'GET',params:{

                            }
                        }
                    })
                },
                queryInsuranceInfo:function () {
                    return $resource('/system/queryInsuranceInfo',{},{
                        query:{
                            method: 'GET',params:{

                            }
                        }
                    })
                },
                editContractNo:function () {
                    return $resource('/system/editContractNo',{},{
                        save:{
                            method: 'POST',params:{ 

                            }
                        }
                    })
                },
                addRemark:function () {
                    return $resource('/system/addRemark',{},{
                        save:{
                            method: 'POST',params:{

                            }
                        }
                    })
                },
                exportOrderInfo:function () {
                    return $resource('/system/exportOrderInfo',{},{
                        query:{
                            method: 'GET',params:{

                            }
                        }
                    })
                },
                cancelOrder:function () {
                    return $resource('/system/cancelOrder',{},{
                        query:{
                            method: 'GET',params:{

                            }
                        }
                    })
                },
                queryWaitAuditNum:function () {
                    return $resource('/system/queryWaitAuditNum',{},{
                        query:{
                            method: 'GET',params:{

                            }
                        }
                    })
                },
                projectReviewStatusAudit:function () {
                    return $resource('/system/projectReviewStatusAudit',{},{
                        save:{
                            method: 'POST',params:{

                            }
                        }
                    })
                },
                queryLogList:function () {
                    return $resource('/system/queryLogList',{},{
                        query:{
                            method: 'GET',params:{

                            }
                        }
                    })
                }





            }
    }]);