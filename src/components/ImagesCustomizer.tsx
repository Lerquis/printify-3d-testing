import state from "@/store";
import images from "@/store/images";
import { reader } from "@/utils";
import { Button, Textarea } from "@mui/joy";
import React, { useEffect, useState } from "react";

interface Props {
  lookingTo: string;
}

const ImagesCustomizer: React.FC<Props> = ({ lookingTo }) => {
  const [update, setUpdate] = useState<boolean>(false);

  const readFile = async (file: any) => {
    let fileImage;
    let position: number[] = [];
    let rotation: any = null;
    let scale: any = null;
    if (lookingTo === "Front") position = [0, -0.04, 0.1];
    if (lookingTo === "Back") position = [0, -0.04, -0.1];
    if (lookingTo === "Sleeve") {
      position = [-0.23, 0.1, -0.03];
      rotation = [-0.11, 1.36, 0.07];
      scale = [0.1, 0.18, 0.12];
    }
    const response: string = await reader(file);
    // images[lookingTo.toLocaleLowerCase()] = {
    //   src: response,
    //   position,
    //   rotation,
    //   scale,
    // };

    const exist = images.logoDecal.findIndex(
      (imageInformation, index) =>
        imageInformation.part === lookingTo.toLocaleLowerCase()
    );

    console.log(exist);
    if (exist !== -1) {
      images.logoDecal[exist] = { ...images.logoDecal[exist], src: response };
    } else {
      images.logoDecal = [
        ...images.logoDecal,
        {
          src: response,
          part: lookingTo.toLocaleLowerCase(),
          position,
          scale,
          rotation,
        },
      ];
    }
  };

  useEffect(() => {}, [update]);

  return (
    <div
      style={{
        marginBottom: 20,
        borderBottom: "1px solid #fbb910",
        paddingBottom: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <p style={{ color: "#000" }}>{lookingTo}</p>
        <Button onClick={() => (state.lookingTo = lookingTo.toLowerCase())}>
          Check
        </Button>
      </div>
      <Textarea color="warning" placeholder="Generate an image by AI" />

      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Button>Set AI image</Button>
        <label>
          Select a file:
          <input
            type="file"
            accept="images/*"
            onChange={(e) => {
              if (!e.target.files?.length) return console.log("no images");
              readFile(e.target.files[0]);
            }}
          />
        </label>
      </div>
    </div>
  );
};

export default ImagesCustomizer;
