import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/RecipeInProgress.css';
import { useHistory, useParams } from 'react-router-dom';

function FinishRecipe({ item, i, ingredients, halfLengthOfIngredients }) {
  const [checkedBox, setCheckedBox] = useState(false);
  const { id } = useParams();
  const { location: { pathname } } = useHistory();

  useEffect(() => {}, [checkedBox]);

  useEffect(() => {
    const drinksOrMeals = pathname.split('/'); // posição [1] tem as chaves drinks ou meals
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};

    if (Object.keys(getLocalStorage).includes(drinksOrMeals[1])) {
      const isCheckedIngredient = getLocalStorage[drinksOrMeals[1]][id].some(
        (el) => el === `${item} ${ingredients[halfLengthOfIngredients + i]}`,
      );
      if (isCheckedIngredient) {
        setCheckedBox(true);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finishIngredient = () => {
    const drinksOrMeals = pathname.split('/'); // posição [1] tem as chaves drinks ou meals
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (checkedBox) {
      const removedIngredient = getLocalStorage[drinksOrMeals[1]][id].filter(
        (el) => el !== `${item} ${ingredients[halfLengthOfIngredients + i]}`,
      );

      const NewLocalStorage = {
        ...getLocalStorage,
        [drinksOrMeals[1]]: {
          ...getLocalStorage[drinksOrMeals[1]],
          [id]: removedIngredient,
        },
      };

      localStorage.setItem('inProgressRecipes', JSON.stringify(NewLocalStorage));
    } else {
      const addIngredient = {
        ...getLocalStorage,
        [drinksOrMeals[1]]: {
          ...getLocalStorage[drinksOrMeals[1]],
          [id]: [
            ...getLocalStorage[drinksOrMeals[1]][id],
            `${item} ${ingredients[halfLengthOfIngredients + i]}`,
          ],
        },
      };

      localStorage.setItem('inProgressRecipes', JSON.stringify(addIngredient));
    }

    setCheckedBox(!checkedBox);
  };

  return (
    <label
      data-testid={ `${i}-ingredient-step` }
      htmlFor={ item }
      className={ checkedBox && 'Finish' }
    >
      {`${item} ${ingredients[halfLengthOfIngredients + i]}`}
      {console.log(checkedBox)}
      <input
        type="checkbox"
        name={ item }
        id={ item }
        // essa propriedade checked aqui não esta alterando conforme o estado altera
        checked={ checkedBox }
        onChange={ finishIngredient }
      />
    </label>
  );
}

FinishRecipe.propTypes = {
  item: PropTypes.string.isRequired,
  i: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf().isRequired,
  halfLengthOfIngredients: PropTypes.number.isRequired,
};

export default FinishRecipe;
