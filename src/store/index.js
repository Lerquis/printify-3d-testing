import { proxy } from "valtio";

const state = proxy({
  intro: "home",
  color: "#efbd48",
  isLogoTexture: true,
  isFullTexture: false,
  fullDecal: "./logo.png",
  lookingTo: "front",
});

export default state;
