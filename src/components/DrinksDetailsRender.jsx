import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

const RECOMENDATION_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const indexForSixItems = 6;

function DrinksDetailsRender() {
  const { recipeDetails } = useContext(RecipeContext);
  const { drinks } = recipeDetails;
  const data = drinks[0];
  const [ingredientsDrink, setIngredientsDrink] = useState([]);
  const [recomendedMeals, setRecomendedMeals] = useState({});
  const location = useLocation();
  const history = useHistory();
  const [showIfCopy, setShowIfCopy] = useState(false);

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
      setRecomendedMeals(info.meals);
    };

    fetchingRecomendedMeals();
  }, []);

  const halfLengthOfIngredientsDrink = Math.ceil(ingredientsDrink.length / 2);

  const itemID = location.pathname.replace(/\/drinks\//, '');
  const inProgress = JSON
    .parse(localStorage.getItem('inProgressRecipes')) || { drinks: { 0: [] } };
  const inProgressDrinks = inProgress.drinks
  && Object.keys(inProgress.drinks).includes(itemID);

  const startRecipeHandler = () => {
    history.push(`/drinks/${itemID}/in-progress`);
  };

  const shareHandler = () => {
    const link = window.location.href;
    copy(link);
    setShowIfCopy(true);
  };

  const favoriteHandler = () => {
    const {
      idDrink,
      strDrink,
      strDrinkThumb,
      strCategory,
      strAlcoholic,
    } = data;
    const type = 'drink';

    const previousStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const itemInfo = {
      id: idDrink,
      type,
      name: strDrink,
      nationality: '',
      alcoholicOrNot: strAlcoholic,
      category: strCategory,
      image: strDrinkThumb };
    const nextStorage = previousStorage.concat(itemInfo);
    const doesDrinkExistInLocalStorage = previousStorage
      .some((item) => item.idDrink.includes(idDrink));
    if (doesDrinkExistInLocalStorage) return;
    localStorage.setItem('favoriteRecipes', JSON.stringify(nextStorage));
  };

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
              {item}
              {' '}
              {ingredientsDrink[halfLengthOfIngredientsDrink + i]}

            </div>
          ))}
      </div>
      <br />
      <div data-testid="instructions">
        {data.strInstructions}
      </div>
      <br />
      <div>
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ favoriteHandler }
        >
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
      </div>
      <div className="container-fluid">
        <div className="row flex-row flex-nowrap overflow-auto">
          {recomendedMeals.length > 0 && recomendedMeals
            .slice(0, indexForSixItems)
            .map(({ strMealThumb, strMeal }, i) => (
              <div
                className="card"
                style={ { width: '11rem' } }
                data-testid={ `${i}-recommendation-card` }
                key={ strMeal }
              >
                <img
                  src={ `${strMealThumb}` }
                  alt={ i }
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5
                    className="card-title"
                    data-testid={ `${i}-recommendation-title` }
                  >
                    {strMeal}
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
        {inProgressDrinks ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    </section>
  );
}

export default DrinksDetailsRender;
