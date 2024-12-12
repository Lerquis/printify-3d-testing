import { Center, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import CameraRig from "./CameraRig";
import Backdrop from "./Backdrop";
import Shirt from "./Shirt";
import { Leva } from "leva";

interface Props {
  children?: JSX.Element;
}

const CanvasModel: React.FC<Props> = ({ children }) => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      {/* <ambientLight intensity={0.5} /> */}
      <directionalLight
        intensity={1}
        position={[1, 0, 2]}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {/* <Environment preset="city" /> */}
      <CameraRig>
        {/* <Backdrop /> */}
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;
