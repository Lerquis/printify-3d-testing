import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AnimatePresence, motion } from "framer-motion";
import { slideAnimation } from "@/utils";
interface Props {
  images: any;
  id: string;
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};

export const PreviewSection: React.FC<Props> = ({ images, id }) => {
  const [hide, setHide] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setHide(false);
    }, 500);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        {...slideAnimation("up")}
        style={{ position: "relative", height: "100vh", width: "100vw" }}
      >
        <div
          style={{
            position: "absolute",
            height: 200,
            width: "calc(100vw - 400px)",
            backgroundColor: "#fbb91050",
            bottom: hide ? "-165px" : "0px",
            padding: "10px ",
            zIndex: 1000,
            transition: "all 0.3s ease",
          }}
        >
          <p
            style={{ width: "fit-content", margin: "0 auto" }}
            onClick={() => setHide(!hide)}
          >
            Hide
          </p>

          <Splide
            options={{
              rewind: true,
              perPage: 6,
              drag: "free",
              gap: "20px",
            }}
            aria-label="React Splide Example"
          >
            {images.map((image: any) => (
              <SplideSlide>
                <div
                  style={{
                    overflow: "hidden",
                    height: "150px",
                    width: "100%",
                    backgroundImage: `url(${image.src})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    borderRadius: 25,
                  }}
                />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
