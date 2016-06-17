/**
 * Created by sheldon on 2016/6/6.
 */
define(function (require, exports, module) {
    'use strict';
    console.log('service');
    module.exports = function (app) {
        app.register.factory('Bridge',
            function () {
                return {
                    listenEvent: function (cb) {
                        if (!myBridge) return;
                        return myBridge.registerHandler('sendMessageToHTML', cb)
                    },
                    appToken: function (cb) {
                        if (!myBridge) return;
                        return myBridge.callHandler('sendMessageToApp', {type: 8, data: {}}, cb)
                    },
                    jumpTo: function (url, title, cb) {
                        if (!myBridge) return;
                        return myBridge.callHandler('sendMessageToApp', {
                            type: 2, data: {
                                'url': url,
                                'leftNavItems': [1],
                                'title': title
                            }
                        }, cb);
                    },
                    jumpRootTo: function (url, title, cb) {
                        if (!myBridge) return;
                        return myBridge.callHandler('sendMessageToApp', {
                            type: 2, data: {
                                'url': url,
                                'leftNavItems': [1],
                                'title': title,
                                'pop_to_root': 1
                            }
                        }, cb);
                    },
                    goBack: function (cb) {
                        if (!myBridge) return;
                        return myBridge.callHandler('sendMessageToApp', {type: 1, data: {}}, cb)
                    },
                    share: function (description, title, url, imageUrl, cb) {
                        if (!myBridge) return;
                        return myBridge.callHandler('sendMessageToApp', {
                            type: 0, data: {
                                'description': description,
                                'title': title,
                                'url': url,
                                'imageUrl': imageUrl
                            }
                        }, cb);
                    },
                    uploadImgFromCamera: function (cb,_size) {
                        myBridge.callHandler('sendMessageToApp', {
                            type: 12, data: {
                                type: 1,
                                size: _size? _size :120
                            }
                        }, cb)
                    },
                    uploadImgFromAlbum: function (cb,_size) {
                        myBridge.callHandler('sendMessageToApp', {
                            type: 12, data: {
                                type: 0,
                                size: _size? _size :120
                            }
                        }, cb)
                    },
                    uploadImgFromCameraOrAlbum: function(cb,_size){
                        myBridge.callHandler('sendMessageToApp', {
                            type: 14, data: {
                                size: _size ? _size :120
                            }
                        }, cb)
                    },
                    getContacts: function (cb) {
                        myBridge.callHandler('sendMessageToApp', {
                            type: 13
                        }, cb)
                    }
                }
            });
    }
});