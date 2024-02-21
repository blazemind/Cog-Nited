import React, { createContext, useContext, useState } from 'react';
import { testMarkdown } from '../constants';
import { splitMarkdownToDict } from '../utils'; 

const RecipesContext = createContext();

export const useRecipes = () => useContext(RecipesContext);

export const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState(splitMarkdownToDict(testMarkdown));
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpansion = (index) => {
    setExpandedIndex(prevIndex => prevIndex === index ? null : index);
  };

  const value = {
    recipes,
    expandedIndex,
    toggleExpansion,
    setRecipes, // Expose setRecipes for updating recipes from other components
  };

  return (
    <RecipesContext.Provider value={value}>
      {children}
    </RecipesContext.Provider>
  );
};
