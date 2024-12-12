import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import { slideAnimation } from "../utils";
import state from "../store";
import ModalInformation from "@/components/ModalInformation";

export const Models = () => {
  const snap = useSnapshot(state);
  const [models, setModels] = useState<any>([]);
  const [showButton, setShowButton] = useState(false);
  const [blueprint, setBlueprint] = useState<string>();

  setTimeout(() => {
    setShowButton(true);
  }, 1500);

  useEffect(() => {
    const loadData = async () => {
      let response = await fetch("api/getobjects", {
        method: "POST",
        body: JSON.stringify({ blueprint_id: "6" }),
      });
      let data = [await response.json()];
      response = await fetch("api/getobjects", {
        method: "POST",
        body: JSON.stringify({ blueprint_id: "2" }),
      });
      data = [...data, await response.json()];

      response = await fetch("api/getobjects", {
        method: "POST",
        body: JSON.stringify({ blueprint_id: "18" }),
      });
      data = [...data, await response.json()];
      response = await fetch("api/getobjects", {
        method: "POST",
        body: JSON.stringify({ blueprint_id: "66" }),
      });
      data = [...data, await response.json()];
      response = await fetch("api/getobjects", {
        method: "POST",
        body: JSON.stringify({ blueprint_id: "32" }),
      });
      data = [...data, await response.json()];
      response = await fetch("api/getobjects", {
        method: "POST",
        body: JSON.stringify({ blueprint_id: "83" }),
      });
      data = [...data, await response.json()];
      setModels([...data]);
    };
    if (!models.length) loadData();
  }, []);

  return (
    <>
      <ModalInformation
        blueprint={blueprint as string}
        closeModal={setBlueprint}
      />
      <AnimatePresence>
        {snap.intro === "models" && (
          <motion.div className="models">
            <motion.div
              {...slideAnimation("right")}
              style={{
                fontSize: 48,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                margin: "100px auto 200px auto",
                lineHeight: "45px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>
                Start your{" "}
                <span style={{ color: "#fbb910" }}>customization</span>
              </p>
              <span style={{ fontSize: 24 }}>
                by loading some of our models from the catalog.
              </span>
            </motion.div>
            <motion.div
              {...slideAnimation("up")}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10 "
            >
              {models.map((object: any, index: number) => {
                return (
                  <motion.div className="card" key={index}>
                    <p
                      className="px-2 mt-2"
                      style={{
                        height: 30,
                        overflow: "auto",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      {object.title}
                    </p>
                    <p
                      className="px-2 mb-2"
                      style={{ fontSize: "16px", color: "#000" }}
                    >
                      Brand:{" "}
                      <span style={{ color: "#000" }}>{object.brand}</span>
                    </p>
                    <div
                      className="imageCards"
                      style={{
                        backgroundImage: `url(${object.images[0]})`,
                      }}
                    >
                      <button
                        className="buttonCard"
                        onClick={() => {
                          setBlueprint(object.id);
                        }}
                      >
                        See options!
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Models;
