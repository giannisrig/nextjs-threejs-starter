import { ReactThreeFiber, extend } from "@react-three/fiber";
import * as React from "react";
import type { Camera, Event, Vector3 } from "three";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<OrbitControlsImpl, typeof OrbitControlsImpl> & {
        displayName?: string;
      };
    }
  }
}

export declare type OrbitControlsChangeEvent = Event & {
  target: EventTarget & {
    object: Camera;
  };
};

export declare type OrbitControlsProps = Omit<
  ReactThreeFiber.Overwrite<
    ReactThreeFiber.Object3DNode<OrbitControlsImpl, typeof OrbitControlsImpl>,
    {
      camera?: Camera;
      domElement?: HTMLElement;
      enableDamping?: boolean;
      makeDefault?: boolean;
      onChange?: (e?: OrbitControlsChangeEvent) => void;
      onEnd?: (e?: Event) => void;
      onStart?: (e?: Event) => void;
      regress?: boolean;
      target?: Vector3 | undefined; // Update the type here
      keyEvents?: boolean | HTMLElement;
    }
  >,
  "ref"
>;

extend({ OrbitControls: OrbitControlsImpl });

export const OrbitControls: React.ForwardRefExoticComponent<OrbitControlsProps & React.RefAttributes<OrbitControlsImpl>> & {
  displayName?: string;
} = React.forwardRef<OrbitControlsImpl, OrbitControlsProps>((props, ref) => {
  const controlsRef = React.useRef<OrbitControlsImpl>(null);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  React.useImperativeHandle(ref, () => controlsRef.current!, [controlsRef]);

  return <orbitControls ref={controlsRef} {...props} />;
});

OrbitControls.displayName = "OrbitControls";
