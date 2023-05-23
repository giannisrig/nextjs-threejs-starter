import { RootState, useAppSelector } from "@/libs/store/store";
import { StoreType } from "leva/src/types";
import { LevaState } from "@/slices/levaSlice";
import { useMemo } from "react";

const useLevaStore = <StoreType>(name: string): StoreType => {
  // Get the leva state
  const levaState: LevaState = useAppSelector((state: RootState) => state.leva);
  return levaState.panels[name].store as StoreType;
};

export default useLevaStore;
