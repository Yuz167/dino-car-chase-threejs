import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState } from "react";
import * as THREE from "three";

function Rain() {
  const rainCount = 2000;
  const positions = useMemo(() => {
    const arr = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 100; // x
      arr[i * 3 + 1] = Math.random() * 50; // y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 100; // z
    }
    return arr;
  }, []);

  const ref = useRef();

  useFrame(() => {
    const positionsArray = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < rainCount; i++) {
      positionsArray[i * 3 + 1] -= 0.5; // fall speed
      if (positionsArray[i * 3 + 1] < -10) {
        positionsArray[i * 3 + 1] = 50; // reset height
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#88c" size={0.1} transparent />
    </points>
  );
}

export default Rain;
