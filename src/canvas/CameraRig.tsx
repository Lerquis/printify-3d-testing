import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import * as THREE from "three";

import state from "../store";

interface Props {
  children?: JSX.Element[] | JSX.Element;
}

const CameraRig: React.FC<Props> = ({ children }) => {
  const snap = useSnapshot(state);
  const group: any = useRef();

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // set initial position of the model
    let targetPosition: any = [-0.4, 0, 2];
    if (snap.intro === "home") {
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    }
    if (snap.intro === "models") {
      // if (isBreakpoint) targetPosition = [-4, 0, 4];
      // if (isMobile) targetPosition = [-1, 0.2, 4.5];
      targetPosition = [-2, 0, 3];
    }
    if (snap.intro === "customize") {
      targetPosition = [0.075, 0, snap.lookingTo === "sleeve" ? 1.5 : 3];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
    }

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    // set model rotation
    if (group || group.current || group.current.rotation) {
      easing.dampE(
        group.current.rotation,
        [
          group.current.rotation.x + state.pointer.y / 10,
          group.current.rotation.y + state.pointer.x / 5,
          0,
        ],
        0.25,
        delta
      );
      if (snap.lookingTo === "front") {
        const euler = new THREE.Euler(0, 0, 0);
        easing.dampE(group.current.rotation, euler, 0.25, delta);
      }
      if (snap.lookingTo === "back") {
        easing.dampE(group.current.rotation, [0, Math.PI, 0], 0.25, delta);
      }
      if (snap.lookingTo === "sleeve") {
        easing.dampE(
          group.current.rotation,
          [0.25, Math.PI / 1.8, 0],
          0.25,
          delta
        );
      }
    }
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
