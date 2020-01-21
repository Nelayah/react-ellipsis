import * as React from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import { EllipsisProps } from './interface';
import {
  useRef,
  useState,
  useEffect,
  useCallback
} from 'react';

export { EllipsisProps };

const Component: React.FC<EllipsisProps> = props => {
  const [isEllipsis, setIsEllipsis] = useState<boolean>(false);
  const [ellipsisText, setEllipsisText] = useState<string>('');
  const ellipsisNodeRef = useRef(null);
  const targetHeight = useRef(0);
  const calculateCurrentHeight = useCallback(() => {
    return ellipsisNodeRef.current.offsetHeight || ellipsisNodeRef.current.getBoundingClientRect().height;
  }, []);
  const bisection = useCallback((start: number, end: number) => {
    if (start > end) return;
    const index = Math.floor((start + end) / 2);
    const str = props.text.substring(0, index);
    ellipsisNodeRef.current.innerText = str + props.suffix;
    const currentHeight = calculateCurrentHeight();
    if (currentHeight < targetHeight.current) bisection(index + 1, end);
    if (currentHeight > targetHeight.current) bisection(start, index - 1);
    if (currentHeight === targetHeight.current && index < end) {
      if (index + 1 === end) {
        const last = props.text.substring(0, end);
        ellipsisNodeRef.current.innerText = last + props.suffix;
        if (ellipsisNodeRef.current.offsetHeight > targetHeight.current) ellipsisNodeRef.current.innerText = str + props.suffix;
      } else {
        bisection(index, end);
      }
    }
  }, [props.text, props.suffix]);

  useEffect(() => {
    let resizeObserver;
    const ro = new ResizeObserver((_, observer) => {
      if (!ellipsisNodeRef.current) return;
      resizeObserver = observer;
      const lineHeight = parseInt(getComputedStyle(ellipsisNodeRef.current, null).lineHeight || '10', 10);
      const currentHeight = calculateCurrentHeight();
      targetHeight.current = props.lines * lineHeight;
      const isOk = currentHeight > targetHeight.current;
      if (isOk) bisection(0, props.text.length - 1);
      if (ellipsisNodeRef.current.innerText !== ellipsisText) setEllipsisText(ellipsisNodeRef.current.innerText);
      if (!isEllipsis && isOk) setIsEllipsis(isOk);
    });
    ro.observe(ellipsisNodeRef.current.parentNode);
    return () => {
      resizeObserver && resizeObserver.disconnect();
    }
  }, [props.lines, props.text]);

  if (props.render && ellipsisText) {
    return (
      <div ref={ellipsisNodeRef} style={props.style}>
        {props.render(ellipsisText, isEllipsis)}
      </div>
    )
  } else {
    return (
      <div ref={ellipsisNodeRef} style={props.style}>{props.text}</div>
    );
  }
};

Component.displayName = 'React-Ellipsis';
Component.defaultProps = {
  lines: 1,
  suffix: '...'
}

export default Component;