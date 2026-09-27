import { AppDispatch, RootState } from "@/typescript/type/redux.type";

import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";




export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSeletor: TypedUseSelectorHook<RootState> = useSelector;
