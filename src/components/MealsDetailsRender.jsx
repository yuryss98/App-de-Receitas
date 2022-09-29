import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

const RECOMENDATION_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const indexForSixItems = 6;

function MealsDetailsRender() {
  const { recipeDetails } = useContext(RecipeContext);
  const { meals } = recipeDetails;
  const data = meals[0];
  const [ingredients, setIngredients] = useState([]);
  const [recomendedDrinks, setRecomendedDrinks] = useState({});
  const location = useLocation();
  const history = useHistory();
  const [showIfCopy, setShowIfCopy] = useState(false);

  useEffect(() => {
    const listingIngredients = () => {
      const filteredIngredients = Object.keys(data)
        .filter((item) => {
          if (item.includes('strIngredient')) return true;
          return item.includes('strMeasure');
        })
        .map((ing) => data[ing])
        .filter((item) => item !== '' && item !== null && item !== ' ');
      setIngredients(filteredIngredients);
    };

    listingIngredients();
  }, [data]);

  useEffect(() => {
    const fetchingRecomendedDrinks = async () => {
      const info = await fetch(`${RECOMENDATION_URL}`)
        .then((result) => result.json());
      setRecomendedDrinks(info.drinks);
    };

    fetchingRecomendedDrinks();
  }, []);

  const halfLengthOfIngredients = Math.ceil(ingredients.length / 2);

  const itemID = location.pathname.replace(/\/meals\//, '');
  const inProgress = JSON
    .parse(localStorage.getItem('inProgressRecipes')) || { meals: { 0: [] } };
  const inProgressMeals = inProgress.meals
  && Object.keys(inProgress.meals).includes(itemID);

  const startRecipeHandler = () => {
    history.push(`/meals/${itemID}/in-progress`);
  };

  const shareHandler = () => {
    const link = window.location.href;
    copy(link);
    setShowIfCopy(true);
  };

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
              {item}
              {'     '}
              {ingredients[halfLengthOfIngredients + i]}
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
          {recomendedDrinks.length > 0 && recomendedDrinks
            .slice(0, indexForSixItems)
            .map(({ strDrinkThumb, strDrink }, i) => (
              <div
                className="card"
                style={ { width: '11rem' } }
                data-testid={ `${i}-recommendation-card` }
                key={ strDrink }
              >
                <img
                  src={ `${strDrinkThumb}` }
                  alt={ i }
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5
                    className="card-title"
                    data-testid={ `${i}-recommendation-title` }
                  >
                    {strDrink}
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
        {inProgressMeals ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    </section>
  );
}

export default MealsDetailsRender;
