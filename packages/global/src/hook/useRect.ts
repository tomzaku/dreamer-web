import React from 'react'

const defaultRect: DOMRect= {
  x: 0,
  y:0,
  width: 0,
  height: 0,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  toJSON: () => {}
}
export const useRect = (): [DOMRect, React.MutableRefObject<HTMLDivElement | null>] => {
  const ref = React.useRef<HTMLDivElement| null>(null);
  const [rect, setRect] = React.useState<DOMRect>(defaultRect);

  const set = () =>
    setRect(ref?.current?.getBoundingClientRect()|| defaultRect);

  React.useEffect(() => {
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);

  return [rect, ref];
};
