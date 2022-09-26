import React, { useContext } from 'react';
import RecipeCard from '../components/RecipeCard';
import RecipeContext from '../context/RecipeContext';

function Drinks() {
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
              title="strDrink"
              img="strDrinkThumb"
              index={ index }
            />
          );
        }
        return null;
      })}
    </main>
  );
}

export default Drinks;
