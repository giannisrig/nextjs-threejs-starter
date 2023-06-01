import { Leva } from "leva";

const LevaControls = ({ hidden = false }) => {
  return (
    <div className="fixed right-0 top-[100px] z-99  w-[300px] ">
      <Leva isRoot={true} hidden={hidden} fill={true} />
    </div>
  );
};

export default LevaControls;
