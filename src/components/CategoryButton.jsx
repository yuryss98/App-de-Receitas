import React from 'react';
import PropTypes from 'prop-types';

function CategoryButton({ strCategory, categoryApi }) {
  return (
    <button
      type="button"
      data-testid={ `${strCategory}-category-filter` }
      id={ strCategory }
      onClick={ ({ target: { id } }) => categoryApi(id) }
    >
      {strCategory}
    </button>
  );
}

CategoryButton.propTypes = {
  strCategory: PropTypes.string.isRequired,
  categoryApi: PropTypes.func.isRequired,
};

export default CategoryButton;
