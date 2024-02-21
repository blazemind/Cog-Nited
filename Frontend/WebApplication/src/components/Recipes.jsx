import React from "react";
import { useRecipes } from "../context/RecipeContext";
import { RecipeCard } from "./RecipeCard";

function Recipes() {
  const { recipes, expandedIndex, toggleExpansion } = useRecipes();

  return (
  <div id="recipes" className="flex flex-col xs:w-[70%] w-[90%] items-center mx-auto ">
    {recipes.map((recipe, index) => (
      <RecipeCard
        key={recipe.key}
        {...recipe}
        index={index}
        isExpanded={expandedIndex === index}
        toggleExpansion={() => toggleExpansion(index)}
      />
    ))}
  </div>
  );
};

export default Recipes;
