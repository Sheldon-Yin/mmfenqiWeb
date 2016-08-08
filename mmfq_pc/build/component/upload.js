'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_Upload = function (_React$Component) {
    _inherits(R_Upload, _React$Component);

    function R_Upload(props) {
        _classCallCheck(this, R_Upload);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(R_Upload).call(this, props));

        _this.state = {
            id: '',
            pic_img: [],
            index: 1 };
        return _this;
    }

    /*上传按钮*/


    _createClass(R_Upload, [{
        key: '_uploadBtn',
        value: function _uploadBtn(id) {

            this.setState({
                id: id
            });

            $('#_layer' + this.props.orderId).css('display', 'block');

            this.look_informed_consent(id);
        }

        /*删除知情同意书*/

    }, {
        key: 'delete_img',
        value: function delete_img(i) {

            console.log(i);
            var jsonData = {
                index: i + 1,
                orderId: this.state.id
            };
            $.ajax({
                type: 'post',
                url: '/pc/computer/del_informed_consent',
                data: jsonData,
                dataType: 'json',
                success: function (res) {

                    if (res.result == '0') {

                        console.log(this.state.pic_img);

                        // this.setState({
                        //     pic_img: this.state.pic_img.splice(i,i+1)
                        // })


                        //   $("#" + i).remove();


                        this.look_informed_consent(this.state.id);
                    }
                }.bind(this)
            });
        }

        /*确定上传*/

    }, {
        key: 'confirm_upload',
        value: function confirm_upload() {
            var _this2 = this;

            var jsonData = {
                orderId: this.state.id
            };

            $.ajax({
                type: 'post',
                url: '/pc/computer/confirm_upload',
                data: jsonData,
                dataType: 'json',
                success: function success(data) {

                    if (data.result == '0') {

                        _this2.setState({
                            pic_img: []
                        });

                        $('#_layer' + _this2.props.orderId).css('display', 'none');

                        window.location.reload();
                    }
                }
            });
        }

        /*查看知情同意书*/

    }, {
        key: 'look_informed_consent',
        value: function look_informed_consent(id) {
            var jsonData = {
                orderId: id
            };

            $.ajax({
                url: '/pc/computer/query_informed_consent',
                type: 'post',
                data: jsonData,
                dataType: 'json',
                success: function (res) {
                    if (res.result == '0') {
                        var index_l = res.data.informedConsent.length;

                        this.setState({
                            pic_img: res.data.informedConsent,
                            index: ++index_l
                        });
                    }
                }.bind(this)
            });
        }
    }, {
        key: 'cancle',
        value: function cancle() {
            $('#_layer' + this.props.orderId).css('display', 'none');
        }

        /*选择图片上传*/

    }, {
        key: '_upload',
        value: function _upload() {

            var data = new FormData();
            data.append('orderId', this.state.id);
            data.append('index', this.state.index);
            data.append('informedConsentPic', $("#_file" + this.props.orderId)[0].files[0]);

            console.log($("#_file" + this.props.orderId)[0].files[0]);
            //console.log(new FormData($('#uploadForm')[0]));
            var json = {
                informedConsentPic: $("#_file" + this.props.orderId)[0].files[0],
                orderId: this.state.id,
                index: 1

            };

            console.log(this.state);

            $.ajax({
                url: '/pc/computer/upload_informed_consent',
                type: 'post',
                data: data,
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res.result == '0') {
                        this.setState({
                            pic_img: this.state.pic_img.concat(res.data.informedConsentPicUrl)
                        });

                        this.look_informed_consent(this.state.id);
                    }
                }.bind(this)
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: '_layer', id: "_layer" + this.props.orderId },
                    React.createElement('div', { className: '_z' }),
                    React.createElement(
                        'div',
                        { className: 'aaa' },
                        React.createElement(
                            'div',
                            { className: 'header' },
                            React.createElement(
                                'div',
                                { className: 'title' },
                                '上传知情同意书'
                            ),
                            React.createElement(
                                'div',
                                { className: 'cance', onClick: this.cancle.bind(this) },
                                'x'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'content' },
                            React.createElement(
                                'div',
                                null,
                                this.state.pic_img.map(function (img, i) {
                                    return React.createElement(
                                        'div',
                                        { className: 'img', key: i, id: i },
                                        React.createElement('img', { src: img }),
                                        React.createElement(
                                            'div',
                                            { className: 'delete-img', onClick: _this3.delete_img.bind(_this3, i) },
                                            'x'
                                        )
                                    );
                                }),
                                React.createElement(
                                    'div',
                                    { className: 'img' },
                                    React.createElement('img', { src: '../static/images/upload/upload.png', style: { position: 'relative' } }),
                                    React.createElement(
                                        'form',
                                        { action: '#', id: 'uploadForm' },
                                        React.createElement('input', { type: 'file', id: "_file" + this.props.orderId, onChange: this._upload.bind(this) })
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'foot' },
                            React.createElement(
                                'div',
                                { className: 'btn', onClick: this.confirm_upload.bind(this) },
                                React.createElement('img', {
                                    src: '../static/images/upload/uplaod_btn.png' })
                            )
                        )
                    )
                ),
                React.createElement(
                    'a',
                    { href: '#', className: '_btn btn_btn', style: { display: this.props.projectReviewStatus == 0 ? 'inline' : 'none' }, onClick: this._uploadBtn.bind(this, this.props.orderId) },
                    '上传知情同意书'
                )
            );
        }
    }]);

    return R_Upload;
}(React.Component);