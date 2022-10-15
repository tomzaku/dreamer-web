import React from 'react';
import { useSprings, animated, config } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

import styles from './DraggableList.module.scss';
import { ReactDOMAttributes } from '@use-gesture/react/dist/declarations/src/types';

const ITEM_HEIGHT = 89;
const updateStyle =
  (order: number[], active = false, originalIndex = 0, curIndex = 0, y = 0) =>
    (index: number) =>
      active && index === originalIndex
        ? {
          y: curIndex * ITEM_HEIGHT + y,
          scale: 1.1,
          zIndex: 1,
          shadow: 15,
          immediate: (key: string) => key === 'zIndex',
          config: (key: string) =>
            key === 'y' ? config.stiff : config.default,
        }
        : {
          y: order.indexOf(index) * ITEM_HEIGHT,
          scale: 1,
          zIndex: 0,
          shadow: 0,
          immediate: false,
        };

const clamp = (number: number, boundOne: number, boundTwo: number) => {
  if (!boundTwo) {
    return Math.max(number, boundOne) === boundOne ? number : boundOne;
  } else if (Math.min(number, boundOne) === number) {
    return boundOne;
  } else if (Math.max(number, boundTwo) === number) {
    return boundTwo;
  }
  return number;
};

function swap(array: number[], moveIndex: number, toIndex: number) {
  const item = array[moveIndex];
  const length = array.length;
  const diff = moveIndex - toIndex;

  if (diff > 0) {
    // move left
    return [
      ...array.slice(0, toIndex),
      item,
      ...array.slice(toIndex, moveIndex),
      ...array.slice(moveIndex + 1, length),
    ];
  } else if (diff < 0) {
    // move right
    const targetIndex = toIndex + 1;
    return [
      ...array.slice(0, moveIndex),
      ...array.slice(moveIndex + 1, targetIndex),
      item,
      ...array.slice(targetIndex, length),
    ];
  }
  return array;
}
type Props<T> = {
  items: T[];
  onChange?: (data: T[]) => void;
  renderItem: (item: T, bind: ReactDOMAttributes, index: number) => React.ReactNode;
};

function DraggableList<T>({
  items: inputItems,
  onChange,
  renderItem,
}: Props<T>) {
  const [items, setItems] = React.useState(inputItems);

  const order = React.useRef(items.map((_, index) => index)); // Store indicies as a local ref, this represents the item order
  React.useEffect(() => {
    setItems(inputItems);
    order.current = inputItems.map((_, index) => index);
  }, [inputItems]);

  const [springs, api] = useSprings(items.length, updateStyle(order.current), [
    inputItems,
    order.current,
  ]);
  const bind = useDrag(({ args: [originalIndex], active, movement: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex);
    const curRow = clamp(
      Math.round((curIndex * ITEM_HEIGHT + y) / ITEM_HEIGHT),
      0,
      items.length - 1
    );
    const newOrder = swap(order.current, curIndex, curRow);
    api.start(updateStyle(newOrder, active, originalIndex, curIndex, y));
    if (!active) {
      order.current = newOrder;
      api.stop();
      onChange && onChange(newOrder.map(index => items[index]));
    }
  }, {
    preventScroll: true,
    delay: 50
  });

  return (
    <div
      className={styles.content}
      style={{ height: items.length * ITEM_HEIGHT }}
    >
      {springs.map(({ zIndex, shadow, y, scale }, i) => (
        <animated.div
          key={`annimated-${i}`}
          /* {...bind(i)} */
          style={{
            zIndex,
            boxShadow: shadow.to(
              s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
            ),
            y,
            scale,
          }}
          children={renderItem(items[i], bind(i), i)}
        />
      ))}
    </div>
  );
}

function DraggableList1<T>(props: Props<T>) {
  return <DraggableList {...props} />;
}

export default function Combine<T>(props: Props<T>) {
  const [count, setCount] = React.useState(1);
  if (count % 2 == 0) {
    return <DraggableList {...props} onChange={(data) => {
      setCount(count + 1)
      props.onChange && props.onChange(data)

    }} />;
  } else {
    return <DraggableList1 {...props} onChange={(data) => {
      setCount(count + 1)
      props.onChange && props.onChange(data)

    }} />;
  }
}
