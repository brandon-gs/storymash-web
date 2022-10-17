import debounce from "just-debounce-it";
import { useEffect } from "react";
import { useAppDispatch } from "./useRedux";

export interface IUseDebounceParams {
  callback: Function;
  debounceTime?: number;
  useDispatch?: boolean;
  condition?: boolean; // This condition should be true to allow execute the callback
}

const useDebounce = ({
  callback,
  debounceTime = 200,
  useDispatch = false,
  condition = false,
}: IUseDebounceParams) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let mounted = true;

    const functionDebounced = debounce(() => {
      if (mounted && condition) {
        if (useDispatch) {
          dispatch(callback());
        } else {
          callback();
        }
      }
    }, debounceTime);

    functionDebounced();

    return () => {
      mounted = false;
    };
  }, [dispatch, condition, callback, useDispatch, debounceTime]);
};
export default useDebounce;
