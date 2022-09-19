import millisecondsToSeconds from 'date-fns/millisecondsToSeconds';
import millisecondsToMinutes from 'date-fns/millisecondsToMinutes';

function leftFillNum(num: number, targetLength: number) {
  return num.toString().padStart(targetLength, "0");
}

export const formatMinuteAndSecond = (milliseconds: number) => {
  return `${millisecondsToMinutes(milliseconds)}:${leftFillNum(millisecondsToSeconds(milliseconds) % 60, 2)}`;
};

