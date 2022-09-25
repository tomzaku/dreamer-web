import React from 'react';

// Components
import IconArrowRight from '@moon-ui/icon/IconArrowRight';
import Typography from '@moon-ui/typography';

// Hooks
import { useRect } from '@dreamer/global';

// Utils
import cx from 'classnames';

// Constant
import {
  MARGIN_CONTAINER,
  PADDING_SLIDER,
  SLIDER_SIZE,
  TRAY_SLIDER_WITH_SPACING,
} from './constant';
import styles from './index.module.scss';

type Props = {
  text: string;
  onSuccess: () => void;
  threshold?: number;
};

function fitNumberToRange(
  value: number,
  minValue: number,
  maxValue: number
): number {
  return Math.min(Math.max(value, minValue), maxValue);
}

export default function SlideToPass({
  text,
  onSuccess,
  threshold = 0.95,
}: Props) {
  const [slideDistance, setSlideDistance] = React.useState<number>(0);
  const [isSliding, setIsSliding] = React.useState(false);
  const [activeSliding, setActiveSliding] = React.useState(false);
  const [rect, rectRef] = useRect();
  const sliderNoMarginWidth =
    rect.width - MARGIN_CONTAINER - PADDING_SLIDER * 2 - SLIDER_SIZE / 2;

  const startingPositionRef = React.useRef(0);
  const isAnimationRequested = React.useRef<boolean>(false); // To prevent requestAnimationFrame being called more than it's needed

  const calculateSlideDistanceFromEvent = (clientX: number) => {
    return fitNumberToRange(
      clientX - startingPositionRef.current,
      0,
      sliderNoMarginWidth
    );
  };

  const onTouchMove = (event: TouchEvent) => {
    event.preventDefault();
    if (!isSliding || isAnimationRequested.current) {
      return;
    }

    requestAnimationFrame(() => {
      const clientX = Math.round(
        event.touches[0]?.clientX || event.changedTouches[0].clientX // for touchend event
      );
      if (clientX > rect.width * threshold) {
        onSuccess();
      }
      setSlideDistance(calculateSlideDistanceFromEvent(clientX));
      isAnimationRequested.current = false;
    });
    isAnimationRequested.current = true;
  };
  const onTouchEnd = () => {
    if (!isSliding) {
      return;
    }

    setIsSliding(false);
    // TODO: Should refactor this line below
    setTimeout(() => setSlideDistance(0), 100);
  };
  const onMouseMove = (event: MouseEvent) => {
    event.preventDefault();
    if (!isSliding || isAnimationRequested.current) {
      return;
    }
    requestAnimationFrame(() => {
      // We need to round the event.clientX since MouseEvent.clientX will return double floating point
      // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX
      const clientX = Math.round(event.clientX);
      setSlideDistance(calculateSlideDistanceFromEvent(clientX));
      if (clientX > rect.width * threshold) {
        onSuccess();
      }
      isAnimationRequested.current = false;
    });
    isAnimationRequested.current = true;
  };
  const onMouseUp = () => {
    if (!isSliding) {
      return;
    }

    setIsSliding(false);
    // TODO: Should refactor this line below
    setTimeout(() => setSlideDistance(0), 100);
  };

  React.useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    // for mobile browsers
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      // for mobile browsers
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [isSliding]);

  return (
    <div ref={rectRef} className={styles.container}>
      <div className={styles.tray} />
      <Typography.Paragraph className={styles.text}>
        {text}
      </Typography.Paragraph>
      <div className={styles.trayActiveContainer}>
        <div
          className={cx(
            styles.trayActive,
            !isSliding && styles.slideBackAnimation,
            !activeSliding && styles.hidden
          )}
          style={{
            transform: `scaleX(${
              (slideDistance + TRAY_SLIDER_WITH_SPACING) /
              TRAY_SLIDER_WITH_SPACING
            })`,
          }}
        />
      </div>
      <div
        onMouseDown={event => {
          setIsSliding(true);
          setActiveSliding(true);
          startingPositionRef.current = event.clientX;
        }}
        onTouchStart={event => {
          setIsSliding(true);
          setActiveSliding(true);
          const clientX = event.touches[0].clientX;
          startingPositionRef.current = clientX;
        }}
        onTransitionEnd={() => {
          setActiveSliding(false);
        }}
        className={cx(styles.slider, !isSliding && styles.slideBackAnimation)}
        style={{
          transform: `translateX(${slideDistance}px)`,
        }}
      >
        <IconArrowRight />
      </div>
    </div>
  );
}
