import skySettings, { SkySettings } from "./skySettings";
import { Vector3, Color } from "three";
import { useControls } from "leva";

const SkyGUI = () => {
  // Set up the Ground Object controls GUI from leva
  const { geometry, position, topColor, bottomColor, offset, exponent } = useControls(
    "Sky Settings",
    {
      geometry: { value: skySettings.geometry.toArray(), step: 1 },
      position: { value: skySettings.position.toArray(), step: 1 },
      topColor: { value: "#" + skySettings.uniforms.topColor.getHexString() },
      bottomColor: { value: "#" + skySettings.uniforms.bottomColor.getHexString() },
      offset: { value: skySettings.uniforms.offset, step: 1, min: -1000, max: 1000 },
      exponent: { value: skySettings.uniforms.exponent, step: 0.1 },
    },
    {
      collapsed: true,
    }
  );

  // Create a GroundSettings type object
  const guiSettings: SkySettings = {
    geometry: new Vector3(...geometry),
    position: new Vector3(...position),
    uniforms: {
      topColor: new Color(topColor),
      bottomColor: new Color(bottomColor),
      offset: offset,
      exponent: exponent,
    },
  };

  return guiSettings;
};

export default SkyGUI;
