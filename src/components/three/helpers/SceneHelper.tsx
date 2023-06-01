import React from "react";
import { Perf } from "r3f-perf";
import { folder, useControls } from "leva";
import { Color } from "three";

const SceneHelper = () => {
  // https://threejs.org/docs/#api/en/helpers/AxesHelper
  // https://threejs.org/docs/?q=grid#api/en/helpers/GridHelper

  // Set up the camera target controls from Leva
  // The controls have the default values of cameraTargetSettings
  // They mutate the object on value changes
  const { showAxes, showGrid, showStats, axesSize, gridSize, tilesNumber, gridColor } = useControls(
    "Scene Helper",
    {
      "Scene Axes": folder(
        {
          showAxes: {
            value: true,
          },
          axesSize: {
            value: 1000,
            step: 10,
          },
        },
        {
          collapsed: true,
        }
      ),
      "Scene Grid": folder(
        {
          showGrid: {
            value: true,
          },
          gridSize: {
            value: 1000,
            step: 10,
          },
          tilesNumber: {
            value: 100,
            step: 1,
          },
          gridColor: {
            value: "#000000",
          },
        },
        {
          collapsed: true,
        }
      ),
      "Performance Stats": folder(
        {
          showStats: {
            value: true,
          },
        },
        {
          collapsed: true,
        }
      ),
    },
    {
      collapsed: true,
    }
  );

  return (
    <>
      <group visible={showAxes}>
        <axesHelper args={[axesSize]} />
      </group>
      <group visible={showGrid}>
        <gridHelper args={[gridSize, tilesNumber, gridColor, gridColor]} />
      </group>
      <group>
        {/*<Stats />*/}
        showStats && <Perf position="bottom-left" />
      </group>
    </>
  );
};

export default SceneHelper;
