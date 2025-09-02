import React, { useEffect, useRef, useMemo } from "react";
import { useGLTF, useAnimations, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { store as useStore } from "./Store";
import { useFrame, useLoader } from "@react-three/fiber";
import { easing } from "maath";
import { SkeletonUtils } from "three-stdlib";


const Dino = () => {
  const { selectedDino, dinos, dinoCurrentColor } = useStore();
  const gltf = useGLTF(dinos[selectedDino].path);
  const { scene, animations, materials } = gltf;

  const clonedScene = useMemo(() => {
    return SkeletonUtils.clone(scene);
  }, [gltf, selectedDino]);

  const { actions, mixer } = useAnimations(
    animations,
    clonedScene,
    selectedDino
  );

  const textures = useLoader(
    THREE.TextureLoader,
    [
      dinos[selectedDino].map || "models/Dino/blank.png",
      dinos[selectedDino].normalMap || "models/Dino/blank.png",
      dinos[selectedDino].aoMap || "models/Dino/blank.png",
    ],
    (loader) => {}, // optional onProgress
    [selectedDino]
  );

  useEffect(() => {
    const actionName = dinos[selectedDino].actions;
    const clip = THREE.AnimationClip.findByName(animations, actionName);

    if (clip) {
      const action = mixer.clipAction(clip);
      action.reset().fadeIn(0.2).play();
    }

    return () => {
      mixer.stopAllAction();
    };
  }, [selectedDino, mixer, animations, dinos]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        if (dinos[selectedDino].requireTexture) {
          child.material.map = textures[0];
          child.material.normalMap = textures[1];
          child.material.aoMap = textures[2];
          child.material.needsUpdate = true;
        }
      }
    });
  }, [clonedScene, selectedDino, dinos, textures]);

  useFrame(() => {
    easing.dampC(
      materials[dinos[selectedDino].material]?.color,
      dinoCurrentColor,
      0.25
    );
  });

  return (
    <primitive
      key={selectedDino}
      object={clonedScene}
      scale={dinos[selectedDino].scale}
      position={dinos[selectedDino].position}
      dispose={null}
    />
  );
};

export default Dino;
