'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropdownContent = (0, _react.createClass)({
  displayName: 'DropdownContent',

  propTypes: {
    children: _react.PropTypes.node,
    className: _react.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      className: ''
    };
  },
  render: function render() {
    var _props = this.props;
    var children = _props.children;
    var className = _props.className;

    var props = _extends({}, this.props, {
      className: 'dropdown__content ' + className
    });

    return _react2.default.createElement(
      'div',
      props,
      children
    );
  }
});

exports.default = DropdownContent;