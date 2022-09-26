import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import RecipeContext from '../context/RecipeContext';

function Meals() {
  const { recipesData } = useContext(RecipeContext);
  const history = useHistory();
  return (
    <>
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
      <Footer history={ history } />

    </>
  );
}

export default Meals;
