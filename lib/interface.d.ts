/// <reference types="react" />
export interface EllipsisState {
    ellipsisText: string;
    isEllipsis: boolean;
}
export interface EllipsisProps extends React.HTMLProps<any> {
    style?: React.CSSProperties;
    custom?: (ellipsisText: React.ReactNode | string, isEllipsis: boolean) => React.ReactNode;
    suffix?: string;
    lines?: number;
}
