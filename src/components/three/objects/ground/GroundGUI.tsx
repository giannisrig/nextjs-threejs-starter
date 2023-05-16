import groundSettings, { GroundSettings } from "./groundSettings";
import { Euler, Vector2, Vector3, Color } from "three";
import { useControls } from "leva";

const GroundGUI = () => {
  // Set up the Ground Object controls GUI from leva
  const { geometry, position, rotation, color } = useControls("Ground Settings", {
    geometry: { value: groundSettings.geometry.toArray(), step: 0.1 },
    position: { value: groundSettings.position.toArray(), step: 0.1 },
    rotation: { value: [groundSettings.rotation.x, groundSettings.rotation.y, groundSettings.rotation.z], step: 0.1 },
    color: { value: "black" },
  });

  // Create a GroundSettings type object
  const guiSettings: GroundSettings = {
    geometry: new Vector2(...geometry),
    position: new Vector3(...position),
    rotation: new Euler(...rotation),
    color: new Color(color),
  };

  return guiSettings;
};

export default GroundGUI;
