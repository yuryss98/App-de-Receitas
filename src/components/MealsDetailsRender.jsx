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
      <div className="container-fluid">
        <div className="row flex-row flex-nowrap overflow-auto">
          {recomendedDrinks.length > 0 && recomendedDrinks
            .map(({ strDrinkThumb, strDrink }, i) => {
              const indexForSixItems = 6;
              if (i < indexForSixItems) {
                return (
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
                );
              }
              return undefined;
            })}
        </div>
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="fixed-bottom"
      >
        Start recipe
      </button>
    </section>
  );
}

export default MealsDetailsRender;
