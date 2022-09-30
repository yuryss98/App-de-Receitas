import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import shareIcon from '../images/shareIcon.svg';
import FinishRecipe from './FinishRecipe';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipeInProgress() {
  const [keys, setKeys] = useState('');
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [lStorage, setLStorage] = useLocalStorage('favoriteRecipes');
  const [showIfCopy, setShowIfCopy] = useState(false);
  const [enabledFinish, setEnabledFinish] = useState(true);
  const [checkIngredient, setCheckIngredient] = useState(0);

  const { id } = useParams();
  const { location: { pathname }, push } = useHistory();

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
    if (keys) {
      const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes')) || {
        meals: {},
        drinks: {},
      };

      if (getLocalStorage[keys][id]) {
        const newObj = {
          ...getLocalStorage,
          [keys]: {
            ...getLocalStorage[keys],
            [id]: [...getLocalStorage[keys][id]],
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
      } else {
        const newObj = {
          ...getLocalStorage,
          [keys]: {
            ...getLocalStorage[keys],
            [id]: [],
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keys]);

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

  useEffect(() => {
    if (ingredients.length) {
      if (ingredients.length / 2 === checkIngredient) {
        setEnabledFinish(false);
      } else {
        setEnabledFinish(true);
      }
    }
  }, [checkIngredient]); // eslint-disable-line

  const drinksOrMeals = pathname.split('/');
  const key = recipe
  && drinksOrMeals[1].charAt(0).toUpperCase() + drinksOrMeals[1].slice(1);
  const newStrin = key.split(key[key.length - 1]);
  const test = drinksOrMeals[1];
  const halfLengthOfIngredients = Math.ceil(ingredients.length / 2);
  const previousStorage = (lStorage && JSON.parse(lStorage)) || [];
  const doesRecipeExistInLocalStorage = recipe
  && previousStorage
    .some((item) => item.id === recipe[test][0][`id${newStrin[0]}`]);

  const favoriteHandler = () => {
    const nationality = drinksOrMeals[1] === 'meals' ? recipe.meals[0].strArea : '';
    const alcoholicOrNot = drinksOrMeals[1] === 'drinks'
      ? recipe.drinks[0].strAlcoholic : '';

    const { strCategory } = recipe[test][0];
    const itemInfo = {
      id: recipe[test][0][`id${newStrin[0]}`],
      type: test.replace(test[test.length - 1], ''),
      name: recipe[test][0][`str${newStrin[0]}`],
      nationality,
      alcoholicOrNot,
      category: strCategory,
      image: recipe[test][0][`str${newStrin[0]}Thumb`] };

    const nextStorage = previousStorage.concat(itemInfo);

    if (doesRecipeExistInLocalStorage) {
      const b = previousStorage.filter((item) => item.id !== itemInfo.id);
      const c = JSON.stringify(b);
      localStorage
        .removeItem('favoriteRecipes');
      setLStorage(c);
      return;
    }
    setLStorage(JSON.stringify(nextStorage));
  };

  const shareHandler = () => {
    const link = window.location.href;
    const newLink = link.replace('/in-progress', '');
    copy(newLink);
    setShowIfCopy(true);
  };

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

        <div>
          {ingredients && ingredients
            .slice(0, halfLengthOfIngredients)
            .map((item, i) => (
              <FinishRecipe
                setCheckIngredient={ setCheckIngredient }
                checkIngredient={ checkIngredient }
                setEnabledFinish={ setEnabledFinish }
                key={ item + i }
                item={ item }
                i={ i }
                ingredients={ ingredients }
                halfLengthOfIngredients={ halfLengthOfIngredients }
              />
            ))}
        </div>
      </main>

      <div>
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ favoriteHandler }
          src={ doesRecipeExistInLocalStorage ? blackHeartIcon : whiteHeartIcon }
        >
          <img
            src={ doesRecipeExistInLocalStorage ? blackHeartIcon : whiteHeartIcon }
            alt="btnImg"
          />
          Favorite Recipe
        </button>

        <button
          type="button"
          data-testid="share-btn"
          onClick={ shareHandler }
        >
          <img src={ shareIcon } alt="share" />
          Share Recipe
        </button>
        {showIfCopy && <p>Link copied!</p>}

        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ enabledFinish }
          onClick={ () => push('/done-recipes') }
        >
          Finish Recipe
        </button>
      </div>

    </>
  );
}

export default RecipeInProgress;
