import { Leva } from "leva";

const LevaControls = ({ hidden = false }) => {
  return (
    <div className="relative top-[100px] z-3 ml-auto w-[300px]">
      <Leva isRoot={true} hidden={hidden} fill={true} />
    </div>
  );
};

export default LevaControls;
