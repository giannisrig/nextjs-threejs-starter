import { useCreateStore, LevaPanel, Leva } from "leva";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/libs/store/store";
import { setLevaStore, SetLevaStoreAction } from "@/slices/levaSlice";
import { StoreType } from "leva/src/types";
import useLevaStore from "@/libs/hooks/useLevaStore";

const LevaStorePanel = ({ show = true }) => {
  // Create a leva store
  const panelRef = useRef(null);
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

  // useEffect(() => {
  //   console.log(panelRef.current.children[0]);
  //   panelRef.current.children[0].style.display = show ? "block" : "none";
  // }, [show, panelRef]);

  return (
    <div ref={panelRef}>
      <Leva isRoot={true} hidden={false} />
      <LevaPanel hidden={!show} store={levaStore} />
    </div>
  );
};

export default LevaStorePanel;
