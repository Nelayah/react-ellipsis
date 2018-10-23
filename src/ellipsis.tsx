import * as React from 'react';
import {EllipsisProps, EllipsisState} from './interface';

export default class extends React.Component<EllipsisProps, EllipsisState> {
  static defaultProps: EllipsisProps = {
    lines: 1,
    style: {wordBreak: 'break-all'},
    suffix: '...'
  };
  state = {
    isEllipsis: false,
    ellipsisText: ''
  };
  ellipsisNode: HTMLDivElement;
  targetHeight: number = 0;
  componentDidMount() {
    const {
      lines,
      children
    } = this.props;
    if (typeof children !== 'string') return;
    const lineHeight = parseInt(getComputedStyle(this.ellipsisNode, null).lineHeight || '10', 10);
    const currentHeight = this.ellipsisNodeCurrentHeight;
    this.targetHeight = lines * lineHeight;
    const isEllipsis = currentHeight > this.targetHeight;
    if (isEllipsis) this.handleBisection(0, children.length - 1);
    this.setState({
      isEllipsis,
      ellipsisText: this.ellipsisNode.innerText
    });
  }
  get ellipsisNodeCurrentHeight() {
    return this.ellipsisNode.offsetHeight || this.ellipsisNode.getBoundingClientRect().height;
  }
  handleBisection = (start: number, end: number) => {
    const {
      children,
      suffix
    } = this.props;
    if (typeof children !== 'string' || start > end) return;
    const index = Math.floor((start + end) / 2);
    const str = children.substring(0, index);
    this.ellipsisNode.innerText = str + suffix;
    const currentHeight = this.ellipsisNodeCurrentHeight;
    if (currentHeight < this.targetHeight) this.handleBisection(index + 1, end);
    if (currentHeight > this.targetHeight) this.handleBisection(start, index - 1);
    if (currentHeight === this.targetHeight && index < end) {
      if (index + 1 === end) {
        const last = children.substring(0, end);
        this.ellipsisNode.innerText = last + suffix;
        if (this.ellipsisNode.offsetHeight > this.targetHeight) this.ellipsisNode.innerText = str + suffix;
      } else {
        this.handleBisection(index, end);
      }
    }
  }
  handleEllipsisNode = (node: HTMLDivElement) => {
    this.ellipsisNode = node;
  }
  handleTextRender = () => {
    const { children, ...restProps } = this.props;
    if (typeof children !== 'string') return null;
    return (
      <div id="_react_ellipsis" ref={this.handleEllipsisNode} {...restProps}>
        {children}
      </div>
    );
  }
  public render() {
    const {
      ellipsisText,
      isEllipsis
    } = this.state;
    const {custom} = this.props;
    if (custom && ellipsisText) return custom(ellipsisText, isEllipsis);
    return this.handleTextRender();
  }
}
