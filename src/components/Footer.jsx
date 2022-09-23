import React from 'react';

const Footer = (props) => {

  const { history } = props;

  return <footer data-testid="footer">
    <button 
    data-test-id="drinks-bottom-btn"
    onClick={()=> history.push('/drinks') } >
      <img src="src/images/drinkIcon.svg" alt="drink icon" />
    </button>
    <button 
    data-test-id="meals-bottom-btn"
    onClick={()=> history.push('/meals') }  >
      <img src="src/images/mealIcon.svg" alt="meal icon" />
    </button>
  </footer>
};