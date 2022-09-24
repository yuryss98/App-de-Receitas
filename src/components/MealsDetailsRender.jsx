import React, { useContext, useState, useEffect } from 'react';
import RecipeContext from '../context/RecipeContext';

const RECOMENDATION_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function MealsDetailsRender() {
  const { recipeDetails } = useContext(RecipeContext);
  const { meals } = recipeDetails;
  const data = meals[0];
  const [ingredients, setIngredients] = useState([]);
  const [recomendedDrinks, setRecomendedDrinks] = useState({});

  useEffect(() => {
    const listingIngredients = () => {
      const filteredIngredients = Object.keys(data)
        .filter((item) => {
          if (item.includes('strIngredient')) return true;
          return item.includes('strMeasure');
        })
        .map((ing) => data[ing])
        .filter((item) => item !== '' && item !== null);
      setIngredients(filteredIngredients);
    };

    listingIngredients();
  }, [data]);

  useEffect(() => {
    const fetchingRecomendedDrinks = async () => {
      const info = await fetch(`${RECOMENDATION_URL}`)
        .then((result) => result.json());
      setRecomendedDrinks(info);
    };

    fetchingRecomendedDrinks();
  }, []);

  if (recomendedDrinks.drinks) console.log(recomendedDrinks);

  const halfLengthOfIngredients = Math.ceil(ingredients.length / 2);

  return (
    <section>
      <p data-testid="recipe-title">
        <b>{data.strMeal}</b>
      </p>
      <br />
      <img
        src={ data.strMealThumb }
        alt={ data.strMeal }
        data-testid="recipe-photo"
        style={ { width: '250px' } }
      />
      <br />
      <div data-testid="recipe-category">
        <b>{data.strCategory}</b>
      </div>
      <br />
      <div>
        {ingredients
          .slice(0, halfLengthOfIngredients)
          .map((item, i) => (
            <div
              data-testid={ `${i}-ingredient-name-and-measure` }
              key={ item + i }
            >
              {`${ingredients[halfLengthOfIngredients + i]} of ${item}`}
            </div>
          ))}
      </div>
      <br />
      <div data-testid="instructions">
        {data.strInstructions}
      </div>
      <br />
      <div>
        <iframe
          src={ data.strYoutube.replace('watch?v=', 'embed/') }
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
          data-testid="video"
        />
      </div>
    </section>
  );
}

export default MealsDetailsRender;
