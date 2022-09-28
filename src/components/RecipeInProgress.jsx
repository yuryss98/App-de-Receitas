import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import FinishRecipe from './FinishRecipe';

function RecipeInProgress() {
  const [keys, setKeys] = useState('');
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState('');

  const { id } = useParams();
  const { location: { pathname } } = useHistory();

  useEffect(() => {
    const MEAL_URL_TO_FETCH = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
    const DRINK_URL_TO_FETCH = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

    const fetching = async () => {
      try {
        if (pathname.includes('meals')) {
          const response = await fetch(`${MEAL_URL_TO_FETCH}${id}`);
          const data = await response.json();
          setRecipe(data);
        } else {
          const response = await fetch(`${DRINK_URL_TO_FETCH}${id}`);
          const data = await response.json();
          setRecipe(data);
        }
      } catch (e) {
        return e.message;
      }
    };

    fetching();
  }, [pathname, id]);

  useEffect(() => {
    if (recipe) {
      const keysMealsOrDrinks = Object.keys(recipe);
      setKeys(keysMealsOrDrinks[0]);

      const data = recipe[keysMealsOrDrinks][0];
      const ingredientsKeys = Object.keys(data).filter((ingredient) => {
        if (ingredient.includes('strIngredient')) return true;
        return ingredient.includes('strMeasure');
      });

      const filteredIngredients = ingredientsKeys.map((ing) => data[ing])
        .filter((ingredient) => ingredient && ingredient !== ' ');

      setIngredients(filteredIngredients);
    }
  }, [recipe]);

  const halfLengthOfIngredients = Math.ceil(ingredients.length / 2);

  return (
    <>

      <main>
        {
          keys && recipe[keys].map((item) => {
            if (keys === 'drinks') {
              return (
                <div key={ item.idDrink }>
                  <h1 data-testid="recipe-title">{ item.strDrink }</h1>
                  <h3 data-testid="recipe-category">{ item.strAlcoholic }</h3>
                  <img
                    data-testid="recipe-photo"
                    src={ item.strDrinkThumb }
                    alt={ item.strDrink }
                    style={ { width: '250px' } }
                  />
                  <p data-testid="instructions">{ item.strInstructions }</p>
                </div>
              );
            }
            return (
              <div key={ item.idMeal }>
                <h1 data-testid="recipe-title">{ item.strMeal }</h1>
                <h3 data-testid="recipe-category">{ item.strCategory }</h3>
                <img
                  data-testid="recipe-photo"
                  src={ item.strMealThumb }
                  alt=""
                  style={ { width: '250px' } }
                />
                <p data-testid="instructions">{ item.strInstructions }</p>
              </div>
            );
          })
        }

        {ingredients && ingredients
          .slice(0, halfLengthOfIngredients)
          .map((item, i) => (
            <FinishRecipe
              key={ item + i }
              item={ item }
              i={ i }
              ingredients={ ingredients }
              halfLengthOfIngredients={ halfLengthOfIngredients }
            />
          ))}
      </main>

      <div>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          Favorite Recipe
        </button>

        <button
          type="button"
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt="share" />
          Share Recipe
        </button>

        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finish Recipe
        </button>
      </div>

    </>
  );
}

export default RecipeInProgress;
