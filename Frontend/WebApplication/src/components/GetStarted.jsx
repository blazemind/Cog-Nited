import styles from "../style";
import { arrowUp } from "../assets";
import React from "react";

function GetStarted(props) {
  // When the button is clicked, ask the user to upload the image (png, jpg or jpeg), then call the function handleImageUpload passed from the parent component, set the image to the path of the uploaded image
  const handleClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        props.onImageUpload(e.target.result, file);
      };
    };
    input.click();
  };

  return (
    <div
      onClick={handleClick}
      // Add hover effect to the area
      className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer hover:scale-110 hover:transition-transform duration-300`}
    >
      <div
        className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full`}
      >
        <div className={`${styles.flexStart} flex-row`}>
          <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
            <span className="text-gradient">Upload</span>
          </p>
          <img
            src={arrowUp}
            alt="arrow-up"
            className="w-[23px] h-[23px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default GetStarted;
