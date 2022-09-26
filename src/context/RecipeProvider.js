import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';

function RecipeProvider({ children }) {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recipesData, setRecipesData] = useState([]);

  useEffect(() => {
    console.log(recipesData);
  }, [recipesData]);

  const contextValue = {
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
