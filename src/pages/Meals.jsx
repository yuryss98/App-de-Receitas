import React, { useContext } from 'react';
import RecipeCard from '../components/RecipeCard';
import RecipeContext from '../context/RecipeContext';

function Meals() {
  const { recipesData } = useContext(RecipeContext);

  return (
    <main>
      {recipesData.length && recipesData.map((recipe, index) => {
        const numMaxCard = 12;

        if (index < numMaxCard) {
          return (
            <RecipeCard
              key={ recipe.id }
              recipe={ recipe }
              title="strMeal"
              img="strMealThumb"
              index={ index }
            />
          );
        }
        return null;
      })}
    </main>
  );
}

export default Meals;
