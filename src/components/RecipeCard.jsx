import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({ recipe, title, img, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h4
        data-testid={ `${index}-card-name` }
      >
        { recipe[title] }
      </h4>
      <img
        src={ recipe[img] }
        alt={ recipe[title] }
        data-testid={ `${index}-card-img` }
      />
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.arrayOf().isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
