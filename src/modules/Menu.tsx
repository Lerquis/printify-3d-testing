import state from "@/store";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { useSnapshot } from "valtio";
import SellIcon from "@mui/icons-material/Sell";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { slideAnimation } from "@/utils";
const Menu: React.FC = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro !== "home" && (
        <motion.div
          {...slideAnimation("down")}
          style={{
            position: "absolute",
            width: "100vw",
            height: "250px",
            zIndex: 10,
          }}
        >
          <Image
            width={150}
            height={150}
            src="/logo.png"
            style={{
              top: "0px",
              left: "0px",
              position: "absolute",
              cursor: "pointer",
            }}
            alt={"Logo random"}
            onClick={() => (state.intro = "home")}
          />
          <motion.div
            style={{
              display: "flex",
              gap: 50,
              position: "absolute",
              top: "70px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <div
              className="iconContainer"
              onClick={() => (state.intro = "home")}
            >
              <SellIcon className="iconMenu" fontSize="large" />
            </div>
            {snap.intro !== "models" && (
              <div
                className="iconContainer"
                onClick={() => (state.intro = "models")}
              >
                <ImportContactsIcon className="iconMenu" fontSize="large" />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Menu;
