import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/RecipeInProgress.css';
import { useHistory, useParams } from 'react-router-dom';

function FinishRecipe(props) {
  const [checkedBox, setCheckedBox] = useState(true);
  const { id } = useParams();
  const { location: { pathname } } = useHistory();

  const {
    item,
    i,
    ingredients,
    halfLengthOfIngredients,
    setCheckIngredient,
    checkIngredient,
    setEnabledFinish,
  } = props;

  useEffect(() => {}, [checkedBox]);

  useEffect(() => {
    setCheckedBox(false);
    const drinksOrMeals = pathname.split('/');
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};

    if (Object.keys(getLocalStorage).includes(drinksOrMeals[1])) {
      const isCheckedIngredient = getLocalStorage[drinksOrMeals[1]][id]
      && getLocalStorage[drinksOrMeals[1]][id].some(
        (el) => el === `${item} ${ingredients[halfLengthOfIngredients + i]}`,
      );
      if (isCheckedIngredient) {
        setCheckedBox(true);
        if (ingredients.length) {
          setCheckIngredient((prevState) => prevState + 1);
        }
      }
    }
  }, [halfLengthOfIngredients, i, id, ingredients, item, pathname, setCheckIngredient]);

  const finishIngredient = () => {
    const drinksOrMeals = pathname.split('/');
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
    if (checkedBox) {
      setCheckIngredient((prevState) => prevState - 1);
    } else {
      setCheckIngredient((prevState) => prevState + 1);
    }
    if (ingredients.length / 2 === checkIngredient) {
      setEnabledFinish(false);
    } else {
      setEnabledFinish(true);
    }
  };

  return (
    <label
      data-testid={ `${i}-ingredient-step` }
      htmlFor={ item }
      className={ checkedBox && 'Finish' }
    >
      {`${item} ${ingredients[halfLengthOfIngredients + i]}`}
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
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  halfLengthOfIngredients: PropTypes.number.isRequired,
  setCheckIngredient: PropTypes.func.isRequired,
  checkIngredient: PropTypes.number.isRequired,
  setEnabledFinish: PropTypes.func.isRequired,
};

export default FinishRecipe;
