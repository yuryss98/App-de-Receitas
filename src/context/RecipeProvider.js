import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';

function RecipeProvider({ children }) {
  const [resultMeals, setResultMeals] = useState({});
  const [resultDrinks, setResultDrinks] = useState({});
  const [resultMealsCategory, setResultMealsCategory] = useState({});
  const [resultDrinksCategory, setResultDrinksCategory] = useState({});
  const [categoryMeals, setCategoryMeals] = useState({});
  const [categoryDrinks, setCategoryDrinks] = useState({});

  const contextValue = {
    resultMeals,
    setResultMeals,
    resultDrinks,
    setResultDrinks,
    resultMealsCategory,
    setResultMealsCategory,
    resultDrinksCategory,
    setCategoryMeals,
    categoryMeals,
    setResultDrinksCategory,
    categoryDrinks,
    setCategoryDrinks,
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
