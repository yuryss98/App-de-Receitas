import React, { useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MealsDetailsRender from '../components/MealsDetailsRender';
import RecipeContext from '../context/RecipeContext';
import DrinksDetailsRender from '../components/DrinksDetailsRender';

const MEAL_URL_TO_FETCH = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const DRINK_URL_TO_FETCH = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

function RecipeDetails() {
  const {
    recipeDetails,
    setRecipeDetails,
  } = useContext(RecipeContext);
  const { id } = useParams();
  const { location: { pathname } } = useHistory();

  useEffect(() => {
    const fetching = async () => {
      try {
        if (pathname === `/meals/${id}`) {
          const data = await fetch(`${MEAL_URL_TO_FETCH}${id}`)
            .then((item) => item.json());
          setRecipeDetails(data);
        }
        if (pathname === `/drinks/${id}`) {
          const data = await fetch(`${DRINK_URL_TO_FETCH}${id}`)
            .then((item) => item.json());
          setRecipeDetails(data);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    fetching();
  }, [id, pathname, setRecipeDetails]);

  return (
    <div>
      {recipeDetails.drinks && <DrinksDetailsRender />}
      {recipeDetails.meals && <MealsDetailsRender />}
    </div>
  );
}

export default RecipeDetails;
