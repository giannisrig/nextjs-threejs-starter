import { Plane } from "@react-three/drei";
import GroundGUI from "./GroundGUI";
import groundSettings, { GroundSettings } from "./groundSettings";

const Ground = ({ showGUI = false }) => {
  // Set up the settings for the ground plane and use GUI controls if enabled
  const settings: GroundSettings = showGUI ? GroundGUI() : groundSettings;

  return (
    <Plane
      args={[settings.geometry.x, settings.geometry.y]}
      rotation={[settings.rotation.x, settings.rotation.y, settings.rotation.z]}
      position={[settings.position.x, settings.position.y, settings.position.z]}
    >
      <meshStandardMaterial color={settings.color} />
    </Plane>
  );
};

export default Ground;
