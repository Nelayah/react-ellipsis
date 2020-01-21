"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var resize_observer_1 = require("@juggle/resize-observer");
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isEllipsis: false,
            ellipsisText: ''
        };
        _this.targetHeight = 0;
        _this.handleBisection = function (start, end) {
            var _a = _this.props, children = _a.children, suffix = _a.suffix;
            if (typeof children !== 'string' || start > end)
                return;
            var index = Math.floor((start + end) / 2);
            var str = children.substring(0, index);
            _this.ellipsisNode.innerText = str + suffix;
            var currentHeight = _this.ellipsisNodeCurrentHeight;
            if (currentHeight < _this.targetHeight)
                _this.handleBisection(index + 1, end);
            if (currentHeight > _this.targetHeight)
                _this.handleBisection(start, index - 1);
            if (currentHeight === _this.targetHeight && index < end) {
                if (index + 1 === end) {
                    var last = children.substring(0, end);
                    _this.ellipsisNode.innerText = last + suffix;
                    if (_this.ellipsisNode.offsetHeight > _this.targetHeight)
                        _this.ellipsisNode.innerText = str + suffix;
                }
                else {
                    _this.handleBisection(index, end);
                }
            }
        };
        _this.handleEllipsisNode = function (node) {
            _this.ellipsisNode = node;
        };
        _this.handleTextRender = function () {
            var _a = _this.props, children = _a.children, style = _a.style;
            if (typeof children !== 'string')
                return children;
            return (React.createElement("div", { ref: _this.handleEllipsisNode, style: style }, children));
        };
        return _this;
    }
    default_1.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props, lines = _a.lines, children = _a.children;
        if (typeof children !== 'string')
            return;
        var ro = new resize_observer_1.ResizeObserver(function (_, observer) {
            if (!_this.ellipsisNode)
                return;
            _this.resizeObserver = observer;
            var lineHeight = parseInt(getComputedStyle(_this.ellipsisNode, null).lineHeight || '10', 10);
            var currentHeight = _this.ellipsisNodeCurrentHeight;
            _this.targetHeight = lines * lineHeight;
            var isEllipsis = currentHeight > _this.targetHeight;
            if (isEllipsis)
                _this.handleBisection(0, children.length - 1);
            var nextState = {};
            if (_this.ellipsisNode.innerText !== _this.state.ellipsisText)
                nextState.ellipsisText = _this.ellipsisNode.innerText;
            if (!_this.state.isEllipsis && isEllipsis)
                nextState.isEllipsis = isEllipsis;
            _this.setState(nextState);
        });
        ro.observe(this.ellipsisNode.parentNode);
    };
    default_1.prototype.componentWillUnmount = function () {
        this.resizeObserver && this.resizeObserver.disconnect();
    };
    Object.defineProperty(default_1.prototype, "ellipsisNodeCurrentHeight", {
        get: function () {
            return this.ellipsisNode.offsetHeight || this.ellipsisNode.getBoundingClientRect().height;
        },
        enumerable: true,
        configurable: true
    });
    default_1.prototype.render = function () {
        var _a = this.state, ellipsisText = _a.ellipsisText, isEllipsis = _a.isEllipsis;
        var custom = this.props.custom;
        if (custom && ellipsisText) {
            return (React.createElement("div", { ref: this.handleEllipsisNode, style: this.props.style }, custom(ellipsisText, isEllipsis)));
        }
        return this.handleTextRender();
    };
    default_1.defaultProps = {
        lines: 1,
        suffix: '...',
        style: {
            wordBreak: 'break-all',
            whiteSpace: 'pre-wrap'
        }
    };
    return default_1;
}(React.Component));
exports.default = default_1;
