export interface EllipsisProps {
  text: string;
  render?: (ellipsisText: React.ReactNode | string, isEllipsis: boolean) => React.ReactNode;
  suffix?: string;
  lines?: number;
  style?: React.CSSProperties;
}