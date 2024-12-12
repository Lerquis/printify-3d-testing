"use client";

import { Home } from "../modules";
import CanvasModel from "../canvas";
import Models from "../modules/Models";
import Menu from "@/modules/Menu";
import Customizer from "@/modules/Customizer";
import { Leva } from "leva";

export default function Index() {
  return (
    <main className="app transition-all ease-in">
      <Leva />

      <Menu />
      <Home />
      <Models />
      <Customizer />
      <CanvasModel />
    </main>
  );
}
