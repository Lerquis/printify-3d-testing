import ImagesCustomizer from "@/components/ImagesCustomizer";
import { PreviewSection } from "@/components/PreviewSection";
import state from "@/store";
import { slideAnimation } from "@/utils";
import { Button } from "@mui/joy";
import Alert from "@mui/material/Alert";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useSnapshot } from "valtio/react";
import images from "@/store/images";

const Customizer: React.FC = () => {
  const [msg, setMsg] = useState<string>("hidden");
  const [imageCreatedID, setImageCreatedID] = useState<string>();
  const [mockups, setMockups] = useState<any>();
  const snap = useSnapshot(state);

  const handleCreateShirt = async () => {
    const imagesRequests = images.logoDecal.map((imageInformation) => {
      return fetch("/api/createimages", {
        method: "POST",
        body: JSON.stringify({
          image: imageInformation.src.split(",")[1],
          part: imageInformation.part,
        }),
      });
    });

    const dataFromImages = await Promise.all(imagesRequests);
    const bodyToCreateProduct = await Promise.all(
      dataFromImages.map(async (responseInformation: any) => {
        const information = await responseInformation.json();
        return {
          id: information.created,
          part: information.part,
        };
      })
    );
    await createProduct(bodyToCreateProduct as { id: string; part: string }[]);
  };

  const createProduct = async (
    productInformation: { id: string; part: string }[]
  ) => {
    const product = await fetch("/api/createproduct", {
      method: "POST",
      body: JSON.stringify({
        productInformation,
      }),
    });
    const response = await product.json();
    if (response.status_code) {
      setMsg("Shirt created!");
      setImageCreatedID(response.id);
      setMockups(response.images);
    } else {
      setMsg("Something went wrong...");
    }
    setTimeout(() => {
      setMsg("hidden");
    }, 3000);
  };

  return (
    <AnimatePresence>
      {snap.intro === "customize" && (
        <motion.div
          style={{ position: "absolute", width: "100vw", height: "100vh" }}
        >
          <div style={{ position: "relative" }}>
            <motion.div
              {...slideAnimation("right")}
              style={{
                width: "400px",
                height: "100vh",
                position: "absolute",
                backgroundColor: "#fbb91050",
                top: 0,
                right: 0,
                zIndex: 10,
              }}
            >
              <div
                style={{
                  zIndex: "20",
                  width: "80%",
                  margin: "10px auto",
                  textAlign: "center",
                }}
              >
                <ImagesCustomizer lookingTo="Front" />
                <ImagesCustomizer lookingTo="Back" />
                <ImagesCustomizer lookingTo="Sleeve" />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Button onClick={() => handleCreateShirt()}>
                    Preview it!
                  </Button>

                  <Button
                    onClick={() => {
                      setMockups(null);
                      setImageCreatedID("");
                    }}
                  >
                    Delete info
                  </Button>

                  {imageCreatedID && (
                    <motion.div
                      style={{ width: "100%" }}
                      {...slideAnimation("right")}
                    >
                      <Button style={{ width: "100%" }}>Buy it!</Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
            {msg !== "hidden" && (
              <Alert severity={msg.includes("created") ? "success" : "error"}>
                {msg}
              </Alert>
            )}
            {imageCreatedID && (
              <PreviewSection id={imageCreatedID} images={mockups} />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
