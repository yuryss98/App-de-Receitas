import React, { useContext, useState, useEffect } from 'react';
import RecipeContext from '../context/RecipeContext';

const RECOMENDATION_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

function DrinksDetailsRender() {
  const { recipeDetails } = useContext(RecipeContext);
  const { drinks } = recipeDetails;
  const data = drinks[0];
  const [ingredientsDrink, setIngredientsDrink] = useState([]);
  const [recomendedMeals, setRecomendedMeals] = useState({});

  useEffect(() => {
    const listingIngredientsDrink = () => {
      const filteredIngredientsDrink = Object.keys(data)
        .filter((item) => {
          if (item.includes('strIngredient')) return true;
          return item.includes('strMeasure');
        })
        .map((ing) => data[ing])
        .filter((item) => item !== '' && item !== null);
      setIngredientsDrink(filteredIngredientsDrink);
    };

    listingIngredientsDrink();
  }, [data]);

  useEffect(() => {
    const fetchingRecomendedMeals = async () => {
      const info = await fetch(`${RECOMENDATION_URL}`)
        .then((result) => result.json());
      setRecomendedMeals(info);
    };

    fetchingRecomendedMeals();
  }, []);

  if (recomendedMeals.meals) console.log(recomendedMeals);

  const halfLengthOfIngredientsDrink = Math.ceil(ingredientsDrink.length / 2);

  return (
    <section>
      <p data-testid="recipe-title">
        <b>{data.strDrink}</b>
      </p>
      <br />
      <img
        src={ data.strDrinkThumb }
        alt={ data.strDrink }
        data-testid="recipe-photo"
        style={ { width: '250px' } }
      />
      <br />
      <div data-testid="recipe-category">
        <b>{data.strAlcoholic}</b>
      </div>
      <br />
      <div>
        {ingredientsDrink
          .slice(0, halfLengthOfIngredientsDrink)
          .map((item, i) => (
            <div
              data-testid={ `${i}-ingredient-name-and-measure` }
              key={ item + i }
            >
              {`${ingredientsDrink[halfLengthOfIngredientsDrink + i]} of ${item}`}

            </div>
          ))}
      </div>
      <br />
      <div data-testid="instructions">
        {data.strInstructions}
      </div>
      <br />
    </section>
  );
}

export default DrinksDetailsRender;
