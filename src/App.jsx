import { useState, Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import "./App.css";
import {
  OrbitControls,
  PerspectiveCamera,
  Preload,
  useTexture,
  useGLTF,
} from "@react-three/drei";
import Ground from "./Ground";
import Dino from "./Dino";
import Car from "./Car";
import Rain from "./Rain";
import SkyScene from "./Sky";
import Overlay from "./Overlay";
import { store as useStore } from "./Store";
import { easing } from "maath";

function DinoCarScene() {
  const { size } = useThree()
  const store = useStore();
  const orbitRef = useRef(true);

  useFrame((state, delta) => {
    if (store.intro) {
      if (!orbitRef.current) {
        state.camera.position.set(9, 9, -14);
        orbitRef.current = true;
      }
    } else if (size.width <= 600) {
      easing.damp3(
        state.camera.position,
        store.customizingDino
          ? [26, 5, -9.5]
          : store.customizingVehicle
          ? [8, 3, 0]
          : state.camera.position,
        0.25,
        delta
      );
      orbitRef.current = false;
    } else {
      easing.damp3(
        state.camera.position,
        store.customizingDino
          ? [11, 5, -9.5]
          : store.customizingVehicle
          ? [5, 3, 0]
          : state.camera.position,
        0.25,
        delta
      );
      orbitRef.current = false;
    }
    if (store.customizingDino) state.camera.lookAt(5, 4, -9.5);
  });

  return (
    <>
      <OrbitControls target={[0, 0, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[9, 9, -14]} />
      <color attach="background" args={["#0a0a12"]} />
      <directionalLight intensity={2} position={[-5, 5, 5]} castShadow />
      <directionalLight position={[5, 5, 5]} intensity={2} castShadow />

      {/*Vehicle spotlight*/}
      <spotLight
        position={[2, 2, 1]} // front of car
        angle={2} //how wide the flashlight beam is
        penumbra={1} //softness of the cone’s edges
        intensity={50}
        color={"#ffddaa"}
        castShadow
      />

      <SkyScene />
      <Rain />
      <Suspense fallback={null}>
        <Dino />
      </Suspense>
      <Car />
      <Ground />
    </>
  );
}

function App() {
  return (
    <>
      <Canvas
        dpr={[1, 1.5]}
        shadows
        gl={{ localClippingEnabled: true }}
        eventSource={document.getElementById("root")}
        eventPrefix="client"
      >
        <Suspense fallback={null}>
          <DinoCarScene />
          <Preload all />
        </Suspense>
      </Canvas>
      <Overlay />
    </>
  );
}

[
  "models/Car/truck.glb",
  "models/Dino/source/FemaleGorgo.glb",
  "models/Road/hiden_road_diorama.glb",
].forEach(useGLTF.preload);
[
  "/decals/blank.png",
  "/decals/dino_decal_1.png",
  "/decals/dino_decal_2.png",
  "/decals/dino_decal_3.png",
].forEach(useTexture.preload);

export default App;
