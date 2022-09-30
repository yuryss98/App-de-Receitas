import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import fetchTreatment from '../helpers/recipe_details_page_helpers/fetchTreatment';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import useLocalStorage from '../hooks/useLocalStorage';
import isInProgress from '../helpers/recipe_details_page_helpers/isInProgress';

const copy = require('clipboard-copy');

const MEAL_URL_TO_FETCH = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const DRINK_URL_TO_FETCH = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const DRINK_RECOMENDATION_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const MEAL_RECOMENDATION_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const indexForSixItems = 6;

function RecipeDetails() {
  const { id } = useParams();
  const { location: { pathname } } = useHistory();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [lStorage, setLStorage] = useLocalStorage('favoriteRecipes');
  const [showIfCopy, setShowIfCopy] = useState(false);
  const [recomended, setRecomended] = useState({});
  const history = useHistory();
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    const fetching = async () => {
      try {
        if (pathname === `/meals/${id}`) {
          const data = await fetch(`${MEAL_URL_TO_FETCH}${id}`)
            .then((item) => item.json());
          setRecipeDetails(fetchTreatment(data));
          const recData = await fetch(`${DRINK_RECOMENDATION_URL}`)
            .then((result) => result.json());
          setRecomended(recData.drinks);
        }
        if (pathname === `/drinks/${id}`) {
          const data = await fetch(`${DRINK_URL_TO_FETCH}${id}`)
            .then((item) => item.json());
          setRecipeDetails(fetchTreatment(data));
          const recData = await fetch(`${MEAL_RECOMENDATION_URL}`)
            .then((result) => result.json());
          setRecomended(recData.meals);
        }
      } catch (e) {
        return e.message;
      }
    };
    fetching();
  }, [id, pathname, setRecipeDetails]);

  useEffect(() => {
    setInProgress(isInProgress(id));
  }, [inProgress, id]);

  const shareHandler = () => {
    const link = window.location.href;
    copy(link);
    setShowIfCopy(true);
  };

  const { name, thumb, type, strCategory, strAlcoholic, ingredients,
    measures, strInstructions, strYoutube } = recipeDetails;

  const startRecipeHandler = () => {
    history.push(`/${type}s/${id}/in-progress`);
  };

  const previousStorage = (lStorage && JSON.parse(lStorage)) || [];
  const doesMealExistInLocalStorage = previousStorage
    .some((item) => item.id === id);

  const favoriteHandler = () => {
    const nextStorage = previousStorage.concat(recipeDetails);

    if (doesMealExistInLocalStorage) {
      const b = previousStorage.filter((item) => item.id !== id);
      const c = JSON.stringify(b);
      localStorage
        .removeItem('favoriteRecipes');
      setLStorage(c);
      return;
    }
    setLStorage(JSON.stringify(nextStorage));
  };

  return (
    <main>
      <p data-testid="recipe-title">
        <b>{name}</b>
      </p>
      <br />
      <img
        src={ thumb }
        alt={ name }
        data-testid="recipe-photo"
        style={ { width: '250px' } }
      />
      <div data-testid="recipe-category">
        <b>{type === 'meal' ? strCategory : strAlcoholic}</b>
      </div>
      <br />
      <section className="d-flex">
        <div
          className="pe-3"
        >
          Ingredients:
          {' '}
          {ingredients && ingredients
            .map((ingredient, i) => (
              <div
                data-testid={ `${i}-ingredient-name-and-measure` }
                key={ ingredient + i }
              >
                {ingredient}
              </div>
            ))}
        </div>
        <div>
          Measures:
          {' '}
          {measures && measures
            .map((measure, i) => (
              <div
                data-testid={ `${i}-ingredient-name-and-measure` }
                key={ measure + i }
              >
                {measure}
              </div>
            ))}
        </div>
      </section>
      <br />
      <div data-testid="instructions">
        {strInstructions}
      </div>
      <br />
      {strYoutube && (
        <div>
          <iframe
            src={ strYoutube.replace('watch?v=', 'embed/') }
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
            data-testid="video"
          />
        </div>) }
      <div>
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ favoriteHandler }
          src={ doesMealExistInLocalStorage
            ? blackHeartIcon : whiteHeartIcon }
        >
          <img
            src={ doesMealExistInLocalStorage
              ? blackHeartIcon : whiteHeartIcon }
            alt="fav-icon"
          />
          {}
          Favorite Recipe
        </button>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ shareHandler }
        >
          <img src={ shareIcon } alt="share" />
          {' '}
          Share Recipe
        </button>
        {showIfCopy && <p>Link copied!</p>}
      </div>
      <div className="container-fluid">
        <div className="row flex-row flex-nowrap overflow-auto">
          {recomended.length > 0 && recomended
            .slice(0, indexForSixItems)
            .map((item, i) => (
              <div
                className="card"
                style={ { width: '11rem' } }
                data-testid={ `${i}-recommendation-card` }
                key={ item.strDrink || item.strMeal }
              >
                <img
                  src={ `${item.strDrinkThumb || item.strMealThumb}` }
                  alt={ i }
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5
                    className="card-title"
                    data-testid={ `${i}-recommendation-title` }
                  >
                    {item.strDrink || item.strMeal}
                  </h5>
                </div>
              </div>
            ))}
        </div>
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="fixed-bottom"
        onClick={ startRecipeHandler }
      >
        {inProgress ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    </main>
  );
}

export default RecipeDetails;
