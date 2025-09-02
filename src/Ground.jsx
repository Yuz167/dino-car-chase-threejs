import React, { useRef, useMemo, useCallback } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Ground = () => {
  const road = React.useRef();
  const { scene } = useGLTF("/models/Road/hiden_road_diorama.glb");
  const segmentCount = 3;
  const segmentLength = 3;

  const clippingPlanes = useMemo(
    () => [
      new THREE.Plane(new THREE.Vector3(0, 0, 1), 20), // front
      new THREE.Plane(new THREE.Vector3(0, 0, -1), 3), // back
      new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), // vertical, clips everything below zero
    ],
    []
  );

  useFrame((state, delta) => {
    let elapsed = state.clock.getElapsedTime();
    let z = -elapsed * 6;
    road.current.position.set(
      0,
      0,
      (z % (segmentCount * segmentLength * 4)) * 0.58
    );
  });

  const cloneWithShadows = useCallback(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.receiveShadow = true;
      }
      if (child.isMesh && child.material) {
        child.material.clippingPlanes = clippingPlanes;
        child.material.clipIntersection = false;
        child.material.needsUpdate = true;
      }
    });
    return clone;
  }, [scene, clippingPlanes]);

  return (
    <group ref={road} position={[0, 0, 0]}>
      {Array.from({ length: segmentCount }).map((_, i) => {
        return (
          <primitive
            key={i}
            object={cloneWithShadows()} // clone the scene to reuse the same model
            scale={[2, 1, 3]}
            position={[0, 0, i * segmentLength * 3.5]}
          />
        );
      })}
      {Array.from({ length: segmentCount }).map((_, i) => {
        if (i === 0) {
          return null;
        }
        return (
          <primitive
            key={i}
            object={cloneWithShadows()}
            scale={[2, 1, 3]}
            position={[0, 0, -i * segmentLength * 3.5]}
          />
        );
      })}
    </group>
  );
};

export default Ground;
