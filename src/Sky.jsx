import { Sky, Cloud } from "@react-three/drei";

function NightSky() {
  return (
    <>
      {/* Dark sky */}
      <Sky
        distance={450000} // size of the sky dome
        sunPosition={[10, 1, -10]} // sun direction
        inclination={0.49} // vertical position of sun (0-1)
        azimuth={0.25} // horizontal rotation
        turbidity={10} // haze in the atmosphere
        rayleigh={0.5} // atmospheric scattering
        mieCoefficient={0.005} // light scattering
        mieDirectionalG={0.8} // directionality
      />

      {/* Dark fog for hazy clouds */}
      <fog attach="fog" args={["#0b0d1a", 20, 200]} />

      {Array.from({ length: 5 }).map((_, i) => {
        return (
          <group key={i}>
            <Cloud
              opacity={0.3}
              speed={0.2}
              width={30}
              depth={3}
              segments={20}
              color="#555566"
              position={[0, 15, -20 + i * 7]}
            />
            <Cloud
              opacity={0.25}
              speed={0.15}
              width={25}
              depth={2}
              segments={20}
              color="#444455"
              position={[-10, 12, -15 + i * 6]}
            />
            <Cloud
              opacity={0.25}
              speed={0.15}
              width={25}
              depth={2}
              segments={20}
              color="#444455"
              position={[10, 12, -15 + i * 5]}
            />
          </group>
        );
      })}
    </>
  );
}

export default NightSky;
