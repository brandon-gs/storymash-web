import { useSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppState } from "../store/store";

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
