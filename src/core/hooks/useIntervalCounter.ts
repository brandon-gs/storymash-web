import { useCallback, useEffect, useState } from "react";
import { getSecondsDiff } from "../utils/dates";

export type ICounterIntervalType = "increment" | "decrement";

export interface IUseIntervalCounterParams {
  id?: string;
  type: "increment" | "decrement";
  initial: number;
  resetFrom?: number;
  min?: number;
  max?: number;
  onMaxReached?: Function;
  onMinReached?: Function;
  onReset?: Function;
}

const useIntervalCounter = ({
  id,
  type,
  initial,
  resetFrom,
  min = -Infinity,
  max = Infinity,
  onMaxReached,
  onMinReached,
  onReset,
}: IUseIntervalCounterParams) => {
  const getTimeFromLocalStorage = () => {
    // Check if it has an id to save it at localStorage
    if (id === undefined) return null;

    const savedTime = localStorage.getItem(id);

    // Check if the value in localStorage exists
    if (savedTime === null) return null;
    // Get seconds diff from the saved date at localStorage and the current date
    const diff = getSecondsDiff(new Date(parseInt(savedTime)), new Date());
    console.log(diff);

    // If seconds diff is greater than max or less than min then remove it from the localStorage
    const shouldRestart = diff > max || diff < min;
    if (shouldRestart) {
      localStorage.removeItem(id);
    }
    return shouldRestart
      ? initial
      : resetFrom
      ? resetFrom - diff
      : initial - diff;
  };

  const [time, setTime] = useState<number>(() => {
    return getTimeFromLocalStorage() ?? initial;
  });

  const saveTime = useCallback(() => {
    if (id === undefined) return;
    localStorage.setItem(id, new Date().getTime().toString());
  }, [id]);

  const reset = () => {
    setTime(resetFrom ?? initial);
    onReset && onReset();
  };

  useEffect(() => {
    const incrementInterval = setInterval(() => {
      const isIncrement = type === "increment";
      const nextValue = isIncrement ? time + 1 : time - 1;
      const canIncrement = isIncrement && nextValue <= max;
      const canDecrement = !isIncrement && nextValue >= min;
      if (canIncrement || canDecrement) {
        setTime(nextValue);
        nextValue === max && onMaxReached && onMaxReached();
        nextValue === min && onMinReached && onMinReached();
        return;
      }
      clearInterval(incrementInterval);
    }, 1000);

    return () => {
      clearInterval(incrementInterval);
    };
  }, [max, min, onMaxReached, onMinReached, time, type]);

  return { time, reset, saveTime };
};

export default useIntervalCounter;
