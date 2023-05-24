import seaSettings, { SeaSettings } from "./seaSettings";
import { Vector3, Color } from "three";
import { useControls } from "leva";
import * as THREE from "three";

const SeaGUI = () => {
  // Set up the Ground Object controls GUI from leva
  const { geometry, position, sunColor, waterColor, sunDirection, fog, side, distortionScale, textureSize } = useControls(
    "Sea Settings",
    {
      geometry: { value: seaSettings.geometry.toArray(), step: 1 },
      position: { value: seaSettings.position.toArray(), step: 0.1 },
      sunDirection: { value: seaSettings.uniforms.sunDirection.toArray(), step: 0.1 },
      sunColor: { value: "#" + seaSettings.uniforms.sunColor.getHexString() },
      waterColor: { value: "#" + seaSettings.uniforms.waterColor.getHexString() },
      distortionScale: { value: seaSettings.uniforms.distortionScale, step: 0.1 },
      textureSize: { value: seaSettings.uniforms.textureSize },
      fog: { value: seaSettings.uniforms.fog },
      side: { value: seaSettings.uniforms.side, step: 1, min: 0, max: 2 },
    },
    {
      collapsed: true,
    }
  );

  // Create a GroundSettings type object
  const guiSettings: SeaSettings = {
    geometry: new Vector3(...geometry),
    position: new Vector3(...position),
    uniforms: {
      textureSize: textureSize,
      sunDirection: new THREE.Vector3(...sunDirection),
      sunColor: new Color(sunColor),
      waterColor: new Color(waterColor),
      distortionScale: distortionScale,
      fog: fog,
      side: side,
    },
  };

  return guiSettings;
};

export default SeaGUI;
