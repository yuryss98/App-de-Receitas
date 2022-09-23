import React from 'react';
import PropTypes from 'prop-types';

function Footer(props) {
  const { history } = props;

  return (
    <footer data-testid="footer">
      <button
        type="button"
        data-test-id="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
      >
        <img src="src/images/drinkIcon.svg" alt="drink icon" />
      </button>
      <button
        type="button"
        data-test-id="meals-bottom-btn"
        onClick={ () => history.push('/meals') }
      >
        <img src="src/images/mealIcon.svg" alt="meal icon" />
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
