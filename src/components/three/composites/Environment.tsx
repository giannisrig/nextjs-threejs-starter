import Sky from "@/components/three/objects/environment/sky/Sky";
import Sea from "@/components/three/objects/environment/sea/Sea";
// import Ground from "@/components/three/objects/environment/ground/Ground";

const Environment = () => {
  return (
    <>
      <Sky />
      {/*<Ground showGUI={false} />*/}
      <Sea />
    </>
  );
};

export default Environment;
