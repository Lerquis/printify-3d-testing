import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../utils";
import state from "../store";
import { CustomButton } from "../components/";

export const Home = () => {
  const snap = useSnapshot(state);
  const [showButton, setShowButton] = useState(false);

  setTimeout(() => {
    setShowButton(true);
  }, 1500);

  return (
    <AnimatePresence>
      {snap.intro === "home" && (
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")}>
            {/* <img
              src="./threejs.png"
              alt="logo"
              className="w-8 h-8 object-contain"
            /> */}
          </motion.header>
          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                LET'S GET
                <br className="xl:block hidden" />
                CREATIVE
              </h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <p className="max-w-md font-normal text-gray-600 text-base">
                Create your unique and exclusive shirt with our brand-new 3D
                customization tool. <strong>Unleash your imagination</strong>{" "}
                and define your own style
              </p>
              {showButton && (
                <motion.div
                  style={{ display: "flex", width: "300px", gap: "10px" }}
                  {...slideAnimation("left")}
                >
                  <CustomButton
                    type="filled"
                    title="Let's start"
                    handleClick={() => (state.intro = "models")}
                    customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                  />
                  <CustomButton
                    type="filled"
                    title="Store"
                    handleClick={() => (state.intro = "store")}
                    customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                  />
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
