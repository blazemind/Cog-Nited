import styles from "../style";
import GetStarted from "./GetStarted";
import { mainDescription } from "../constants";
import food from "../assets/food.png";
import React, { useState, useEffect } from "react";
import { useRecipes } from "../context/RecipeContext";
import { postImage } from "../utils";
import { splitMarkdownToDict } from "../utils";

const Hero = () => {
  //handleImageUpload function will set the image to the state
  const [image, setImage] = useState(food);
  const [animationClass, setAnimationClass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setRecipes } = useRecipes();

  useEffect(() => {
    // Reset animation class whenever image changes, but ignore the initial render
    if (image !== food) {
      setAnimationClass("fade-in");
      // Remove the class after the animation duration to allow re-animation if the image changes again
      const timeoutId = setTimeout(() => setAnimationClass(""), 500); // Match this duration to your animation duration
      return () => clearTimeout(timeoutId);
    }
  }, [image]);

  const handleImageUpload = (newImage, binaryImageData) => {
    setImage(newImage);
    setIsLoading(true); // Start loading

    postImage(binaryImageData)
      .then((response) => {
        setRecipes(splitMarkdownToDict(response));
        document
          .getElementById("recipes")
          .scrollIntoView({ behavior: "smooth" });
        setIsLoading(false); // End loading
      })
      .catch((error) => {
        console.error("Error analyzing image:", error);
        setIsLoading(false); // Ensure loading ends even if there's an error
      });
  };

  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
      >
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[60px] text-[45px] text-white ss:leading-[100.8px] leading-[75px]">
            Instant <br className="sm:block hidden" />{" "}
            <span className="text-gradient">Recipe</span>{" "}
          </h1>
          <div className="flex md:mr-4 mr-0">
            <GetStarted onImageUpload={handleImageUpload} />
          </div>
        </div>

        <h1 className="font-poppins font-semibold ss:text-[60px] text-[45px] text-white ss:leading-[100.8px] leading-[75px] w-full">
          Generator
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          {mainDescription}
        </p>
      </div>

      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
      >
        {/* Conditional rendering for loading indicator */}
        {isLoading && (
          <div className="fixed inset-0 flex justify-center items-center">
            <div className="loader">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          </div>
        )}
        <img
          src={image}
          alt="food items"
          className={`w-auto xs:h-[500px] h-[300px] relative z-[5] rounded-3xl ${animationClass}`}
        />

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>
    </section>
  );
};

export default Hero;
