import { Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";

interface Props {
  blueprint: string;
  closeModal: (value: any) => void;
}

const ModalInformation: React.FC<Props> = ({ blueprint, closeModal }) => {
  const [information, setInformation] = useState<any>();
  const onCloseModal = () => {
    setInformation(null);
    closeModal(null);
  };

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("/api/get_product_information", {
        method: "POST",
        body: JSON.stringify({ blueprint_id: "6" }),
      });
      setInformation(await response.json());
    };
    if (blueprint) loadData();
  }, [blueprint]);
  return (
    <Modal
      open={blueprint ? true : false}
      centered
      footer={null}
      onCancel={() => onCloseModal()}
    >
      {!information ? (
        <Spin />
      ) : (
        <>
          <p>{information.name}</p>
          <p>{information.brandName}</p>
          {information.providers[0].name}
          {information.providers[0].location.country}
          {information.providers[0].printPositions.map((positions) => (
            <p>{positions.label}</p>
          ))}
          {information.providers[0].sizes.map((sizes) => (
            <p>{sizes.label}</p>
          ))}
          {information.providers[0].colors.map((colorInformation) => {
            return colorInformation.colors.map((color) => (
              <div
                style={{
                  height: 10,
                  width: 10,
                  margin: 5,
                  borderRadius: 25,
                  backgroundColor: `${color.hex}`,
                }}
              />
            ));
          })}
        </>
      )}
    </Modal>
  );
};

export default ModalInformation;
