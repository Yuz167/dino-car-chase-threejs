import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { store as useStore } from "./Store";
import { useEffect } from "react";
import { useTexture } from "@react-three/drei";

const Overlay = () => {
  const state = useStore();
  const transition = { type: "spring", duration: 0.8 };
  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
  };
  const lookAtDino = () => {
    state.setIntro(false);
    state.setCustomizingDino(true);
    state.setCustomizingVehicle(false);
  };

  return (
    <div className="overlay">
      <motion.header
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
      >
        {/* <motion.div animate={{ x: snap.intro ? 0 : 100, opacity: snap.intro ? 1 : 0 }} transition={transition}>

                </motion.div> */}
      </motion.header>
      <AnimatePresence>
        {state.intro ? (
          <motion.section key="main" {...config}>
            <div className="section--container">
              <motion.div
                key="title"
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  damping: 5,
                  stiffness: 40,
                  restDelta: 0.001,
                  duration: 0.3,
                }}
              >
                <h1>LET'S DO IT.</h1>
              </motion.div>
              <div className="support--content">
                <motion.div
                  key="p"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    damping: 7,
                    stiffness: 30,
                    restDelta: 0.001,
                    duration: 0.6,
                    delay: 0.2,
                  }}
                >
                  <p>
                    Step into the adventure with our all-new 3D customization
                    experience. Bring your Dinosaur and Car to life and create a
                    chase scene that’s truly your own.
                  </p>
                  <button onClick={lookAtDino}>
                    <span>CUSTOMIZE IT</span>
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.section>
        ) : state.customizingDino ? (
          <motion.section key="custom-dino" {...config}>
            <DinoCustomizer />
          </motion.section>
        ) : (
          <motion.section key="custom-vehicle" {...config}>
            <VehicleCustomizer />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

const DinoCustomizer = () => {
  const state = useStore();
  return (
    <div className="customizer">
      <div className="color-options">
        {state.dinoColors.map((color) => (
          <div
            key={color}
            className={`circle`}
            style={{ background: color }}
            onClick={() => state.setDinoCurrentColor(color)}
          ></div>
        ))}
      </div>
      <div className="dinos selections">
        <div className="selections--container">
          {state.dinoImages.map((dino) => (
            <div
              key={dino.name}
              className={`decal`}
              onClick={() => state.setSelectedDino(dino.name)}
            >
              <img src={dino.url} alt="brand" />
            </div>
          ))}
        </div>
      </div>
      {/* <button
                className="share"
                style={{ background: snap.color }}
                onClick={() => {
                const link = document.createElement('a')
                link.setAttribute('download', 'canvas.png')
                link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'))
                link.click()
                }}>
                DOWNLOAD
                <AiFillCamera size="1.3em" />
            </button> */}
      <button
        className="exit"
        style={{ background: state.dinoCurrentColor }}
        onClick={() => {
          state.setIntro(true);
          state.setCustomizingDino(false);
        }}
      >
        <span>Go Back</span>
      </button>

      <button
        className="exit toVehicle"
        style={{ background: state.dinoCurrentColor }}
        onClick={() => {
          state.setCustomizingDino(false);
          state.setCustomizingVehicle(true);
        }}
      >
        <span>CUSTOMIZE VEHICLE</span>
      </button>
    </div>
  );
};

const VehicleCustomizer = () => {
  const state = useStore();
  return (
    <div className="customizer">
      <div className="color-options">
        {state.vehicleColors.map((color) => (
          <div
            key={color}
            className={`circle`}
            style={{ background: color }}
            onClick={() => state.setVehicleCurrentColor(color)}
          ></div>
        ))}
      </div>
      <div className="decals selections">
        <div className="selections--container">
          {state.dinoDecals.map((decal) => (
            <div
              key={decal}
              className={`decal`}
              onClick={() => state.setDinoDecal(decal)}
            >
              <img src={"decals/" + decal + ".png"} alt="brand" />
            </div>
          ))}
        </div>
      </div>
      {/* <button
                  className="share"
                  style={{ background: snap.color }}
                  onClick={() => {
                  const link = document.createElement('a')
                  link.setAttribute('download', 'canvas.png')
                  link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'))
                  link.click()
                  }}>
                  DOWNLOAD
                  <AiFillCamera size="1.3em" />
              </button> */}
      <button
        className="exit"
        style={{ background: state.vehicleCurrentColor }}
        onClick={() => {
          state.setIntro(true);
          state.setCustomizingVehicle(false);
        }}
      >
        <span>Go Back</span>
      </button>

      <button
        className="exit toVehicle"
        style={{ background: state.vehicleCurrentColor }}
        onClick={() => {
          state.setCustomizingDino(true);
          state.setCustomizingVehicle(false);
        }}
      >
        <span>CUSTOMIZE DINOSAUR</span>
      </button>
    </div>
  );
};
export default Overlay;
