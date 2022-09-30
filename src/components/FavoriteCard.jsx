import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoriteCard({
  index, name, image, path,
  id, category, nationality, alcoholicOrNot, handleClickRemove }) {
  const [link, setLink] = useState(false);

  const shareHandler = (paramPath, paramID) => {
    const linkRef = `http://localhost:3000/${paramPath}s/${paramID}`;
    copy(linkRef);
    setLink(true);
  };

  return (
    <div>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { alcoholicOrNot.length > 1 ? alcoholicOrNot : `${nationality} - ${category}` }
      </p>
      <Link
        to={ `${path}s/${id}` }
      >
        <img
          src={ image }
          alt={ name }
          width="160px"
          data-testid={ `${index}-horizontal-image` }
        />
        <p
          data-testid={ `${index}-horizontal-name` }
        >
          {name}
        </p>
      </Link>
      <button
        onClick={ () => shareHandler(path, id) }
        type="button"
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt={ name }
        />
        {link && 'Link copied!'}
      </button>
      <button
        type="button"
        onClick={ handleClickRemove }
      >
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ blackHeartIcon }
          alt={ name }
        />
      </button>
    </div>
  );
}

FavoriteCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  handleClickRemove: PropTypes.func.isRequired,
};

export default FavoriteCard;
