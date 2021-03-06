'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.setDefaultProps = setDefaultProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global window, document */


var OnVisible = function (_Component) {
    _inherits(OnVisible, _Component);

    function OnVisible() {
        _classCallCheck(this, OnVisible);

        var _this = _possibleConstructorReturn(this, (OnVisible.__proto__ || Object.getPrototypeOf(OnVisible)).apply(this, arguments));

        _this.onScroll = _this.onScroll.bind(_this);
        _this.state = {
            visible: false,
            bottom: 0,
            top: 0
        };
        return _this;
    }

    _createClass(OnVisible, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.onScroll();
            window.addEventListener('scroll', this.onScroll);
            window.addEventListener('resize', this.onScroll);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.stopListening();
        }
    }, {
        key: 'onScroll',
        value: function onScroll() {
            var _this2 = this;

            var pos = window.pageYOffset + window.innerHeight;
            var visbleTriggerRatio = this.props.percent && this.props.percent / 100 || 0.5;

            if (this.holder) {
                var box = this.holder.getBoundingClientRect();

                var pageYOffset = window.pageYOffset || document.documentElement.scrollTop;
                var docTop = document.documentElement.clientTop || 0;

                var top = box.top + box.height * visbleTriggerRatio + (pageYOffset - docTop);
                var isVisible = top < pos;
                var end = function end() {
                    _this2.props.onChange(_this2.state.visible);
                };
                if (isVisible) {
                    this.setState({
                        visible: true,
                        top: top
                    }, end);
                    if (!this.props.bounce) {
                        this.stopListening();
                    }
                } else if (this.state.visible) {
                    this.setState({
                        visible: false
                    }, end);
                }
            }
        }
    }, {
        key: 'stopListening',
        value: function stopListening() {
            window.removeEventListener('scroll', this.onScroll);
            window.removeEventListener('resize', this.onScroll);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var visible = this.state.visible;

            var classes = (0, _classnames2.default)(this.props.className, _defineProperty({}, this.props.visibleClassName || 'visible', visible));

            return _react2.default.createElement(
                'div',
                {
                    style: this.props.style,
                    className: classes,
                    ref: function ref(el) {
                        _this3.holder = el;
                    }
                },
                this.props.children
            );
        }
    }]);

    return OnVisible;
}(_react.Component);

OnVisible.defaultProps = {
    onChange: function onChange() {},
    bounce: false
};

OnVisible.propTypes = {
    className: _react.PropTypes.string,
    style: _react.PropTypes.object,
    visibleClassName: _react.PropTypes.string,
    children: _react.PropTypes.node,
    percent: _react.PropTypes.number,
    onChange: _react.PropTypes.func,
    bounce: _react.PropTypes.bool
};

exports.default = OnVisible;
function setDefaultProps(props) {
    Object.keys(props).forEach(function (k) {
        OnVisible.defaultProps[k] = props[k];
    });
}