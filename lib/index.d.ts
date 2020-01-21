import * as React from 'react';
import { EllipsisProps, EllipsisState } from './interface';
export { EllipsisProps, EllipsisState };
export default class extends React.Component<EllipsisProps, EllipsisState> {
    static defaultProps: EllipsisProps;
    state: {
        isEllipsis: boolean;
        ellipsisText: string;
    };
    ellipsisNode: any;
    targetHeight: number;
    resizeObserver: any;
    componentDidMount(): void;
    componentWillUnmount(): void;
    get ellipsisNodeCurrentHeight(): any;
    handleBisection: (start: number, end: number) => void;
    handleEllipsisNode: (node: HTMLDivElement) => void;
    handleTextRender: () => {};
    render(): {};
}
