import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';

function RecipeProvider({ children }) {
  const [resultMeals, setResultMeals] = useState({});
  const [resultDrinks, setResultDrinks] = useState({});
  const [resultCategory, setResultCategory] = useState({});
  const [allCategories, setAllCategories] = useState({});
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recipesData, setRecipesData] = useState([]);

  const contextValue = {
    resultMeals,
    setResultMeals,
    resultDrinks,
    setResultDrinks,
    resultCategory,
    setResultCategory,
    setAllCategories,
    allCategories,
    recipeDetails,
    recipesData,
    setRecipesData,
    setRecipeDetails,
  };

  return (
    <RecipeContext.Provider value={ contextValue }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeProvider;
