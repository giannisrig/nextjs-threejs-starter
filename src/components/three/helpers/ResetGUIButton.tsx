import { useAppDispatch } from "@/libs/store/store";
import { setShowGUI } from "@/slices/threeSlice";

const ResetGUIButton = () => {
  // Set up the Redux State dispatch
  const dispatch = useAppDispatch();

  const handleResetControls = () => {
    dispatch(setShowGUI(false));

    setTimeout(() => {
      // Code to be executed after the timeout
      dispatch(setShowGUI(true));
    }, 1000); // Timeout set to 2000 milliseconds (2 seconds)
  };

  return (
    <button
      onClick={handleResetControls}
      className="flex items-center gap-5px rounded-full border border-silver bg-white px-10px py-7px text-black transition-colors duration-200 hover:border-black"
    >
      <span className="hidden font-secondary text-sm mdl:block">Reset Controls</span>
    </button>
  );
};

export default ResetGUIButton;
