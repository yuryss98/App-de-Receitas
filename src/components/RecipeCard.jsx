import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/RecipeCard.css';
import 'bulma/css/bulma.min.css';

function RecipesCard({ index, name, image, path, id }) {
  return (
    <Link
      data-testid={ `${index}-recipe-card` }
      to={ `${path}/${id}` }
      className="card"
    >
      <img
        src={ image }
        alt={ name }
        width="160px"
        data-testid={ `${index}-card-img` }
      />
      <p
        data-testid={ `${index}-card-name` }
      >
        {name}
      </p>
    </Link>
  );
}

RecipesCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default RecipesCard;
