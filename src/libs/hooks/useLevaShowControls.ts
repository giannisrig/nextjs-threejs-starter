import { RootState, useAppSelector } from "@/libs/store/store";
import { LevaState } from "@/slices/levaSlice";
import { useMemo } from "react";

const useLevaShowControls = (name: string): boolean => {
  // Get the leva state
  const levaState: LevaState = useAppSelector((state: RootState) => state.leva);
  return levaState.panels[name].showControls as boolean;
};

export default useLevaShowControls;
