import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/RecipeInProgress.css';

function FinishRecipe({ item, i, ingredients, halfLengthOfIngredients }) {
  const [disabled, setDisabled] = useState(false);
  return (
    <label
      data-testid={ ` ${i}-ingredient-step` }
      htmlFor={ item }
    >
      <span id={ item + i } className={ disabled && 'Finish' }>
        {`${item} ${ingredients[halfLengthOfIngredients + i]}`}
      </span>

      <input
        type="checkbox"
        name={ item }
        id={ item }
        onChange={ () => setDisabled(!disabled) }
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
