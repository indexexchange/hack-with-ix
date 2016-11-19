'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropdownContent = exports.DropdownTrigger = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DropdownTrigger = require('./DropdownTrigger.js');

var _DropdownTrigger2 = _interopRequireDefault(_DropdownTrigger);

var _DropdownContent = require('./DropdownContent.js');

var _DropdownContent2 = _interopRequireDefault(_DropdownContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dropdown = (0, _react.createClass)({
  displayName: 'Dropdown',

  getInitialState: function getInitialState() {
    return {
      active: false
    };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      className: ''
    };
  },
  componentDidMount: function componentDidMount() {
    window.addEventListener('click', this._onWindowClick);
    window.addEventListener('touchstart', this._onWindowClick);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('click', this._onWindowClick);
    window.removeEventListener('touchstart', this._onWindowClick);
  },
  render: function render() {
    var _this = this,
        _arguments = arguments;

    var _props = this.props;
    var children = _props.children;
    var className = _props.className;
    // create component classes

    var active = this.isActive();
    var dropdown_classes = (0, _classnames2.default)({
      dropdown: true,
      'dropdown--active': active
    });
    dropdown_classes += ' ' + className;
    // stick callback on trigger element
    var bound_children = _react2.default.Children.map(children, function (child) {
      if (child.type === _DropdownTrigger2.default) {
        (function () {
          var originalOnClick = child.props.onClick;
          child = (0, _react.cloneElement)(child, {
            ref: 'trigger',
            onClick: function onClick(event) {
              _this._onToggleClick(event);
              if (originalOnClick) {
                originalOnClick.apply(child, _arguments);
              }
            }
          });
        })();
      }
      return child;
    });
    return _react2.default.createElement(
      'div',
      {
        style: this.props.style,
        className: dropdown_classes },
      bound_children
    );
  },
  isActive: function isActive() {
    return typeof this.props.active === 'boolean' ? this.props.active : this.state.active;
  },
  hide: function hide() {
    this.setState({
      active: false
    });
    if (this.props.onHide) {
      this.props.onHide();
    }
  },
  show: function show() {
    this.setState({
      active: true
    });
    if (this.props.onShow) {
      this.props.onShow();
    }
  },
  _onWindowClick: function _onWindowClick(event) {
    var dropdown_element = (0, _reactDom.findDOMNode)(this);
    if (event.target !== dropdown_element && !dropdown_element.contains(event.target) && this.isActive()) {
      this.hide();
    }
  },
  _onToggleClick: function _onToggleClick(event) {
    event.preventDefault();
    if (this.isActive()) {
      this.hide();
    } else {
      this.show();
    }
  }
});

exports.DropdownTrigger = _DropdownTrigger2.default;
exports.DropdownContent = _DropdownContent2.default;
exports.default = Dropdown;