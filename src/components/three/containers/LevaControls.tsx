import { Leva } from "leva";

const LevaControls = ({ hidden = false }) => {
  return (
    <div className="z-99 fixed right-0 top-0 max-h-[80vh] w-[300px] overflow-y-auto">
      <Leva isRoot={true} hidden={hidden} fill={true} />
    </div>
  );
};

export default LevaControls;
