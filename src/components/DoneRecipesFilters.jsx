import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';
import '../styles/DoneRecipess.css';

function DoneRecipesFilters() {
  const { setDoneRecipesFilter } = useContext(RecipeContext);
  const handleFilter = ({ target }) => {
    setDoneRecipesFilter(target.name);
  };

  return (
    <div className="container-done-filters-recipes">
      <button
        className="filter-btn"
        name="all"
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handleFilter }
      >
        All

      </button>
      <button
        className="filter-btn"
        name="meal"
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ handleFilter }
      >
        Meals

      </button>
      <button
        className="filter-btn"
        name="drink"
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleFilter }
      >
        Drinks

      </button>
    </div>
  );
}

export default DoneRecipesFilters;
