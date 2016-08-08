/**
 * Created by ChinaHp on 2016/8/3.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_Commerce_add = function (_React$Component) {
    _inherits(R_Commerce_add, _React$Component);

    function R_Commerce_add() {
        _classCallCheck(this, R_Commerce_add);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(R_Commerce_add).call(this));

        _this.state = {
            ProvinceList: [],
            provinceId: '',
            cityId: '',
            id: '',

            name: '',
            phone: '',
            hos: '',
            addr: '',

            msg: '',

            name_error: '',
            phone_error: '',
            hos_error: '',

            province_error: '',
            city_error: '',
            id_error: '',
            addr_error: '',
            msg_error: '',

            cityList: [],
            regionList: []

        };
        return _this;
    }

    _createClass(R_Commerce_add, [{
        key: 'query_Allprovince',
        value: function query_Allprovince() {
            var _this2 = this;

            HttpService.query({
                url: '/pc/computer/query_Allprovince',
                success: function success(res) {
                    _this2.setState({ ProvinceList: res.provinceVOList });
                }
            });
        }
    }, {
        key: 'changeProvince',
        value: function changeProvince(e) {
            var _this3 = this;

            this.setState({
                provinceId: e.target.value
            });
            HttpService.query({
                url: '/pc/computer/queryCity_ByProId',
                data: { proId: e.target.value },
                success: function success(res) {
                    _this3.setState({ cityList: res.cityList });
                }

            });
        }
    }, {
        key: 'changeCity',
        value: function changeCity(e) {
            var _this4 = this;

            this.setState({
                cityId: e.target.value
            });
            HttpService.query({
                url: '/pc/computer/queryRegion_ByCityId',
                data: { cityId: e.target.value },
                success: function success(res) {
                    _this4.setState({ regionList: res.regionList });
                }

            });
        }
    }, {
        key: 'changeRegion',
        value: function changeRegion(e) {
            this.setState({
                id: e.target.value
            });
        }
    }, {
        key: 'nameChange',
        value: function nameChange(e) {
            this.setState({
                name: e.target.value
            });
        }
    }, {
        key: 'phoneChange',
        value: function phoneChange(e) {
            this.setState({
                phone: e.target.value
            });
        }
    }, {
        key: 'hosChange',
        value: function hosChange(e) {
            this.setState({
                hos: e.target.value
            });
        }
    }, {
        key: 'msgChange',
        value: function msgChange(e) {
            this.setState({
                msg: e.target.value
            });
        }
    }, {
        key: 'addrChange',
        value: function addrChange(e) {
            this.setState({
                addr: e.target.value
            });
        }
    }, {
        key: 'submit_',
        value: function submit_(name, phone, hos, addr, provinceId, cityId, id, msg) {
            var patt = this.props.phone_regex;

            console.log(patt);

            if (!name) {
                this.setState({
                    name_error: '请填写联系人'
                });
            } else {
                this.setState({
                    name_error: ''
                });
            }
            if (!phone) {
                this.setState({
                    phone_error: '请填写手机号'
                });
            } else if (!patt.test(phone)) {
                this.setState({
                    phone_error: '手机号格式错误'
                });
            } else {
                this.setState({
                    phone_error: ''

                });
            }
            if (!hos) {
                this.setState({
                    hos_error: '请填写医院名称'
                });
            } else {
                this.setState({
                    hos_error: ''

                });
            }

            if (!provinceId) {
                this.setState({
                    province_error: '请选择省市'
                });
            } else {
                this.setState({
                    province_error: ''

                });
            }

            if (!cityId) this.setState({ city_error: '请选择城市' });else this.setState({ city_error: '' });

            if (!id) this.setState({ id_error: '请选择区域' });else this.setState({ id_error: '' });

            if (!addr) this.setState({ addr_error: '请填写医院具体地址' });else this.setState({ addr_error: '' });

            if (!msg) this.setState({ msg_error: '请填写医院简介' });else this.setState({ msg_error: '' });

            if (!!name && !!phone && hos && !!provinceId && !!cityId && !!id && !!addr && !!msg) {
                HttpService.save({
                    url: '/pc/computer/addTenantCollaborationApplicationRecord',
                    data: { contacts: phone, telephone: phone, hospitalName: hos, provinceId: provinceId, cityId: cityId, regionId: id, address: addr, message: msg },
                    success: function success(res) {
                        window.location.href = 'index.html';
                    }
                });
            }
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.query_Allprovince();
        }
    }, {
        key: 'render',
        value: function render() {

            var name = this.state.name;
            var phone = this.state.phone;
            var hos = this.state.hos;
            var addr = this.state.addr;

            var id = this.state.id;
            var provinceId = this.state.provinceId;
            var cityId = this.state.cityId;

            var msg = this.state.msg;

            return React.createElement(
                'div',
                { className: 'wrap-business' },
                React.createElement('div', { className: 'business-wrap-top' }),
                React.createElement(
                    'div',
                    { className: 'business-wrap-content' },
                    React.createElement(
                        'div',
                        { className: 'title' },
                        React.createElement(
                            'h3',
                            null,
                            '商家入驻'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'content' },
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                null,
                                this.state.name_error
                            ),
                            React.createElement(
                                'label',
                                { htmlFor: 'one' },
                                '联系人：'
                            ),
                            React.createElement('input', { type: 'text', id: 'one', onBlur: this.nameChange.bind(this), placeholder: '联系人姓名' })
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                null,
                                this.state.phone_error
                            ),
                            React.createElement(
                                'label',
                                { htmlFor: 'two' },
                                '手机号：'
                            ),
                            React.createElement('input', { type: 'text', id: 'two', onBlur: this.phoneChange.bind(this), placeholder: '填写您的手机号' }),
                            React.createElement(
                                'div',
                                { style: { color: '#33a5ff', display: 'inline-block', paddingLeft: 10 } },
                                '*此电话将作为美眉分期工作人员联系您的电话'
                            )
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                null,
                                this.state.hos_error
                            ),
                            React.createElement(
                                'label',
                                { htmlFor: 'three' },
                                '医院名称：'
                            ),
                            React.createElement('input', { type: 'text', id: 'three', onBlur: this.hosChange.bind(this), placeholder: '医院' })
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                null,
                                this.state.province_error
                            ),
                            React.createElement(
                                'label',
                                { htmlFor: 'four' },
                                '省份：'
                            ),
                            React.createElement(
                                'select',
                                { name: 'province', id: 'province', onChange: this.changeProvince.bind(this) },
                                React.createElement(
                                    'option',
                                    { value: '', style: { fontSize: 12 } },
                                    '请选择'
                                ),
                                this.state.ProvinceList.map(function (option, index) {
                                    return React.createElement(
                                        'option',
                                        { value: option.proid, key: index },
                                        option.proname
                                    );
                                })
                            )
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                null,
                                this.state.city_error
                            ),
                            React.createElement(
                                'label',
                                { htmlFor: 'five' },
                                '城市：'
                            ),
                            React.createElement(
                                'select',
                                { name: 'city', id: 'city', onChange: this.changeCity.bind(this) },
                                React.createElement(
                                    'option',
                                    { value: '', style: { fontSize: 12 } },
                                    '请选择'
                                ),
                                this.state.cityList.map(function (option, index) {
                                    return React.createElement(
                                        'option',
                                        { value: option.cityid, key: index },
                                        option.cityname
                                    );
                                })
                            )
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                null,
                                this.state.id_error
                            ),
                            React.createElement(
                                'label',
                                { htmlFor: 'six' },
                                '区域：'
                            ),
                            React.createElement(
                                'select',
                                { name: 'region', id: 'region', onChange: this.changeRegion.bind(this) },
                                React.createElement(
                                    'option',
                                    { value: '', style: { fontSize: 12 } },
                                    '请选择'
                                ),
                                this.state.regionList.map(function (option, index) {
                                    return React.createElement(
                                        'option',
                                        { value: option.id, key: index },
                                        option.regionName
                                    );
                                })
                            )
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                null,
                                this.state.addr_error
                            ),
                            React.createElement(
                                'label',
                                { htmlFor: 'seven' },
                                '医院具体地址：'
                            ),
                            React.createElement('input', { type: 'text', id: 'seven', style: { width: 237 }, onBlur: this.addrChange.bind(this), placeholder: '医院地址' })
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                null,
                                this.state.msg_error
                            ),
                            React.createElement(
                                'label',
                                { htmlFor: 'eight', style: { float: 'left' } },
                                '医院简介：'
                            ),
                            React.createElement('textarea', { placeholder: '字符不超过100个字', name: 'textarea', id: 'textarea', cols: '45', rows: '5', onBlur: this.msgChange.bind(this) }),
                            React.createElement(
                                'div',
                                { style: { paddingLeft: 100, color: '#33a5ff' } },
                                '*资料审核通过，美眉分期工作人员将会尽快联系您，请保持电话畅通。'
                            )
                        ),
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'div',
                                { className: 'btn submit-btn', style: { marginLeft: 100, marginTop: 20 },
                                    onClick: this.submit_.bind(this, name, phone, hos, addr, provinceId, cityId, id, msg) },
                                '提交'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return R_Commerce_add;
}(React.Component);