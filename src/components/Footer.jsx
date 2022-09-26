import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Footer.css';

function Footer({ history }) {
  return (
    <footer data-testid="footer">
      <button
        id="drink-btn"
        type="button"
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
        src="src/images/drinkIcon.svg"
      >
        .
      </button>
      <button
        id="meals-btn"
        type="button"
        data-testid="meals-bottom-btn"
        onClick={ () => history.push('/meals') }
        src="src/images/mealIcon.svg"
      >
        .

      </button>
    </footer>
  );
}

Footer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Footer;
