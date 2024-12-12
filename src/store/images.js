import { proxy } from "valtio";

const state = proxy({
  logoDecal: [
    {
      src: "./logo.png",
      part: "front",
      position: [0, -0.04, 0.1],
      scale: [0.275, 0.35, 0.1],
    },
    {
      src: "./logo.png",
      part: "back",
      position: [0, -0.04, -0.1],
      scale: [0.275, 0.35, 0.1],
    },
  ],
});

export default state;
