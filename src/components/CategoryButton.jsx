import React from 'react';
import PropTypes from 'prop-types';

function CategoryButton({ strCategory, clickMeals }) {
  return (
    <button
      type="button"
      data-testid={ `${strCategory}-category-filter` }
      id={ strCategory }
      onClick={ ({ target: { id } }) => clickMeals(id) }
    >
      {strCategory}
    </button>
  );
}

CategoryButton.propTypes = {
  strCategory: PropTypes.string.isRequired,
  clickMeals: PropTypes.string.isRequired,
};

export default CategoryButton;
