/**
 * Created by sheldon on 2016/7/27.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var R_IndexHospital = function (_React$Component) {
    _inherits(R_IndexHospital, _React$Component);

    function R_IndexHospital(props) {
        _classCallCheck(this, R_IndexHospital);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(R_IndexHospital).call(this, props));

        _this.state = {
            hospitals: []
        };
        return _this;
    }

    _createClass(R_IndexHospital, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.getHospital();
        }
    }, {
        key: 'getHospital',
        value: function getHospital() {
            var _this2 = this;

            $.ajax({
                type: 'post',
                url: '/pc/computer/query_cooperative_hospital',
                dataType: 'json',
                success: function success(res) {
                    console.log(res);
                    if (res.result == 0) {
                        _this2.setState({ hospitals: res.data.cooperativeHospital });
                    }
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {

            //var counter = 0;
            var tempFive = [];

            //var tempHospital = this.state.hospitals.forEach(function (item) {
            //    counter++;
            //    tempFive.push(item);
            //    if (counter%5 == 0){
            //
            //    }
            //});

            for (var i = 0; i < this.state.hospitals.length; i++) {
                var index = parseInt(i / 5);

                tempFive[index] = tempFive[index] || [];
                tempFive[index].push(this.state.hospitals[i]);
            }

            console.log(tempFive);

            var hospitals = tempFive.map(function (item, index) {

                var tdNodes = item.map(function (subItem, subIndex) {
                    return React.createElement(
                        'td',
                        { style: { border: '#DFDFDF 1px solid' } },
                        React.createElement(
                            'div',
                            { key: subIndex },
                            React.createElement('img', { src: subItem.linkHerPic, style: { width: 239, height: 88 } })
                        )
                    );
                });

                return React.createElement(
                    'tr',
                    { key: index, style: { border: '#DFDFDF 1px solid' } },
                    tdNodes
                );
            });

            return React.createElement(
                'div',
                { className: 'wrap' },
                React.createElement(
                    'table',
                    { style: { borderCollapse: 'collapse', border: '#DFDFDF 1px solid' } },
                    React.createElement(
                        'tbody',
                        null,
                        hospitals
                    )
                ),
                React.createElement('div', { style: { clear: 'both' } })
            );
        }
    }]);

    return R_IndexHospital;
}(React.Component);