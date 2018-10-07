/// <reference types="react" />
import * as React from 'react';
import { EllipsisProps, EllipsisState } from './interface';
export default class  extends React.Component<EllipsisProps, EllipsisState> {
    static defaultProps: EllipsisProps;
    state: {
        isEllipsis: boolean;
        ellipsisText: string;
    };
    ellipsisNode: HTMLDivElement;
    targetHeight: number;
    componentDidMount(): void;
    handleBisection: (start: number, end: number) => void;
    handleEllipsisNode: (node: HTMLDivElement) => void;
    handleTextRender: () => {};
    render(): {};
}
