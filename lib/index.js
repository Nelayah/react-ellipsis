"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var resize_observer_1 = require("@juggle/resize-observer");
var react_1 = require("react");
var Component = function (props) {
    var _a = react_1.useState(false), isEllipsis = _a[0], setIsEllipsis = _a[1];
    var _b = react_1.useState(''), ellipsisText = _b[0], setEllipsisText = _b[1];
    var ellipsisNodeRef = react_1.useRef(null);
    var targetHeight = react_1.useRef(0);
    var calculateCurrentHeight = react_1.useCallback(function () {
        return ellipsisNodeRef.current.offsetHeight || ellipsisNodeRef.current.getBoundingClientRect().height;
    }, []);
    var bisection = react_1.useCallback(function (start, end) {
        if (start > end)
            return;
        var index = Math.floor((start + end) / 2);
        var str = props.text.substring(0, index);
        ellipsisNodeRef.current.innerText = str + props.suffix;
        var currentHeight = calculateCurrentHeight();
        if (currentHeight < targetHeight.current)
            bisection(index + 1, end);
        if (currentHeight > targetHeight.current)
            bisection(start, index - 1);
        if (currentHeight === targetHeight.current && index < end) {
            if (index + 1 === end) {
                var last = props.text.substring(0, end);
                ellipsisNodeRef.current.innerText = last + props.suffix;
                if (ellipsisNodeRef.current.offsetHeight > targetHeight.current)
                    ellipsisNodeRef.current.innerText = str + props.suffix;
            }
            else {
                bisection(index, end);
            }
        }
    }, [props.text, props.suffix]);
    react_1.useEffect(function () {
        var resizeObserver;
        var ro = new resize_observer_1.ResizeObserver(function (_, observer) {
            if (!ellipsisNodeRef.current)
                return;
            resizeObserver = observer;
            var lineHeight = parseInt(getComputedStyle(ellipsisNodeRef.current, null).lineHeight || '10', 10);
            var currentHeight = calculateCurrentHeight();
            targetHeight.current = props.lines * lineHeight;
            var isOk = currentHeight > targetHeight.current;
            if (isOk)
                bisection(0, props.text.length - 1);
            if (ellipsisNodeRef.current.innerText !== ellipsisText)
                setEllipsisText(ellipsisNodeRef.current.innerText);
            if (!isEllipsis && isOk)
                setIsEllipsis(isOk);
        });
        ro.observe(ellipsisNodeRef.current.parentNode);
        return function () {
            resizeObserver && resizeObserver.disconnect();
        };
    }, [props.lines, props.text]);
    if (props.render && ellipsisText) {
        return (React.createElement("div", { ref: ellipsisNodeRef, style: props.style }, props.render(ellipsisText, isEllipsis)));
    }
    else {
        return (React.createElement("div", { ref: ellipsisNodeRef, style: props.style }, props.text));
    }
};
Component.displayName = 'React-Ellipsis';
Component.defaultProps = {
    lines: 1,
    suffix: '...'
};
exports.default = Component;
