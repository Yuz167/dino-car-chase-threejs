import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations, useTexture, Decal } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { store as useStore } from "./Store";
import { easing } from "maath";

const Car = () => {
  const vehicle = useRef();
  const planeRef = useRef();
  const direction = useRef(0);
  const { vehicleCurrentColor, dinoDecal } = useStore();
  const { scene, animations, materials, nodes } = useGLTF(
    "/models/Car/truck.glb"
  );
  const { actions } = useAnimations(animations, vehicle);
  // Preload at module level
  const decalTextures = {
    blank: useTexture("/decals/blank.png"),
    dino_decal_1: useTexture("/decals/dino_decal_1.png"),
    dino_decal_2: useTexture("/decals/dino_decal_2.png"),
    dino_decal_3: useTexture("/decals/dino_decal_3.png"),
  };
  const texture = dinoDecal ? decalTextures[dinoDecal] : decalTextures.blank;

  useFrame((state, delta) => {
    if (planeRef.current) {
      const t = state.clock.getElapsedTime();
      planeRef.current.position.y = Math.sin(t * 20) * 0.015 + 0.73; // amplitude = 0.015, frequency = 20, vertical center = 0.73
    }

    easing.dampC(materials["Material"]?.color, vehicleCurrentColor, 0.25);
  });

  useEffect(() => {
    actions["Scene"].play();
  }, [actions]);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <group>
      <primitive
        ref={vehicle}
        key="truck"
        object={scene}
        scale={[0.12, 0.12, 0.12]}
        position={[0, 0, 0]}
      />
      <mesh
        ref={planeRef}
        rotation={[0, Math.PI / 2, 0]}
        position={[0.765, 0.72, 0.4]}
        dispose={null}
      >
        <planeGeometry args={[1, 0.5]} /> {/* square plane */}
        {/* <meshBasicMaterial map={texture} transparent depthWrite={false} /> */}
        <meshBasicMaterial
          //map={texture}       // optional texture overlay
          transparent
          opacity={0}
          depthWrite={true} // default, plane writes to depth buffer
        />
        <Decal
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={0.5}
          map={texture}
        />
      </mesh>
    </group>
  );
};

export default Car;
