import styles from "../style";
import { arrowUp } from "../assets";
import React, { useEffect, useState } from "react";
import mqtt from 'mqtt';
import { base64ToArrayBuffer } from "../utils";


function GetStarted(props) {
  const [imageSrc, setImageSrc] = useState(null);

  const mqtt_broker = `${import.meta.env.VITE_REACT_APP_MQTT_BROKER}`
  const mqtt_topic = `${import.meta.env.VITE_REACT_APP_MQTT_TOPIC}`

  useEffect(() => {
    const client = mqtt.connect(mqtt_broker); 

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe(mqtt_topic, (err) => {
        if (!err) {
          console.log('Subscribed to topic');
        }
      });
    });

    client.on('message', (topic, message) => {
        console.log('Received message from topic:', topic.toString());
        setImageSrc(message.toString());
        props.onImageUpload(message, base64ToArrayBuffer(message.toString()));

      });

    return () => {
      client.end(); // Disconnect from the broker when component unmounts
    };
  }, []); // Empty dependency array means this effect runs once on mount


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
        setImageSrc(e.target.result); // Also update component state to show the uploaded image
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
