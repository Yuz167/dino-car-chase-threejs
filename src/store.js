import { create } from "zustand";
import * as THREE from "three";
import { select } from "framer-motion/client";

export const store = create((set, get) => ({
  intro: true,
  dinoImages: [
    {
      name: "FemaleGorgo",
      url: "/models/Dino/Female_Gorgosaurus/Gorgo_image.png",
    },
    {
      name: "Carnotaurus",
      url: "/models/Dino/Purple_Carnotaurus/carnotaurus_image.png",
    },
    { name: "Rex", url: "/models/Dino/Tyrannosaurus_Rex/Rex_image.png" },
  ],
  dinos: {
    FemaleGorgo: {
      path: "/models/Dino/Female_Gorgosaurus/source/FemaleGorgo.glb",
      actions: "DarkPrince|_run|Base Layer",
      material: "Material.003",
      scale: [2, 2, 2],
      position: [5, 0, -3],
      requireTexture: false,
      disableColorSelection: false,
    },
    Carnotaurus: {
      path: "/models/Dino/Purple_Carnotaurus/purple_carnotaurus.glb",
      actions: "run",
      material: "carnotaurus_col2",
      scale: [220, 220, 220],
      position: [5.5, -106.1, -161],
      requireTexture: false,
      disableColorSelection: false,
    },
    Rex: {
      path: "/models/Dino/Tyrannosaurus_Rex/animated_tyrannosaurus_rex_dinosaur_running_loop.glb",
      actions: "run",
      material: "material_0",
      scale: [5, 5, 5],
      position: [0, -0.3, -10],
      requireTexture: true,
      map: "/models/Dino/Tyrannosaurus_Rex/textures/gltf_embedded_0.png",
      normalMap: "/models/Dino/Tyrannosaurus_Rex/textures/gltf_embedded_2.png",
      aoMap:
        "/models/Dino/Tyrannosaurus_Rex/textures/gltf_embedded_3@channels=R.png",
      disableColorSelection: true,
    },
  },
  selectedDino: "FemaleGorgo",
  dinoColors: [
    "#FFFFFF",
    "#D5AAFF",
    "#A8E6CF",
    "#C57B55",
    "#C2B280",
    "#EF674E",
  ],
  dinoCurrentColor: "#FFFFFF",
  dinoDecals: ["dino_decal_1", "dino_decal_2", "dino_decal_3"],
  dinoDecal: null,
  vehicleColors: [
    "#FFFFFF",
    "#00FFFF",
    "#98FF98",
    "#FFB6C1",
    "#B0C4DE",
    "#FF7F50",
  ],
  vehicleCurrentColor: "#FFFFFF",
  customizingDino: false,
  customizingVehicle: false,

  //setters and getters
  setIntro: (intro) => set({ intro: intro }),
  setDinoCurrentColor: (color) => set({ dinoCurrentColor: color }),
  setDinoDecal: (decal) => set({ dinoDecal: decal }),
  setVehicleCurrentColor: (color) => set({ vehicleCurrentColor: color }),
  setVehicleDecal: (decal) => set({ vehicleDecal: decal }),
  getDinoColorRGB: () => {
    const color = new THREE.Color(get().dinoCurrentColor);
    return [color.r, color.g, color.b];
  },
  setCustomizingDino: (customizingDino) =>
    set({ customizingDino: customizingDino }),
  setCustomizingVehicle: (customizingVehicle) =>
    set({ customizingVehicle: customizingVehicle }),
  setSelectedDino: (dino) => set({ selectedDino: dino }),
}));
