import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import fetchTreatment from '../helpers/recipe_details_page_helpers/fetchTreatment';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import useLocalStorage from '../hooks/useLocalStorage';
import isInProgress from '../helpers/recipe_details_page_helpers/isInProgress';
import doneRecipe from '../helpers/recipe_details_page_helpers/doneRecipe';
import { RECIPE_NAME, RECIPE_IMAGE, CATEGORY_OR_ALCOHOLIC, INGREDIENTS_SECTION,
  INGREDIENTS_DIV, INGREDIENTS_INDIVIDUAL, MEASURES_DIV, MEASURES_INDIVIDUAL,
  INSTRUCTIONS, VIDEO, FAVORITE_BTN, SHARE_BTN, COPY_P, RECOMENDED_MASTER_DIV,
  RECOMENDED_INDIVIDUAL_DIV, CARD_DIV, CARD_IMG, BOTTOM_BTN_DIV, BODY_DIV,
  CARD_BODY, BOTTOM_BTN, VIDEO_IFRAME, CARD_TITLE, RECIPE_NAME_INSIDE_TAG, TYPE,
  BTNS_DIV,
} from '../variables-for-style/recipeDetails_classes';

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
  const [recomended, setRecomended] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetching = async () => {
      try {
        if (pathname === `/meals/${id}`) {
          const data = await fetch(`${MEAL_URL_TO_FETCH}${id}`)
            .then((item) => item.json());
          setRecipeDetails(fetchTreatment(data));
          const recomendedData = await fetch(`${DRINK_RECOMENDATION_URL}`)
            .then((result) => result.json());
          setRecomended(recomendedData.drinks);
        }
        if (pathname === `/drinks/${id}`) {
          const data = await fetch(`${DRINK_URL_TO_FETCH}${id}`)
            .then((item) => item.json());
          setRecipeDetails(fetchTreatment(data));
          const recomendedData = await fetch(`${MEAL_RECOMENDATION_URL}`)
            .then((result) => result.json());
          setRecomended(recomendedData.meals);
        }
      } catch (e) {
        return e.message;
      }
    };
    fetching();
  }, [id, pathname, setRecipeDetails]);
  const shareHandler = () => {
    const link = window.location.href;
    copy(link);
    setShowIfCopy(true);
  };
  const { name, thumb, type, strCategory, strAlcoholic, ingredients,
    measures, strInstructions, strYoutube, strArea } = recipeDetails;
  const startRecipeHandler = () => {
    history.push(`/${type}s/${id}/in-progress`);
  };
  const previousStorage = (lStorage && JSON.parse(lStorage)) || [];
  const doesMealExistInLocalStorage = previousStorage
    .some((item) => item.id === id);
  const favoriteHandler = () => {
    const a = {
      alcoholicOrNot: strAlcoholic || '',
      category: strCategory,
      id,
      image: thumb,
      name,
      nationality: strArea || '',
      type,
    };
    const nextStorage = previousStorage.concat(a);
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
    <main className="text-dark">
      <div className="position relative bg-warning">
        <img
          src={ thumb }
          alt={ name }
          data-testid="recipe-photo"
          className={ RECIPE_IMAGE }
          style={ { width: '100%' } }
        />
        <div className={ BTNS_DIV }>
          <button
            type="button"
            data-testid="favorite-btn"
            className={ FAVORITE_BTN }
            onClick={ favoriteHandler }
            src={ doesMealExistInLocalStorage
              ? blackHeartIcon : whiteHeartIcon }
          >
            <img
              src={ doesMealExistInLocalStorage
                ? blackHeartIcon : whiteHeartIcon }
              alt="fav-icon"
            />
          </button>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ shareHandler }
            className={ SHARE_BTN }
          >
            <img src={ shareIcon } alt="share" />
          </button>
          {showIfCopy && <p className={ COPY_P }>Link copied!</p>}
        </div>
        <div
          data-testid="recipe-title"
          className={ RECIPE_NAME }
        >
          <b className={ RECIPE_NAME_INSIDE_TAG }>{name}</b>
        </div>
        <div
          data-testid="recipe-category"
          className={ CATEGORY_OR_ALCOHOLIC }
        >
          <b className={ TYPE }>{type === 'meal' ? strCategory : strAlcoholic}</b>
        </div>

      </div>
      <div className={ BODY_DIV }>
        <br />
        <section className={ INGREDIENTS_SECTION }>
          <div
            className={ INGREDIENTS_DIV }
          >
            Ingredients:
            {' '}
            {ingredients && ingredients
              .map((ingredient, i) => (
                <div
                  data-testid={ `${i}-ingredient-name-and-measure` }
                  key={ ingredient + i }
                  className={ INGREDIENTS_INDIVIDUAL }
                >
                  {ingredient}
                </div>
              ))}
          </div>
          <div
            className={ MEASURES_DIV }
          >
            Measures:
            {' '}
            {measures && measures
              .map((measure, i) => (
                <div
                  data-testid={ `${i}-ingredient-name-and-measure` }
                  key={ measure + i }
                  className={ MEASURES_INDIVIDUAL }
                >
                  {measure}
                </div>
              ))}
          </div>
        </section>
        <br />
        <div
          data-testid="instructions"
          className={ INSTRUCTIONS }
        >
          {strInstructions}
        </div>
        <br />
        {strYoutube && (
          <div className={ VIDEO }>
            <iframe
              src={ strYoutube.replace('watch?v=', 'embed/') }
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
              data-testid="video"
              className={ VIDEO_IFRAME }
            />
          </div>) }
        <div className={ RECOMENDED_MASTER_DIV }>
          <b>RECOMENDED</b>
          <div className={ RECOMENDED_INDIVIDUAL_DIV }>
            {recomended.length > 0 && recomended
              .slice(0, indexForSixItems)
              .map((item, i) => (
                <div
                  className={ CARD_DIV }
                  style={ { width: '11rem' } }
                  data-testid={ `${i}-recommendation-card` }
                  key={ item.strDrink || item.strMeal }
                >
                  <img
                    src={ `${item.strDrinkThumb || item.strMealThumb}` }
                    alt={ i }
                    className={ CARD_IMG }
                  />
                  {console.log(item.strDrinkThumb)}
                  <div className={ CARD_BODY }>
                    <h5
                      className={ CARD_TITLE }
                      data-testid={ `${i}-recommendation-title` }
                    >
                      {item.strDrink || item.strMeal}
                    </h5>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {doneRecipe(id)
      || (
        <div className={ BOTTOM_BTN_DIV }>
          <button
            type="button"
            data-testid="start-recipe-btn"
            className={ BOTTOM_BTN }
            onClick={ startRecipeHandler }
          >
            {isInProgress(id) ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        </div>)}
      </div>
    </main>
  );
}

export default RecipeDetails;
