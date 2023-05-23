import { useCreateStore, LevaPanel } from "leva";
import { useEffect } from "react";
import { useAppDispatch } from "@/libs/store/store";
import { setLevaStore, SetLevaStoreAction } from "@/slices/levaSlice";
import { StoreType } from "leva/src/types";
import useLevaStore from "@/libs/hooks/useLevaStore";

const LevaStorePanel = () => {
  // Create a leva store
  const levaStore: StoreType = useCreateStore();
  const currentStore: StoreType = useLevaStore("camera");

  // Set up the Redux State dispatch
  const dispatch = useAppDispatch();

  // const showControls = useLevaShowControls("camera");
  // console.log(levaStore);

  useEffect(() => {
    if (currentStore) return;

    // Set up the Leva Store set action
    const levaStoreAction: SetLevaStoreAction = {
      name: "camera",
      store: levaStore,
    };

    console.log("SetLevaStoreAction", levaStoreAction);

    // Update the store
    dispatch(setLevaStore(levaStoreAction));
  }, [levaStore, dispatch, currentStore]);

  return <LevaPanel hidden={true} store={levaStore} />;
};

export default LevaStorePanel;
