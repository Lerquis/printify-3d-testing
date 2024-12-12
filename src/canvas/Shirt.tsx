import React, { useEffect, useRef, useState } from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame, useLoader } from "@react-three/fiber";
import { Decal, Text, useGLTF, useTexture } from "@react-three/drei";
import stateApp from "../store";
import images from "../store/images";
import { useControls } from "leva";

import * as THREE from "three";

const Shirt = () => {
  const snap = useSnapshot(stateApp);
  const imageState = useSnapshot(images);
  const { nodes, materials }: any = useGLTF("/shirt_baked.glb");
  const [imagesToRender, setImagesToRender] = useState<any>([]);
  const camisaRef = useRef(null);

  useFrame((state, delta) => {
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
  });

  const stateString = JSON.stringify(snap);
  return (
    <group key={stateString}>
      <mesh
        ref={camisaRef}
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        // geometry={nodes.Scene.children[0].geometry}
        material={materials.lambert1}
        position={[0, 0, 0.5]}
        material-roughness={1}
        dispose={null}
      >
        {imageState.logoDecal.map((decals) => (
          <Decal
            // debug
            position={decals.position}
            scale={decals.scale}
            rotation={decals.rotation ? decals.rotation : [0, 0, 0]}
            map={useLoader(THREE.TextureLoader, decals.src)}
            map-anisotropy={0}
            depthTest={false}
            depthWrite={true}
          />
        ))}
        {/* {imageState.front && (
          <Decal
            // debug
            position={imageState.front.position}
            scale={[0.275, 0.35, 0.1]}
            map={useLoader(THREE.TextureLoader, imageState.front.src)}
            map-anisotropy={0}
            depthTest={false}
            depthWrite={true}
          />
        )}
        {imageState.back && (
          <Decal
            // debug
            position={imageState.back.position}
            // scale={0.275}
            scale={[0.275, 0.35, 0.1]}
            map={useLoader(THREE.TextureLoader, imageState.back.src)}
            map-anisotropy={0}
            depthTest={false}
            depthWrite={true}
          />
        )}
        {imageState.sleeve && (
          <Decal
            // debug
            position={imageState.sleeve.position}
            rotation={imageState.sleeve.rotation}
            // scale={0.275}
            scale={imageState.sleeve.scale}
            map={
              useLoader(
                THREE.TextureLoader,
                imageState.sleeve.src
              ) as THREE.Texture
            }
            map-anisotropy={0}
            depthTest={false}
            depthWrite={true}
          />
        )} */}
      </mesh>
    </group>
  );
};

export default Shirt;
