var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
export default class default_1 extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isEllipsis: false,
            ellipsisText: ''
        };
        this.targetHeight = 0;
        this.handleBisection = (start, end) => {
            const { children, suffix } = this.props;
            if (typeof children !== 'string' || start > end)
                return;
            const index = Math.floor((start + end) / 2);
            const str = children.substring(0, index);
            this.ellipsisNode.innerText = str + suffix;
            const currentHeight = this.ellipsisNodeCurrentHeight;
            if (currentHeight < this.targetHeight)
                this.handleBisection(index + 1, end);
            if (currentHeight > this.targetHeight)
                this.handleBisection(start, index - 1);
            if (currentHeight === this.targetHeight && index < end) {
                if (index + 1 === end) {
                    const last = children.substring(0, end);
                    this.ellipsisNode.innerText = last + suffix;
                    if (this.ellipsisNode.offsetHeight > this.targetHeight)
                        this.ellipsisNode.innerText = str + suffix;
                }
                else {
                    this.handleBisection(index, end);
                }
            }
        };
        this.handleEllipsisNode = (node) => {
            this.ellipsisNode = node;
        };
        this.handleTextRender = () => {
            const _a = this.props, { children } = _a, restProps = __rest(_a, ["children"]);
            if (typeof children !== 'string')
                return null;
            return (<div id="_react_ellipsis" ref={this.handleEllipsisNode} {...restProps}>
        {children}
      </div>);
        };
    }
    componentDidMount() {
        const { lines, children } = this.props;
        if (typeof children !== 'string')
            return;
        const lineHeight = parseInt(getComputedStyle(this.ellipsisNode, null).lineHeight || '10', 10);
        const currentHeight = this.ellipsisNodeCurrentHeight;
        this.targetHeight = lines * lineHeight;
        const isEllipsis = currentHeight > this.targetHeight;
        if (isEllipsis)
            this.handleBisection(0, children.length - 1);
        this.setState({
            isEllipsis,
            ellipsisText: this.ellipsisNode.innerText
        });
    }
    get ellipsisNodeCurrentHeight() {
        return this.ellipsisNode.offsetHeight || this.ellipsisNode.getBoundingClientRect().height;
    }
    render() {
        const { ellipsisText, isEllipsis } = this.state;
        const { custom } = this.props;
        if (custom && ellipsisText)
            return custom(ellipsisText, isEllipsis);
        return this.handleTextRender();
    }
}
default_1.defaultProps = {
    lines: 1,
    style: {
        wordBreak: 'break-all',
        whiteSpace: 'pre-wrap'
    },
    suffix: '...'
};
